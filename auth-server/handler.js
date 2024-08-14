"use strict";

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://kostasrafael.github.io/meet/"];
// The cosumer key (client_id) and cosumer secret (client_secret) are used to identify the consumer that wants to use the OAuth (in this case,  the serverless function that you’ll host on AWS Lambda )
// The getOAuthURL function wants to use the OAuth.
// The getAccessToken function wants to use the OAuth.
// The cosumer key (client_id) and cosumer secret (client_secret) will be used to stard the process of requesting
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID, // we or our website is the client, which will make the request to Google to authenticate our user.
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  // when this function is invoked, an authorization URL is returned, and Google displays a consent screen to the
  // user to authorize the app via an authorization code.
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

// https://kostasrafael.github.io/meet/?
// code=4%2F0AcvDMrBJtPpUj_GhFYnQhV3SeHce3p4jti6G1LZCoGb6NstXssz-IvnCtePDlPDRlgpFhA&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.public.readonly"

module.exports.getAccessToken = async (event) => {
  // a request will only be made to this function if the user approves. The authorization code received from
  // 'getAuthURL' is passed to getAccessToken. Google subsequently provides the meet app with a temporary access token.
  const code = decodeURIComponent(`${event.pathParameters.code}`); // get the code from the URL

  // The promise constructor will return a promise object, and this object will have these internal properties:
  // state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
  // result — initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called.
  return new Promise((resolve, reject) => {
    return oAuth2Client.getToken(code, (error, response) => {
      // returns a function that takes 2 parameters, code and a nameless functions with 2 parameters, error and response.
      // take the code, and then use the code to get the token
      if (error) {
        return reject(error);
      }
      return resolve(response); //
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

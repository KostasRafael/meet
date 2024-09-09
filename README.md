<h1>Meet App</h1>
<p>Meet App is built with React. Using this app, users can browse and explore various events around the world. The user can see the events that take place in a specific city, see details about these events, and specify the number of ec=vents they want to see. Also, the app can be used when offline by means of cached event data. Additionally, the app can be installed on the user's local computer. Lastly, the app includes scatter charts and pie charts, offering visual represantation of the events.</p>

<h2>Tech Stack</h2>
<ol>
<li>Serverless</li>
<li>Google Calendar API</li>
<li>React</li>
<li>Jest</li>
<li>Puppeteer</li>
<li>Recharts</li>
</ol>

<h2>Live Link</h2>
<a href="https://kostasrafael.github.io/meet/">View Meet app online</a>

<h2>App features</h2>

<ol>
<li>
  <h3>Filter Events By City</h3></h1>
  <h6>User story</h6>
  <p>As a user I should be able to filter events by city so that I can see a list of events taking place in that city.</p>
  <ul>
    <li>
       <h4>Scenario 1</h4>
        <ul>
           <li>Given the user hasn’t searched for any city (the default)Given</li>
           <li>when the user opens the app</li>
           <li>then the user should see a list of upcoming events</li>
        </ul>
    </li>
    <li>
        <h4>Scenario 2</h4>
           <ul>
             <li>Given the main page is open</li>
             <li>when the user starts typing in the city textbox (event)</li>
             <li>then the user should receive a list of cities (suggestions) that match what they have typed</li>
        </ul>
    </li>
    <li>
         <h4>Scenario 3</h4>
           <ul>
             <li>Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing</li>
             <li>when the user selects a city (e.g., “Berlin, Germany”) from the list</li>
             <li>then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city</li>
           </ul>
    </li>
  </ul>

<li>
<h3>Show/Hide Event Details</h3></h1>
<h6>User story</h6>
<p>As a user I should be able to show/hide details about a specific event so that I can find more information about an event.</p>
<ul>
<li><h4>Scenario 1</h4></li>
<ul>
<li>Given the app is open</li>
<li>when a list of events is displayed</li>
<li>then the elememt that displays information about each event should be hidden by default</li>
</ul>
<li><h4>Scenario 2</h4></li>
<ul>
<li>Given a list of events is present</li>
<li>when the user clicks on the show details button</li>
<li>then the element that displays information about this event should be shown</li>
</ul>
<li><h4>Scenario 3</h4></li>
<ul>
<li>Given a list of events is present AND the details about some event are showing</li>
<li>when the user clicks on the hide details button</li>
<li> then the element that displays the details about the event should hide</li>
</ul>
</li>
</ul>

<li>
<h3>Specify Number of Events</h3></h1>
<h6>User story</h6>
<p>As a user I should be able to specify the number of events that I want to have displayed so that I can control the amount of events that are shown on my screen.</p>
<ul>
<li><h4>Scenario 1</h4></li>
<ul>
<li>Given the user hasn't specified a number of events to be displayed</li>
<li>when the app presents a list of events.</li>
<li>then a list of 32 events should be shown by default</li>
</ul>

<li><h4>Scenario 2</h4></li>
<ul>
<li>Given the user is presented with a list of events, the length of which is up 32 by default</li>
<li> when the user types a number in the input that specifies the number of events to be displayed</li>
<li>then The number of events displayed should be equal to the number specified by the user</li>
</ul>
</ul>

<li>
<h3>Use the App When Offline</h3></h1>
<h6>User story</h6>
<p>As a user I should be able to use the app when I am offline so that I can have access to the app even when I dont have access to the internet.</p>
<ul>
<li><h4>Scenario 1</h4></li>
<ul>
<li>Given that the user does not have access to the internet</li>
<li>when the user is on the main page.</li>
<li>then the user should be able to see the data from the cache</li>
</ul>

<li><h4>Scenario 2</h4></li>
<ul>
<li>Given that the user does not have access to the internet</li>
<li> when the user changes their search settings</li>
<li>then an error should be displayed</li>
</ul>
</ul>

<li>
<h3>Add an App Shortcut to the Home Screen</h3></h1>
<h6>User story</h6>
<p>As a user I should be able to add an app shortcut to my home screen so that I can access the app faster and easier.</p>
<ul>
<li><h4>Scenario 1</h4></li>
<ul>
<li>Given that the user can install the meet app as a shortcut on their device home screen</li>
<li>when the user clicks to create the shortcut.</li>
<li> then a shortcut icon for the app should be added to the user’s desktop screen</li>
</ul>
</ul>

<li>
<h3>Display Charts Visualizing Event Details</h3></h1>
<h6>User story</h6>
<p>As a user I should be able to see charts that give a visual representation of event details so that I can see collective information about the events, for example, how many events are there in each city.</p>
<ul>
<li><h4>Scenario 1</h4></li>
<ul>
<li>Given the user is in the main page</li>
<li>when a list of events is displayed to the user.</li>
<li>then the user should also be able to see a chart that displays information about the number of events taking place in different cities.</li>
</ul>
</ul>

</ol>

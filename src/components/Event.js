import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false); // new
  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      {showDetails ? (
        <div id="event-details">
          <p>{event.description}</p>
          <a href={event.htmlLink}>See details on Google Calendar</a>
        </div>
      ) : null}
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "hide details" : "show details"}
      </button>
    </li>
  );
};

export default Event;

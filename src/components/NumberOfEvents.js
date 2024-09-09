import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [numberEvents, setNumberEvents] = useState(currentNOE);
  const handleInputChanged = (event) => {
    const value = Number(event.target.value);
    setNumberEvents(value);
    setCurrentNOE(value);

    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText =
        "Please enter a valid number of events. That is, an actual positive number";
    } else {
      infoText = "";
    }

    setErrorAlert(infoText);
  };

  return (
    <div id="number-events">
      <input
        type="text"
        value={numberEvents}
        onChange={handleInputChanged}
        aria-label="Number of Events"
      ></input>
    </div>
  );
};

export default NumberOfEvents;

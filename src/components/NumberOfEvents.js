import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  function handleInputChanged(event) {
    let value = event.target.value;
    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText =
        "Please enter a valid number of events. That is, an actual positive number";
    } else {
      infoText = "";
      setCurrentNOE(value);
    }
    setNumberEvents(value);
    setErrorAlert(infoText);
  }

  const [numberEvents, setNumberEvents] = useState("32");
  return (
    <div id="number-events">
      <input
        type="text"
        value={numberEvents}
        onChange={handleInputChanged}
      ></input>
    </div>
  );
};

export default NumberOfEvents;

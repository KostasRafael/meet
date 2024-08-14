import { useState } from "react";

const NumberOfEvents = () => {
  function handleInputChanged(event) {
    let value = event.target.value;
    setNumberEvents(value);
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

import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  // when the useEffect() is completed in the App component, allLocations will be changed from an empty array
  // to an array that contains all the locations. This change, will triger the useEffect in line 9 to execute.
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]); // {allLocations} is a dependency
  // The function executes only, and evrytime, the allLocations state changes

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations // 2 branches, if... one branch, else... another branch
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // to hide the list
    setCurrentCity(value);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? ( // 2 branches, if... one branch, else... another branch
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;

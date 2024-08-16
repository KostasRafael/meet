import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });
  // test case
  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });
  // test case
  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });
  test("renders <NumberOfEvents /> component", () => {
    expect(AppDOM.querySelector("#number-events")).toBeInTheDocument();
  });
});

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    // The App component and its DOM are mocked.
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // A reference to the CitySearch component root DOM node is initialized, then a query is performed to find the city input text box in it
    const CitySearchDOM = AppDOM.querySelector("#city-search"); // The div that contains the textbox where the user types the city
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox"); // The textbox where the user types the city

    await user.type(CitySearchInput, "Berlin"); // the event of the user typing "Berlin" in the textbox
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany"); // The "Berlin, Germany" suggestion that shows among other suggestions
    await user.click(berlinSuggestionItem); // The event of the user clicking on the "Berlin, Germany" suggestion

    const EventListDOM = AppDOM.querySelector("#event-list"); //The <ul> that contains the list of events
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem"); // all the elements that have the role of "listitem", all the list items

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    ); // allEvents = an array with the events that have as location "Berlin, Germany"

    expect(allRenderedEventItems.length).toBe(berlinEvents.length); // expect all the list items (where each list item holds a single event objec) to be the same number as the events that have as location "Berlin, Germany"
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});

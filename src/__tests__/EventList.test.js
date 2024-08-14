import { render, within, waitFor } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";

describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(
      allEvents.length
    );
  });
});

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    const AppComponent = render(<App />); // the rendered components <App />
    const AppDOM = AppComponent.container.firstChild; // The contents of the rendered component <App /> including any child components
    const EventListDOM = AppDOM.querySelector("#event-list"); // an element with id "event-list", that is the first child of some component.
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem"); // within the <ul> that is returned by the EventList component, select all elements with role "listitem"
      expect(EventListItems.length).toBe(32); // expect the number of elements with role "listitem" to be 32
    });
  });
});

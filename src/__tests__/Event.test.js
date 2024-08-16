import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  // YOU CANNOT USE ASYNC CALLBACK WITHIN DESCRIBE()
  let EventComponent; // BECAUSE YOU WANT TO HAVE IT GLOBALLY AVAILABLE, ALTHOUGH IT IS DEFINED LOCALLY WITHIN THE BEFORE EACH.
  let allEvents; // // BECAUSE YOU WANT TO HAVE IT GLOBALLY AVAILABLE, ALTHOUGH IT IS DEFINED LOCALLY WITHIN THE BEFORE EACH.
  beforeEach(async () => {
    // YOU CAN USE ASYNC CALLBACK WITHIN BEFOREEACH()
    // i need to use async here because the getEvents() function that is defined within the api.js file is executed asynchronously, meaning that the next lines of code
    // will be executed before the events have been fetched, and therefore before allEvents is defined. I dont want this to happen. With the useof async await, I ensure
    // that the next line, where the EventComponent is defined, will be executed after allEvents has got a value.
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />); // i dont want the EventComponent to be rendered before the getEvents() async has been completed.
    // i want the EventComponent to be rendered before the getEvents() async has been completed.
  });
  test("renders event summary", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event start time", () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
  });

  test("by default event details section should be hidden", () => {
    expect(
      EventComponent.container.querySelector("#event-details")
    ).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the ('show details') button", async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.queryByRole("button");
    await user.click(detailsButton);
    const detailsContainer =
      EventComponent.container.querySelector("#event-details");
    expect(detailsContainer).toBeInTheDocument();
  });

  test("renders event details button with the title (hide details) when the details of an event are shown", async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.queryByRole("button");
    await user.click(detailsButton);
    expect(EventComponent.queryByText("hide details")).toBeInTheDocument();
  });
});

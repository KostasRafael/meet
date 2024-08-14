import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  test("renders event summary", async () => {
    let allEvents = await getEvents();
    let EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event start time", async () => {
    let allEvents = await getEvents();
    let EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test("renders event location", async () => {
    let allEvents = await getEvents();
    let EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", async () => {
    let allEvents = await getEvents();
    let EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
  });

  test("by default event details section should be hidden", async () => {
    let allEvents = await getEvents();
    let EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.container.querySelector("#event-details")
    ).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the ('show details') button", async () => {
    const user = userEvent.setup();
    let allEvents = await getEvents();
    let EventComponent = render(<Event event={allEvents[0]} />);
    const detailsButton = EventComponent.queryByRole("button");
    await user.click(detailsButton);
    const detailsContainer =
      EventComponent.container.querySelector("#event-details");
    expect(detailsContainer).toBeInTheDocument();
  });

  test("renders event details button with the title (hide details) when the details of an event are shown", async () => {
    const user = userEvent.setup();
    let allEvents = await getEvents();
    let EventComponent = render(<Event event={allEvents[0]} />);
    const detailsButton = EventComponent.queryByRole("button");
    await user.click(detailsButton);
    expect(EventComponent.queryByText("hide details")).toBeInTheDocument();
  });
});

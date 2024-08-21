import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppComponent;
    given("the app is open", () => {
      AppComponent = render(<App />);
    });
    let EventListDOM;
    when("a list of events is displayed", () => {
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
    });

    then(
      "the elememt that displays information about each event should be hidden by default",
      () => {
        let EventDetails = EventListDOM.querySelector("#event-details");
        expect(EventDetails).not.toBeInTheDocument();
      }
    );
  });

  test("User can expand an event to see details.", ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    given("a list of events is present", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
    });

    when("the user clicks on the show details button", async () => {
      const showDetailsButton = EventComponent.queryByRole("button");
      const user = userEvent.setup();
      await user.click(showDetailsButton);
    });

    then(
      "the element that displays information about this event should be shown",
      () => {
        let eventDetails =
          EventComponent.container.querySelector("#event-details");
        expect(eventDetails).toBeInTheDocument();
      }
    );
  });

  test("User can collapse an event to hide details.", ({
    given,
    and,
    when,
    then,
  }) => {
    let EventComponent;
    let allEvents;
    let eventDetails;
    given("a list of events is present", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
    });

    and("the details about some event are showing", async () => {
      const user = userEvent.setup();
      const showDetailsButton = EventComponent.queryByText("show details");
      await user.click(showDetailsButton);
      eventDetails = EventComponent.container.querySelector("#event-details");
    });

    when("the user clicks on the hide details button", async () => {
      const user = userEvent.setup();
      const hideDetailsButton = EventComponent.queryByText("hide details");
      await user.click(hideDetailsButton);
    });

    then(
      "the element that displays the details about the event should hide",
      () => {
        expect(eventDetails).not.toBeInTheDocument();
      }
    );
  });
});

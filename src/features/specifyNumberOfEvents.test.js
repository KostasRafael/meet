import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import EventList from "../components/EventList";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user has not specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    given(
      "the user hasn't specified a number of events to be displayed",
      () => {}
    );

    let EventListComponent;
    let EventListDOM;
    let allEvents;

    when("the app presents a list of events", async () => {
      allEvents = await getEvents();
      EventListComponent = render(
        <EventList events={allEvents.slice(0, 32)} />
      );

      EventListDOM = EventListComponent.container.firstChild;
      console.log(EventListDOM, "this is the dom");
    });

    then(/^a list of (\d+) events should be shown by default$/, (arg0) => {
      const EventListItems = EventListDOM;
      expect(EventListItems.children.length).toBe(32);
    });

    test("User can change the number of events displayed.", ({
      given,
      when,
      then,
    }) => {
      let AppComponent;
      let AppDOM;
      let NumberOfEventsDOM;
      given("the user is presented with a list of events", () => {
        AppComponent = render(<App />);
        AppDOM = AppComponent.container.firstChild;
      });

      when(
        "the user types a number in the input that specifies the number of events to be displayed",
        async () => {
          const user = userEvent.setup();
          let NumberOfEventsDOM = AppDOM.querySelector("#number-events");
          let NumberOfEventsInput =
            within(NumberOfEventsDOM).queryByRole("textbox");
          await user.type(NumberOfEventsInput, "{backspace}{backspace}10");
        }
      );

      then(
        "The number of events displayed should be equal to the number specified by the user.",
        () => {
          let EventListDOM = AppDOM.querySelector("#event-list");
          let EventListItems = within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(10);
        }
      );
    });
  });
});

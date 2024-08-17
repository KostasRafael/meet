import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsDOM;
  beforeEach(() => {
    NumberOfEventsDOM = render(<NumberOfEvents />);
  });
  test("renders textbox", () => {
    expect(NumberOfEventsDOM.queryByRole("textbox")).toBeInTheDocument();
  });

  test("default value of the input box is 32", () => {
    expect(NumberOfEventsDOM.queryByRole("textbox")).toHaveDisplayValue(32);
  });

  test("the value of the textbox changes according to what a user types", async () => {
    const user = userEvent.setup();
    NumberOfEventsDOM.rerender(<NumberOfEvents setCurrentNOE={() => {}} />);
    const eventsTextBox = NumberOfEventsDOM.queryByRole("textbox");
    await user.type(eventsTextBox, "{backspace}{backspace}10");
    expect(eventsTextBox).toHaveValue("10");
  });
});

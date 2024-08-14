import { render } from "@testing-library/react";
import App from "../App";

describe("<App / component", () => {
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

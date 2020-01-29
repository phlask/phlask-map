import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";

it("does not render due to Google Maps JS API library", () => {
  const div = document.createElement("div");

  expect(() => {
    ReactDOM.render(<SearchBar />, div);
  }).toThrow();
  ReactDOM.unmountComponentAtNode(div);
});

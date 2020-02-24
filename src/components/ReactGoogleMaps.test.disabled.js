import React from "react";
import ReactDOM from "react-dom";
import { ReactGoogleMaps } from "./ReactGoogleMaps";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReactGoogleMaps />, div);
  ReactDOM.unmountComponentAtNode(div);
});

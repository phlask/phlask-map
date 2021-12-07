import React from "react";
import ReactDOM from "react-dom";
import { ClosestTap } from "./ClosestTap";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ClosestTap />, div);
  ReactDOM.unmountComponentAtNode(div);
});

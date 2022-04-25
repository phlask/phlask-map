import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-ga");

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
    div
  );
  root.unmount();
});

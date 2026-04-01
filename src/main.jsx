// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "./Wrapper";
import store from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import "./animation.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Weather-App">
    <Provider store={store}>
      <Wrapper />
    </Provider>
  </BrowserRouter>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import "@fontsource/mulish";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/400-italic.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

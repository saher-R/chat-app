import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./ReduxTK/store";
import { BrowserRouter } from "react-router-dom";
////For TimeAgo...
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
////
TimeAgo.addDefaultLocale(en)
/////

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./containers";
import "./index.css";

ReactDOM.render(
  <BrowserRouter basename="/my-reads-react-app">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

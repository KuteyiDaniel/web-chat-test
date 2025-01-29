import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import the Provider
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { chatStore } from "./store/chatStore"; // Import the store you configured

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={chatStore}> {/* Wrap the App in Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

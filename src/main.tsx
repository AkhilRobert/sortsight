import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global } from "@emotion/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global
      styles={{
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
      }}
    />
    <App />
  </React.StrictMode>
);

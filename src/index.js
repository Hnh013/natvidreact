import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { UserProvider } from "./frontend/contexts/userContext";
import { DataProvider } from "./frontend/contexts/dataContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";

import App from "./App";
import "./index.css";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <SocketProvider>
    <NotificationProvider>
 <App />
    </NotificationProvider>
   
  </SocketProvider>   
  </BrowserRouter>
);
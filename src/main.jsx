import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

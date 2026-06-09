import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css"

// Note: we removed <HelmetProvider> and react-helmet-async.
// React 19 natively hoists <title>, <meta>, and <link> tags to <head>,
// which works reliably in the Playwright prerender pipeline. Helmet
// did not, it failed to update document.title under React 19's
// reconciler, so every prerendered page shipped the template default.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

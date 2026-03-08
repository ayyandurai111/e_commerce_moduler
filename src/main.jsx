// ─────────────────────────────────────────────────────────────
//  main.jsx / index.jsx — React entry point
// ─────────────────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Google Fonts — inject at runtime (or add to your index.html <head>)
const link = document.createElement("link");
link.rel  = "preconnect";
link.href = "https://fonts.googleapis.com";
document.head.appendChild(link);

const link2 = document.createElement("link");
link2.rel  = "stylesheet";
link2.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap";
document.head.appendChild(link2);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ─────────────────────────────────────────────────────────────
//  main.jsx
//  App entry point — wraps everything in BrowserRouter so
//  React Router hooks (useNavigate, useParams, useLocation)
//  are available throughout the entire component tree.
// ─────────────────────────────────────────────────────────────
import React                  from "react";
import ReactDOM               from "react-dom/client";
import { BrowserRouter }      from "react-router-dom";
import App                    from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

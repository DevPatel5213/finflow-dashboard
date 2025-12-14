// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);

import { createRoot } from "react-dom/client";
// import { HashRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/devpatel">
    <App />
  </BrowserRouter>
);

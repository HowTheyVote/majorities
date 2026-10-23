import { createRoot } from "react-dom/client";
import App from "./components/App";

import "./css/base.css";

createRoot(document.getElementById("root")!).render(<App />);

window.addEventListener("load", () => {
  alert("This project is still a work in progress and the data may be incorrect or incomplete.");
});

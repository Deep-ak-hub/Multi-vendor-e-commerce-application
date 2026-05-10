import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CustomRoutes from "./routes.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  // </StrictMode>,
);

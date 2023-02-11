import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import RetirarDinero from "./pages/RetirarDinero";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/retirardinero" element={<RetirarDinero />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

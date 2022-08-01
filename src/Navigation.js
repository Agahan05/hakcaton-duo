import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import MainPages from "./Pages/MainPages";

function Navigation() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;

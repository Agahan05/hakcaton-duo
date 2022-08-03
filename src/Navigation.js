import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProvider from "./contexts/AdminProvider";
import Navbar from "./Navbar";
import AdminAddPages from "./Pages/AdminAddPages";
import AdminEditPages from "./Pages/AdminEditPages";
import AdminPages from "./Pages/AdminPages";
import MainPages from "./Pages/MainPages";

function Navigation() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/admin" element={<AdminPages />} />
          <Route path="/admin/add" element={<AdminAddPages />} />
          <Route path="/admin/edit/:id" element={<AdminEditPages />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default Navigation;

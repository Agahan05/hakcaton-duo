import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import Navbar from "./Navbar";
import AdminAddPages from "./Pages/AdminAddPages";
import AdminEditPages from "./Pages/AdminEditPages";
import AdminPages from "./Pages/AdminPages";
import BasketPage from "./Pages/BasketPage";
import MainPage from "./Pages/MainPage";

function Navigation() {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPages />} />
            <Route path="/admin/add" element={<AdminAddPages />} />
            <Route path="/admin/edit/:id" element={<AdminEditPages />} />
            <Route path="/basket" element={<BasketPage />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
}

export default Navigation;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components1/Navbar";
import "./App.css";
import Home from "./pages/Homepage";
import QuickBilling from "./pages/QuickBilling";
import ScrollToTop from "./ScrolltoTop";
import Inventory from "./pages/Inventory";
import InventAdd from "./components2/InventAdd";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quickBilling" element={<QuickBilling />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/InventAdd" element={<InventAdd />} />
      </Routes>
    </Router>
  );
}
export default App;

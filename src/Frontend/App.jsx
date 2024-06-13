// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components1/Navbar";
import "./App.css";
import Home from "./pages/Homepage";
import QuickBilling from "./pages/QuickBilling";
import ScrollToTop from "./ScrolltoTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/QuickBilling" element={<QuickBilling />} />
      </Routes>
    </Router>
  );
}
export default App;

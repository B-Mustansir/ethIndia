import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { UploadPage } from "./components/custom/UploadPage";
import { Draft } from "./components/custom/Draft";
import Landing from "./pages/Landing";
import TradingBotPage from "./components/custom/TradingBotPage"; // Transaction component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content-creation" element={<UploadPage />} />
        <Route path="/content-draft" element={<Draft />} />
        <Route path="/trading-bot" element={<TradingBotPage />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

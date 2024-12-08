import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { UploadPage } from "./components/custom/UploadPage";
import { Draft } from "./components/custom/Draft";
import Landing from "./pages/Landing";
import { TradingBotList } from "./components/custom/TradingBotList";
import TradingBotCharts from "./components/custom/TradingBotCharts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content-creation" element={<UploadPage />} />
        <Route path="/content-draft" element={<Draft />} />
        <Route path="/trading-bot" element={<TradingBotList />} />
        <Route path="/bot-charts" element={<TradingBotCharts />} />
      </Routes>
    </BrowserRouter>
  );
}

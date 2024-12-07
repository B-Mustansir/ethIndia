import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/custom/Sidebar";
import { UploadPage } from "./components/custom/UploadPage";
import { Draft } from "./components/custom/Draft";
import { ReactLenis } from "lenis/react";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  return (
    <ReactLenis root>
      <Router>
        <div className="flex h-screen bg-black text-white">
          {/* Sidebar Component */}
          <Sidebar />

          {/* Main Content with Routes */}
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/content-creation" element={<UploadPage />} />
              <Route path="/content-draft" element={<Draft />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ReactLenis>
  );
}

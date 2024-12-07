import React from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../components/custom/Sidebar";
import { UploadPage } from "../components/custom/UploadPage";
import { Draft } from "../components/custom/Draft";

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState("dashboard");

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar setActivePage={setActivePage} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg bg-gray-900 p-6 shadow-lg"
        >
          {activePage === "dashboard" && <DashboardContent />}
          {activePage === "content-creation" && <UploadPage />}
          {activePage === "content-draft" && <Draft />}
        </motion.div>
      </main>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold tracking-wide">Dashboard</h1>
      <p className="text-gray-400">
        Welcome to your dashboard. Select an option from the sidebar to get started.
      </p>
    </div>
  );
}

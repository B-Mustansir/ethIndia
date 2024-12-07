import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PenTool, FileText, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function Sidebar({ setActivePage }) {
  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
    { name: "Content Creation", icon: PenTool, action: "content-creation" },
    { name: "Content Draft", icon: FileText, action: "content-draft" },
    { name: "Sign Out", icon: LogOut, action: "sign-out" },
  ];

  return (
    <motion.div
      className="w-64 bg-gray-900 h-screen p-4 flex flex-col space-y-6 border-r border-gray-700"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sidebarItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <NavLink
            to={item.action}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 p-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        </motion.div>
      ))}
    </motion.div>
  );
}

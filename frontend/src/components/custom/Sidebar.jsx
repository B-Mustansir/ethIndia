import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, PenTool, FileText, LogOut, Bot, CircleUser } from "lucide-react";

export function Sidebar({ setActivePage }) {
  const sidebarItems = [
    {name:'Mirror Sphere', icon:CircleUser, action:'persona-craft'},
    { name: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
    { name: "Content Creation", icon: PenTool, action: "content-creation" },
    { name: "Content Draft", icon: FileText, action: "content-draft" },
    { name: "Trading Bot", icon: Bot, action: "trading-bot" },
    { name: "Sign Out", icon: LogOut, isSignOut: true },
  ];

  return (
    <motion.div
      className="w-fit  bg-slate-700 p-4 flex flex-col space-y-6 border-r border-gray-700 "
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
          {item.isSignOut ? (
            <button
              onClick={() => {
                localStorage.removeItem("wallet");
                alert("You have been signed out.");
                setActivePage("dashboard"); // Redirect to dashboard on sign out
              }}
              className="w-full flex items-center gap-4 p-3 rounded-lg text-sm font-medium transition text-gray-100 hover:text-white hover:bg-gray-800"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ) : (
            <button
              onClick={() => setActivePage(item.action)}
              className="w-full flex items-center gap-4 p-3 rounded-lg text-sm font-medium transition text-gray-100 hover:text-white hover:bg-gray-800"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

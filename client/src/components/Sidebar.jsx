import React from "react";
import { Home, Users, BarChart, Settings, LogOut, Sidebar } from "lucide-react";

function Sidebar() {
  return (
    <div>
      <aside className="hidden md:flex w-64 bg-gray-900 text-gray-100 flex-col">
        <div className="p-6 text-2xl font-bold tracking-wide">Admin Panel</div>
        <nav className="flex-1 space-y-2 px-4">
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Home size={20} /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Users size={20} /> Users
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <BarChart size={20} /> Reports
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Settings size={20} /> Settings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-700"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;

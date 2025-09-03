import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, BarChart, Settings, LogOut, Search } from "lucide-react";

export default function Admin({ onLogout }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://tci-backend.vercel.app/user`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-1/3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">Admin</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold mt-2">{data.length}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="text-lg font-semibold">Total Student</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="text-lg font-semibold">New User</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </motion.div>

          {data.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.userName}
                </h3>
                <p className="text-sm text-gray-600">📞 {item.mobileNumber}</p>
              </div>

              <h4 className="text-md font-bold text-gray-700 border-b pb-2 mb-3">
                Courses Enrolled
              </h4>

              <div className="space-y-3">
                {item.course.map((cour, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">Course:</span>{" "}
                      {cour.courseName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Duration:</span>{" "}
                      {cour.duration}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </main>
      </div>
    </div>
  );
}

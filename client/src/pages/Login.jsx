import React, { useState, useEffect } from "react";
import Admin from "./Admin";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ id: "", password: "" });

  // প্রথম লোডে localStorage থেকে লগইন স্টেট চেক করবে
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.id === "admin" && formData.password === "1234") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true"); // state সেভ
    } else {
      alert("❌ Invalid Admin ID or Password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ id: "", password: "" });
    localStorage.removeItem("isLoggedIn"); // লগআউট হলে state মুছে ফেলবে
  };

  if (isLoggedIn) {
    return <Admin onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Admin ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter Admin ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

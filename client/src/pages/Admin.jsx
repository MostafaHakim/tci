import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import CourseForm from "../components/CourseForm";
import { Outlet, useLocation } from "react-router-dom";

export default function Admin({ onLogout }) {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation("/admin/message");
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch(`https://tci-backend.vercel.app/course`);
      const json = await res.json();
      setCourses(json);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // Delete course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`https://tci-backend.vercel.app/course/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // Modal control
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCourseAdded = (newCourse) => {
    setCourses([newCourse, ...courses]);
    closeModal();
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-full md:w-1/3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 flex-1">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold mt-2">03</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <h3 className="text-lg font-semibold">Total Courses</h3>
              <p className="text-3xl font-bold mt-2">{courses.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <h3 className="text-lg font-semibold">New User</h3>
              <p className="text-3xl font-bold mt-2">1</p>
            </motion.div>
          </div>
          <div
            className={`${
              location.pathname === "/admin/message" ? "hidden" : "block"
            }`}
          >
            {/* Courses Section */}
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-bold flex justify-between items-center">
                📚 All Courses
                <button
                  onClick={openModal}
                  className="px-4 py-2 text-sm bg-sky-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
                >
                  Add Course
                </button>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {courses.map((course) => (
                  <motion.div
                    key={course._id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100 relative"
                  >
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                    <h3 className="text-lg font-bold text-gray-800">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ⏳ Duration: {course.courseDuration}
                    </p>

                    {course.courseTitel?.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold">Titles:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {course.courseTitel.map((t, i) => (
                            <li key={i}>{t.titelName}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {course.tags?.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold">Tags:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {course.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                            >
                              #{tag.tagName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <Outlet />
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed bg-gray-300 bg-opacity-30 inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <CourseForm onSubmitSuccess={handleCourseAdded} />
          </div>
        </div>
      )}
    </div>
  );
}

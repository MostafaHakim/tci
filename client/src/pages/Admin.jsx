import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  BarChart,
  Settings,
  LogOut,
  Search,
  Trash2,
  Menu,
  Sidebar,
} from "lucide-react";
import axios from "axios";
import CourseForm from "../components/CourseForm"; // Import CourseForm.jsx

export default function Admin({ onLogout }) {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`https://tci-backend.vercel.app/user`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

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

  // Delete user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://tci-backend.vercel.app/user/${id}`);
      setData(data.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
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

  // When a new course is added, update the courses list
  const handleCourseAdded = (newCourse) => {
    setCourses([newCourse, ...courses]); // Add new course at top
    closeModal();
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar (same as before) */}
      <Sidebar />

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
              <p className="text-3xl font-bold mt-2">{data.length}</p>
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

          {/* Users Section */}
          <h2 className="mt-10 mb-4 text-xl font-bold">👥 All Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100 transition-all duration-300 relative"
              >
                <button
                  onClick={() => handleDeleteUser(item._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.userName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    📞 {item.mobileNumber}
                  </p>
                  {item.userComments && (
                    <p className="text-sm text-gray-600 italic mt-1">
                      💬 User Comments: {item.userComments}
                    </p>
                  )}
                </div>

                <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">
                  🎓 Courses Enrolled
                </h4>
                <div className="grid sm:grid-cols-1">
                  {item.course.map((cour, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">Course:</span>{" "}
                        {cour.courseName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-semibold">Duration:</span>{" "}
                        {cour.duration}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 text-xs text-gray-400 border-t pt-2 text-right">
                  ⏱ Last Updated: {new Date().toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>

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
              {courses.map((course, idx) => (
                <motion.div
                  key={idx}
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
        </main>
      </div>

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

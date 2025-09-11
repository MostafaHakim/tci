import React, { useEffect, useState } from "react";
import TeacherForm from "./TeacherForm";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${baseUrl}/teacher`);
      const data = await res.json();
      setTeachers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [baseUrl]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold mb-6 text-center">Teachers List</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add Teacher
        </button>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center"
          >
            {teacher.teacherImageUrl && (
              <img
                src={teacher.teacherImageUrl}
                alt={teacher.teacherName}
                className="w-32 h-32 object-cover rounded-full border mb-4"
              />
            )}
            <h3 className="text-lg font-semibold">{teacher.teacherName}</h3>
            <p className="text-sm text-gray-500">{teacher.selectedCourse}</p>
            <p className="mt-2 text-gray-600">{teacher.descriptions}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative">
            {/* Close button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <TeacherForm
              onSuccess={() => {
                setOpenModal(false); // modal close
                fetchTeachers(); // refresh list
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

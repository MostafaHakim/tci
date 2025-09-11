import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function StudentForm() {
  const location = useLocation();
  const { courseName, courseDuration } = location.state || {}; // null check

  const [formData, setFormData] = useState({
    studentName: "",
    studentImageUrl: "",
    studentMobile: "",
    courseName: "",
    courseDuration: "",
    address: "",
    admissionDate: "",
  });

  // যখন কোর্স ডাটা আসবে তখন সেটাকে formData তে বসানো হবে
  useEffect(() => {
    if (courseName || courseDuration) {
      setFormData((prev) => ({
        ...prev,
        courseName: courseName || "",
        courseDuration: courseDuration || "",
      }));
    }
  }, [courseName, courseDuration]);

  // আপনার বাকী কোড অপরিবর্তিত থাকবে...

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async () => {
    if (!file) return alert("Please select an image!");

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Images"); // আপনার preset name দিন

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxyn1uoui/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      setFormData({ ...formData, studentImageUrl: cloudData.secure_url });
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Student added successfully!");
        setFormData({
          studentName: "",
          studentImageUrl: "",
          studentMobile: "",
          courseName: "",
          courseDuration: "",
          address: "",
          admissionDate: "",
        });
        setFile(null);
      } else {
        alert("Failed to add student!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Student Admission Form
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter student name"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded-lg"
          />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading}
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {uploading ? "Uploading..." : "Upload to Cloudinary"}
          </button>

          {formData.studentImageUrl && (
            <img
              src={formData.studentImageUrl}
              alt="preview"
              className="mt-3 w-24 h-24 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Mobile</label>
          <input
            type="text"
            name="studentMobile"
            value={formData.studentMobile}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter mobile number"
            required
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Course Duration</label>
          <input
            type="text"
            name="courseDuration"
            value={formData.courseDuration}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="e.g. 6 months"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter address"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Admission Date</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

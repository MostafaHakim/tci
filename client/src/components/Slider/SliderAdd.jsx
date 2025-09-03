import { useState } from "react";
import axios from "axios";

export default function SliderForm({ onSlideAdded }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Title এবং Image ফাইল লাগবে!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "https://tci-backend.vercel.app/slider",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onSlideAdded(res.data);
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error("Slide add error:", err);
      alert("Slide যোগ করতে ব্যর্থ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mb-6"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        নতুন Slide যোগ করুন
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          placeholder="Slide Title"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Uploading..." : "Add Slide"}
      </button>
    </form>
  );
}

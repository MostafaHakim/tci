import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CourseForm from "./components/CourseForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/course/add" element={<CourseForm />} />
    </Routes>
  );
}

export default App;

import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CourseForm from "./components/CourseForm";
import VisitorMessage from "./components/VisitorMessage";
import Settings from "./components/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Login />}>
        <Route path="message" element={<VisitorMessage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/admin/course/add" element={<CourseForm />} />
    </Routes>
  );
}

export default App;

import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SliderForm from "./components/Slider/SliderAdd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/slider/form" element={<SliderForm />} />
    </Routes>
  );
}

export default App;

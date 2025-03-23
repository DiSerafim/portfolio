import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Fundamentals from "./pages/Fundamentals";
import Frontend from "./pages/Frontend";
import Backend from "./pages/Backend";
import ComputerScience from "./pages/ComputerScience";
import TI from "./pages/TI";
import Projects from "./pages/Projects";
import Lessons from "./pages/Lessons.js";

function App() {
  return (
    <Router>
      <Sidebar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Fundamentals" element={<Fundamentals />} />
        <Route exact path="/Frontend" element={<Frontend />} />
        <Route exact path="/Backend" element={<Backend />} />
        <Route exact path="/ComputerScience" element={<ComputerScience />} />
        <Route exact path="/TI" element={<TI />} />
        <Route exact path="/Projects" element={<Projects />} />
        <Route exact path="/Lessons" element={<Lessons />} />
      </Routes>
    </Router>
  );
}

export default App;

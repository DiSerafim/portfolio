import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Mega6 from "./pages/Mega6";

function App() {
  return (
    <Router>
      <Sidebar />
      <Mega6 />
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./menu.jsx";
import AuthPage from "./AuthPage.jsx"; // Import the Login/Signup Page
import HistoryPage from "./history.jsx"; // Import the History Page
import Axios from "axios"
import axios from "axios";

function App() {

axios.defaults.baseURL = "http://127.0.0.1:5000"

  return (
    <Router>
      <Routes>
        {/* Default Route (Login/Signup Page) */}
        <Route path="/" element={<AuthPage />} />

        {/* Menu Route */}
        <Route path="/menu" element={<Menu />} />

        {/* History Route */}
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState } from "react";
import { FaHome, FaClipboardList, FaUser, FaHistory } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import Home from "./home.jsx" 
import User from "./profile.jsx";
import History from "./history.jsx";
import Clipboard from "./clipboard.jsx";

function Menu() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div>
      <div className="menubar">
        <a
          href="#home"
          className={`menu-item ${activeItem === "home" ? "active" : ""}`}
          onClick={() => handleItemClick("home")}
        >
          <FaHome />
        </a>
        <a
          href="#clipboard"
          className={`menu-item ${activeItem === "clipboard" ? "active" : ""}`}
          onClick={() => handleItemClick("clipboard")}
        >
          <FaClipboardList />
        </a>
        <a
          href="#sos"
          className="menu-item sos"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            window.location.href = "tel:9744737096"; // Redirect to the phone number
          }}
        >
          <MdWarning />
        </a>
        <a
          href="#history"
          className={`menu-item ${activeItem === "history" ? "active" : ""}`}
          onClick={() => handleItemClick("history")}
        >
          <FaHistory />
        </a>
        <a
          href="#user"
          className={`menu-item ${activeItem === "user" ? "active" : ""}`}
          onClick={() => handleItemClick("user")}
        >
          <FaUser />
        </a>
      </div>

      <div className="content">
        {activeItem === "home" && <Home />}
        {activeItem === "clipboard" && <Clipboard />}
        {activeItem === "sos" && <Sos />}
        {activeItem === "history" && <History />}
        {activeItem === "user" && <User />}
      </div>
    </div>
  );
}

export default Menu;
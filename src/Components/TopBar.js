import React, { useState } from "react";
import logo from "../assets/images/vrv.jpg";
import "../assets/Styles/TopBar.css";
import { FaBell, FaQuestionCircle, FaUserCircle, FaChevronDown, FaCog } from "react-icons/fa"; 

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="top-bar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="top-bar-actions">
        <FaBell className="icon" title="Notifications" />
        <FaCog className="icon" title="Settings" /> {/* Settings Icon */}
        <FaQuestionCircle className="icon" title="Help" />
        <div
          className="user-dropdown"
          onClick={toggleDropdown}
          onBlur={() => setIsDropdownOpen(false)}
          tabIndex="0"
        >
          <FaUserCircle className="icon" />
          <span>Admin</span>
          <FaChevronDown className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`} />
          <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
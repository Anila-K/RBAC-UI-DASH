import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/Styles/Sidebar.css";
import {
  FaHome,
  FaUsers,
  FaKey,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); 
  const [isUsersExpanded, setIsUsersExpanded] = useState(false); 
  const location = useLocation();

  // Detect if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobile && !isCollapsed ? "mobile-hidden" : ""}`}>
      {/* Toggle button for desktop and mobile */}
      <button
        className={`toggle-btn ${isCollapsed ? "rotate" : ""}`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FaChevronLeft />
      </button>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <FaHome /> {!isCollapsed && "Dashboard"}
            </Link>
          </li>
          <li>
            <div
              className={`users-section ${isUsersExpanded ? "expanded" : ""}`}
              onClick={() => setIsUsersExpanded(!isUsersExpanded)}
            >
              <FaUsers /> {!isCollapsed && "Users"}
              {!isCollapsed && (
                <FaChevronDown
                  className={`dropdown-icon ${isUsersExpanded ? "rotate" : ""}`}
                />
              )}
            </div>
            {!isCollapsed && isUsersExpanded && (
              <ul className="subsection">
                <li
                  className={location.pathname === "/users" ? "active" : ""}
                >
                  <Link to="/users">User Management</Link>
                </li>
                <li
                  className={
                    location.pathname === "/users/add" ? "active" : ""
                  }
                >
                  <Link to="/users/add">Add User</Link>
                </li>
              </ul>
            )}
          </li>
          <li className={location.pathname === "/roles" ? "active" : ""}>
            <Link to="/roles">
              <FaKey /> {!isCollapsed && "Roles"}
            </Link>
          </li>
          <li className={location.pathname === "/permissions" ? "active" : ""}>
            <Link to="/permissions">
              <FaShieldAlt /> {!isCollapsed && "Permissions"}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";
import "../assets/Styles/UserTable.css";
import userimg from "../assets/images/user.png"; 
import { FaSearch, FaTh, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); 
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter users based on the search query
  const filterUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <div className="add-user-button-container">
        <button
          onClick={() => navigate("/users/add")} 
          className="add-user-button"
        >
          Add User <span className="plus-sign">+</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-icon-container">
          <FaSearch className="search-icon" />
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* View Mode Buttons */}
      <div className="view-mode-buttons">
        <button
          onClick={() => setViewMode("grid")}
          className={`view-button ${viewMode === "grid" ? "active" : ""}`}
        >
          <FaTh className="view-icon" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`view-button ${viewMode === "list" ? "active" : ""}`}
        >
          <FaList className="view-icon" />
        </button>
      </div>

      {/* User Cards or List */}
      <div className={`user-cards-container ${viewMode}`}>
        {filterUsers.length > 0 ? (
          filterUsers.map((user) => (
            <div className="user-card-wrapper" key={user.id}>
              <div className="user-card">
                <div className="imgact">
                  <img
                    src={user.imageUrl || userimg}
                    alt={`${user.name}'s profile`}
                    className="user-image"
                  />
                  <div className="user-status">
                    <span
                      className={`status-dot ${
                        user.status === "Active" ? "active" : "inactive"
                      }`}
                    ></span>
                  </div>
                </div>
                <div className="user-details">
                  <h4>{user.name}</h4>
                  <p className="user-email">{user.email}</p>
                  <p>{user.role}</p>
                </div>
              </div>
              <div className="user-actions-container">
                <button className="edit-button">Edit</button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No users found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;

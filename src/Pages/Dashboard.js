import React, { useEffect, useState } from "react";
import "../assets/Styles/Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/users").then((response) => response.json()),
      fetch("http://localhost:5000/roles").then((response) => response.json())
    ])
      .then(([usersData, rolesData]) => {
        setUsers(usersData);
        setRoles(rolesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const pendingRoleAssignments = users.filter((user) => !user.role).length;
  const totalRoles = roles.length;

  const latestPermissions = users
    .flatMap((user) =>
      user.permissions?.map((perm) => ({
        userName: user.name,
        permission: perm.permission,
        date: perm.date
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="stats-column">
          <div className="card-ds">
            <i className="icon-ds">👥</i>
            <div className="card-info">
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
              <div className="manage-permissions-btn-container">
                <button
                  className="manage-permissions-btn"
                  onClick={() => {
                  window.location.href = "/users"; 
                  }}
                >
                Manage Users
                </button>
              </div>
            </div>
          </div>
          <div className="card-ds">
            <i className="icon-ds">🔐</i>
            <div className="card-info">
              <h3>Total Roles</h3>
              <p>{totalRoles}</p>
              <div className="manage-permissions-btn-container">
                <button
                  className="manage-permissions-btn"
                  onClick={() => {
                  window.location.href = "/roles"; 
                  }}
                >
                Manage Roles
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="permissions-section">
          <h2>Latest Permissions</h2>
          {latestPermissions.length > 0 ? (
            <table className="permissions-table">
              <thead>
                <tr>
                  <th>SI.No</th>
                  <th>Name</th>
                  <th>Permission</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {latestPermissions.map((permission, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{permission.userName}</td>
                    <td>{permission.permission}</td>
                    <td>{new Date(permission.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recent permissions to display.</p>
          )}

          {/* Button at the bottom-right */}
          <div className="manage-permissions-btn-container">
            <button
              className="manage-permissions-btn"
              onClick={() => {
                window.location.href = "/permissions"; 
              }}
            >
              Manage Permissions
            </button>
          </div>
        </div>
      </div>
      <div className="container-2">
      <div className="card-ds2">
            <i className="icon-ds">✅</i>
            <div className="card-info">
              <h3>Active Users</h3>
              <p>{activeUsers}</p>
            </div>
          </div>
          <div className="card-ds2">
            <i className="icon-ds">⚠️</i>
            <div className="card-info">
              <h3>Pending Role Assignments</h3>
              <p>{pendingRoleAssignments}</p>
            </div>
          </div>
          </div>
    </div>
  );
};

export default Dashboard;

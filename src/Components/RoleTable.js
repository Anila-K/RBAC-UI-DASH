import React, { useState } from "react";
import "../assets/Styles/RoleTable.css";
import { FaSearch } from "react-icons/fa";

const RoleTable = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
  ]);
  const [newRole, setNewRole] = useState("");
  const [editingRole, setEditingRole] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleAddRole = () => {
    if (newRole.trim() === "") return;
    const newId = roles.length + 1;
    setRoles([...roles, { id: newId, name: newRole, permissions: selectedPermissions }]);
    setNewRole("");
    setSelectedPermissions([]);
    setShowAddRoleForm(false); 
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Add Role Button */}
      <div className="add-role-button-container">
      <button onClick={() => setShowAddRoleForm(true)} className="add-role-button">
        Add Role +
      </button>
      </div>

      {/* Popup Form */}
      {showAddRoleForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Role</h3>
            <div className="form-group">
              <label htmlFor="roleName">Role Name:</label>
              <input
                id="roleName"
                type="text"
                value={newRole}
                placeholder="Enter Role Name"
                onChange={(e) => setNewRole(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Permissions:</label>
              <div className="permissions">
                {["Read", "Write", "Delete"].map((permission) => (
                  <label key={permission}>
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission)}
                      onChange={() => {
                        if (selectedPermissions.includes(permission)) {
                          setSelectedPermissions(selectedPermissions.filter((perm) => perm !== permission));
                        } else {
                          setSelectedPermissions([...selectedPermissions, permission]);
                        }
                      }}
                    />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
            <div className="role-form-actions">
              <button className="role-form-save" onClick={handleAddRole}>Save</button>
              <button className="role-form-cancel" onClick={() => setShowAddRoleForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar with Icon */}
      <div className="search-container">
        <div className="search-icon-container">
          <FaSearch className="search-icon" />
        </div>
        <input
          type="text"
          placeholder="Search Roles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
    <div className="role-table">
      <h2>Manage Roles</h2>
      {/* Roles Table */}
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button className="edit-role-btn">Edit</button>
                <button className="dlt-role-btn" onClick={() => setRoles(roles.filter((r) => r.id !== role.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default RoleTable;

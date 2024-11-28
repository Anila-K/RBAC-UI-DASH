import React, { useState, useEffect } from "react";
import "../assets/Styles/PermissionTable.css";

const PermissionTable = () => {
  const [roles, setRoles] = useState([]);
  const [originalRoles, setOriginalRoles] = useState([]);

  // Fetch roles from the JSON server when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/roles") 
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
        setOriginalRoles(data);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  // Toggle permission for a specific role
  const togglePermission = (roleId, permission) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.includes(permission)
                ? role.permissions.filter((perm) => perm !== permission)
                : [...role.permissions, permission],
            }
          : role
      )
    );
  };

  // Save changes to the server
  const handleSaveChanges = () => {
    roles.forEach((role) => {
      fetch(`http://localhost:5000/roles/${role.id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(role),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update role: ${role.roleName}`);
          }
        })
        .catch((error) => console.error("Error updating roles:", error));
    });

    setOriginalRoles([...roles]); 
    alert("Permissions updated successfully!");
  };

  // Cancel changes and revert to the original state
  const handleCancelChanges = () => {
    setRoles([...originalRoles]); 
  };

  return (
    <div className="permission-table">
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.roleName}</td>
              <td>
                {["Read", "Write", "Delete"].map((permission) => (
                  <label key={permission} className="permission-checkbox">
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={() => togglePermission(role.id, permission)}
                    />
                    {permission}
                  </label>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={handleSaveChanges} className="save-button">
          Save Changes
        </button>
        <button onClick={handleCancelChanges} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PermissionTable;

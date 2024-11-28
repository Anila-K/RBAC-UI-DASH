import React, { useState } from "react";
import "../assets/Styles/AddUserPage.css";

const AddUserPage = () => {
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    username: "",
    role: "",
    status: "",
    permissions: [],
    department: "",
    expirationDate: "",
  });
  const [photo, setPhoto] = useState(null); 

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo); 
    Object.keys(newUser).forEach((key) => {
      formData.append(key, newUser[key]);
    });

    fetch("http://localhost:5000/users", {
      method: "POST",
      body: formData, 
    })
      .then((response) => response.json())
      .then(() => {
        setNewUser({
          fullName: "",
          username: "",
          email: "",
          role: "User",
          permissions: [],
          department: "",
          expirationDate: "",
        });
        setPhoto(null); 
        alert("User added successfully!");
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div className="add-user-page">
      <h2>Add User</h2>
      <form onSubmit={handleAdd} className="user-form">
        {/* Basic User Information */}
        <div className="form-cont1">
        <label>
        Full Name
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.fullName}
          onChange={(e) =>
            setNewUser({ ...newUser, fullName: e.target.value })
          }
          required
        />
        </label>
        <label>
            Email
        <input
          type="email"
          placeholder="Email Address"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        </label>
        </div>
        <div className="form-cont2">
        <label>
            Username
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
          required
        />
        </label>
        {/* Profile Image */}
        <label>
            Profile Image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        </label>
        </div>
        <div className="form-cont3">
        {/* Role Assignment */}
        <label>
            Role
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
          <option value="User">User</option>
        </select>
        </label>
        {/* Status */}
        <label>
            Status
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        {/* Permissions */}
        <label>
            Permissions
        <div className="form-section">
            <label>
            <input
                type="checkbox"
                checked={newUser.permissions.includes("Read")}
                onChange={(e) => {
                const newPermissions = e.target.checked
                ? [...newUser.permissions, "Read"]
                : newUser.permissions.filter((perm) => perm !== "Read");
                setNewUser({ ...newUser, permissions: newPermissions });
            }}
            />
            Read
            </label>
            <label>
            <input
            type="checkbox"
            checked={newUser.permissions.includes("Write")}
            onChange={(e) => {
            const newPermissions = e.target.checked
            ? [...newUser.permissions, "Write"]
            : newUser.permissions.filter((perm) => perm !== "Write");
            setNewUser({ ...newUser, permissions: newPermissions });
            }}
            />
            Write
  </label>
  <label>
    <input
      type="checkbox"
      checked={newUser.permissions.includes("Delete")}
      onChange={(e) => {
        const newPermissions = e.target.checked
          ? [...newUser.permissions, "Delete"]
          : newUser.permissions.filter((perm) => perm !== "Delete");
        setNewUser({ ...newUser, permissions: newPermissions });
      }}
    />
    Delete
  </label>
</div>
</label>
</div>

        {/* Profile Information */}
        <div className="form-cont4">
        <label>
            Department
        <input
          type="text"
          placeholder="Department"
          value={newUser.department}
          onChange={(e) =>
            setNewUser({ ...newUser, department: e.target.value })
          }
        />
        </label>
        <label>
            expiration Date
        <input
          type="date"
          placeholder="Expiration Date (Optional)"
          value={newUser.expirationDate}
          onChange={(e) =>
            setNewUser({ ...newUser, expirationDate: e.target.value })
          }
        />
        </label>
        </div>
        {/* Buttons */}
        <div className="form-cont5">
        <button type="submit" className="form-submit-button">
          Add User
        </button>
        <button
          type="reset"
          onClick={() => {
            setNewUser({
              fullName: "",
              username: "",
              email: "",
              role: "User",
              permissions: [],
              department: "",
              expirationDate: "",
            });
            setPhoto(null);
          }}
        >
          Reset
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;

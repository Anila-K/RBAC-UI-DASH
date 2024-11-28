import React from "react";
import PermissionTable from "../Components/PermissionTable";
import "../assets/Styles/PermissionPage.css";

const PermissionsPage = () => {
  return (
    <div className="permissions-page">
      <h1>Permissions</h1>
      
      {/* Permission Table Component */}
      <PermissionTable/>

      {/* Permission Descriptions */}
      <div className="permission-descriptions">
  <h2>Permission Descriptions</h2>
  <div className="permission-description">
    <h3>Read</h3>
    <ul>
      <li>This permission allows a user to view or access content or data.</li>
      <li>Users with this permission can read the content but cannot make any modifications to it.</li>
    </ul>
  </div>
  <div className="permission-description">
    <h3>Write</h3>
    <ul>
      <li>This permission allows a user to modify or edit content or data.</li>
      <li>Users with this permission can add new content, update existing content, and change configurations.</li>
    </ul>
  </div>
  <div className="permission-description">
    <h3>Delete</h3>
    <ul>
      <li>This permission allows a user to remove content or data from the system.</li>
      <li>Users with this permission can delete records, files, or entire datasets.</li>
    </ul>
  </div>
</div>

    </div>
  );
};

export default PermissionsPage;

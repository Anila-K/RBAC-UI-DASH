import React from "react";
import RoleTable from "../Components/RoleTable";
import "../assets/Styles/RolesPage.css";

const RolesPage = () => {
  return (
    <div className="roles-page">
      <h1>Roles</h1>
      <RoleTable />
    </div>
  );
};

export default RolesPage;

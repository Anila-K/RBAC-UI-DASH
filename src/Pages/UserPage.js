import React from "react";
import UserTable from "../Components/UserTable";
import "../assets/Styles/UserPage.css";

const UsersPage = () => {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <UserTable />
    </div>
  );
};

export default UsersPage;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./Components/TopBar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import UsersPage from "./Pages/UserPage";
import RolesPage from "./Pages/RolesPage";
import PermissionsPage from "./Pages/PermissionPage";
import AddUserPage from "./Pages/AddUserPage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <div className="app-body">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/add" element={<AddUserPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/permissions" element={<PermissionsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

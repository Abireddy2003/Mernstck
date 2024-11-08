import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // If no token is found, redirect to login
    }

    // Fetch employee data if the user is authenticated
    axios
      .get("http://localhost:5000/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setEmployeeData(response.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="logo">Logo</div>
        <div className="nav">
          <span>Home</span>
          <span>Employee List</span>
          <span>Hukum Gupta -</span>
          <span className="logout">Logout</span>
        </div>
      </div>

      <div className="sidebar">
        <span>DashBord</span>
      </div>

      <div className="main-content">
        <h2>Welcome Admin Panel</h2>
        <ul>
          {employeeData.map((employee, index) => (
            <li key={index}>
              {employee.name} - {employee.designation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

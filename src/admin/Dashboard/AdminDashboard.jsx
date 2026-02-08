import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Redirect non-admin users
  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  // Fetch statistics for the admin dashboard
  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <Layout>
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <p>Manage and monitor your platform's key metrics</p>
        </div>
        <div className="dashboard-content">
          <div className="stats-box">
            <p className="stat-title">Total Courses</p>
            <p className="stat-value">{stats.totalCoures}</p>
          </div>
          <div className="stats-box">
            <p className="stat-title">Total Lectures</p>
            <p className="stat-value">{stats.totalLectures}</p>
          </div>
          <div className="stats-box">
            <p className="stat-title">Total Users</p>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;

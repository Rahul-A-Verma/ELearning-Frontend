import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import gsap from "gsap";
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null); // Start as null to handle loading state
  const dashboardRef = useRef(null);

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
    fetchStats();
  }, [user]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") },
      });
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    // Only animate once stats are actually loaded into the DOM
    if (stats) {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 1, clearProps: "all" }
        });

        tl.from(".dashboard-header", { y: -20, opacity: 0 })
          // 1. Display Total Courses first
          .from(".course-stat", { 
            y: 30, 
            opacity: 0,
            scale: 0.9 
          })
          // 2. Mini break (0.5 seconds) then display the rest
          .from(".rest-stats", { 
            y: 30, 
            opacity: 0, 
            stagger: 0.2 
          }, "+=0.5"); 
          
      }, dashboardRef);

      return () => ctx.revert();
    }
  }, []); // Trigger when stats state changes from null to data

  return (
    <div ref={dashboardRef} className="admin-dashboard">
      <div className="dashboard-glow"></div>
      <Layout>
        <div className="dashboard-header">
          <h2>Admin Control Center</h2>
          <p>Real-time analytics and platform overview</p>
        </div>
        
        <div className="dashboard-content">
          {stats ? (
            <>
              {/* Added 'course-stat' class for the first display */}
              <div className="stats-box course-stat">
                <div className="stat-icon">📚</div>
                <p className="stat-title">Total Courses</p>
                <p className="stat-value">{stats.totalCourses || 0}</p>
              </div>

              {/* Added 'rest-stats' class for the delayed display */}
              <div className="stats-box rest-stats">
                <div className="stat-icon">🎥</div>
                <p className="stat-title">Total Lectures</p>
                <p className="stat-value">{stats.totalLectures || 0}</p>
              </div>

              <div className="stats-box rest-stats">
                <div className="stat-icon">👥</div>
                <p className="stat-title">Total Users</p>
                <p className="stat-value">{stats.totalUsers || 0}</p>
              </div>
            </>
          ) : (
            <p className="loading-text">Loading Analytics...</p>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;

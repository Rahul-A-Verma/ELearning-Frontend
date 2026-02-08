import React from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";

const Dashboard = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h2>All Enrolled Courses</h2>
        <p>Track your progress and continue learning with your enrolled courses.</p>
      </div>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <div className="no-courses">
            <h3>No Courses Enrolled Yet</h3>
            <p>Browse our courses and start your learning journey today!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

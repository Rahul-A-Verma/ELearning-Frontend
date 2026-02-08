import React from "react";
import "./CourseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt={course.title} className="course-image" />
      <h3 className="course-title">{course.title}</h3>
      <p className="instructor">Instructor: <span>{course.createdBy}</span></p>
      <p className="duration">Duration: <span>{course.duration} weeks</span></p>
      <p className="price">Price: <span>₹{course.price}</span></p>

      {isAuth ? (
  user?.role !== "admin" ? (
    user?.subscription.includes(course._id) ? (
      <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">
        Continue Learning
      </button>
    ) : (
      <button onClick={() => navigate(`/course/${course._id}`)} className="common-btn">
        Enroll Now
      </button>
    )
  ) : (
    <>
      <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">
        View Content
      </button>
    </>
  )
) : (
  <button onClick={() => navigate("/login")} className="common-btn">
    Get Started
  </button>
)}

{/* Admin Delete button */}
{user?.role === "admin" && (
  <div className="admin-btn-wrapper">
    <button onClick={() => deleteHandler(course._id)} className="delete-btn">
      Delete Course
    </button>
  </div>
)}

    </div>
  );
};

export default CourseCard;

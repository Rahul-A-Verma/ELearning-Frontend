import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null); // Changed to null for single object
  const [mycourse, setMyCourse] = useState([]);

  // Fetch all available courses
  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  // Fetch a single course by ID
  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error("Error fetching single course:", error);
    }
  }

  // Fetch courses owned by the logged-in user
  async function fetchMyCourse() {
    const token = localStorage.getItem("token");
    if (!token) return; // Exit if no token exists

    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: token,
        },
      });
      setMyCourse(data.courses);
    } catch (error) {
      console.error("Error fetching my courses:", error);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
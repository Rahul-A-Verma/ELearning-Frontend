import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import gsap from "gsap";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user, navigate]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { courses, fetchCourses } = CourseData();

  // Animation logic
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      
      tl.from(".admin-courses-title", { opacity: 0, y: -20 })
        .from(".course-form-card", { opacity: 0, x: 50 }, "-=0.5")
        .from(".admin-course-card-wrapper", { 
          opacity: 0, 
          scale: 0.9, 
          stagger: 0.1,
          clearProps: "all" 
        }, "-=0.3");
    }, containerRef);
    return () => ctx.revert();
  }, [courses]); // Re-animate if courses change

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: { token: localStorage.getItem("token") },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      // Reset form
      setImage(""); setTitle(""); setDescription(""); setDuration("");
      setImagePrev(""); setCreatedBy(""); setPrice(""); setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div ref={containerRef} className="admin-courses-container">
        <div className="admin-courses-content">
          <div className="left-section">
            <h1 className="admin-courses-title">Manage Courses</h1>
            <div className="admin-courses-grid">
              {courses && courses.length > 0 ? (
                courses.map((e) => (
                  <div key={e._id} className="admin-course-card-wrapper">
                    <CourseCard course={e} />
                  </div>
                ))
              ) : (
                <p className="no-courses">No courses created yet.</p>
              )}
            </div>
          </div>

          <div className="right-section">
            <div className="course-form-card">
              <h2>Create New Course</h2>
              <form onSubmit={submitHandler}>
                <label>Course Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. MERN Stack Masterclass" />

                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Briefly describe the course..." />

                <div className="form-row">
                  <div>
                    <label>Price (₹)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>
                  <div>
                    <label>Duration (Wks)</label>
                    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                  </div>
                </div>

                <label>Instructor Name</label>
                <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />

                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required >
                  <option value="">Select Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>{e}</option>
                  ))}
                </select>

                <label className="file-label">Course Thumbnail</label>
                <input type="file" required onChange={changeImageHandler} className="file-input" />
                {imagePrev && <div className="preview-box"><img src={imagePrev} alt="Preview" /></div>}

                <button type="submit" disabled={btnLoading} className="common-btn submit-btn">
                  {btnLoading ? "Creating..." : "Publish Course"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
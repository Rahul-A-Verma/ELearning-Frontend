import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import gsap from "gsap";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      return navigate("/");
    }
    fetchCourse(params.id);
  }, [params.id]);

  useLayoutEffect(() => {
    if (course) {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 0.5 } });

        tl.from(".course-image-wrap", { x: -100, opacity: 0 })
          .from(".course-info-content > *", { 
            y: 30, 
            opacity: 1, 
            stagger: 0.1 
          }, "-=0.7")
          .from(".lectures-link", { scale: 0.8, opacity: 0 }, "-=0.5");
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      {course && (
        <div ref={containerRef} className="course-study-page">
          <div className="study-bg-glow"></div>
          
          <div className="course-study-container">
            {/* Left Side: Cinematic Image */}
            <div className="course-image-wrap">
              <img src={`${server}/${course.image}`} alt={course.title} />
              <div className="image-overlay"></div>
            </div>

            {/* Right Side: Information Glass Box */}
            <div className="course-info-content">
              <span className="course-tag">Course Dashboard</span>
              <h2>{course.title}</h2>
              <p className="description">{course.description}</p>
              
              <div className="meta-grid">
                <div className="meta-item">
                  <span className="label">Instructor</span>
                  <span className="value">{course.createdBy}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Duration</span>
                  <span className="value">{course.duration} Weeks</span>
                </div>
              </div>

              <Link to={`/lectures/${course._id}`} className="lectures-link">
                <span>Access Lectures</span>
                <i className="arrow-icon">→</i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
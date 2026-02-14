import React, { useLayoutEffect, useRef } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const { courses } = CourseData();
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Title Animation
      gsap.from(".courses h2", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // 2. Staggered Course Cards Reveal
      if (courses && courses.length > 0) {
        gsap.from(".course-card-wrapper", {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".course-container",
            start: "top 85%",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [courses]);

  return (
    <div ref={sectionRef} className="courses">
      <div className="courses-blur"></div>
      <h2>Explore Our Expert-Led Courses</h2>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => (
            <div key={e._id} className="course-card-wrapper">
              <CourseCard course={e} />
            </div>
          ))
        ) : (
          <div className="no-courses">
            <p>We're currently preparing new content for you. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
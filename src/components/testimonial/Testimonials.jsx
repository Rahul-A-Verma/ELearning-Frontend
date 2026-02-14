import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./testimonial.css";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);

  const testimonialsData = [
    { id: 1, name: "John Doe", position: "Student", message: "This platform helped me learn so effectively. The courses are amazing!", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Jane Smith", position: "Student", message: "I've learned more here than in any other place. Highly recommended!", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Alice Johnson", position: "Student", message: "Very structured and beginner-friendly courses. Loved the UI too!", image: "https://randomuser.me/api/portraits/women/48.jpg" },
    { id: 4, name: "Michael Brown", position: "Student", message: "The certifications really helped me boost my resume. Top-notch!", image: "https://randomuser.me/api/portraits/men/46.jpg" },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Setup initial state
      gsap.set(".testimonial-card", { 
        opacity: 0, 
        y: 100,
        scale: 0.9 
      });

      // 2. Create the ScrollTrigger animation
      gsap.to(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonials-grid",
          // 'top 95%' means the animation starts when the top of the grid 
          // is almost at the very bottom of the screen.
          start: "top 95%", 
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true, // Recalculates if the page layout changes
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
      });
    }, sectionRef);

    // This is vital for projects with pinned hero sections
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section">
      <h2 className="testimonials-title">What Our Students Say</h2>
      <div className="testimonials-grid">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt={e.name} />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
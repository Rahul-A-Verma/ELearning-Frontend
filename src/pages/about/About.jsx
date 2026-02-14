import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./about.css";

const About = () => {
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(".about-header h1, .about-header p, .about-card", { 
        opacity: 0, 
        y: 50 
      });

      // 2. Timeline Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.to(".about-header h1", { opacity: 1, y: 0 })
        .to(".about-header p", { opacity: 1, y: 0 }, "-=0.8")
        .to(".about-card", { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          ease: "back.out(1.7)" 
        }, "-=0.6");
        
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutRef} className="about">
      {/* Decorative blurred background element */}
      <div className="about-glow"></div>

      <div className="about-header">
        <h1>Welcome to LearnNest</h1>
        <p>
          LearnNest is an innovative e-learning platform that is revolutionizing
          the way education is delivered. We are dedicated to empowering learners
          with high-quality courses, expert instructors, and an engaging
          learning experience.
        </p>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <div className="icon-circle">🎯</div>
          <h3>Our Mission</h3>
          <p>
            Our mission is simple: to make learning accessible and affordable to
            everyone. We are committed to providing a diverse range of high-quality
            courses designed to help you achieve your goals.
          </p>
          <div className="card-shine"></div>
        </div>

        <div className="about-card">
          <div className="icon-circle">📚</div>
          <h3>What We Offer</h3>
          <p>
            We provide a wide variety of online courses across multiple domains
            including technology, business, and personal development with
            interactive lessons and real-world applications.
          </p>
          <div className="card-shine"></div>
        </div>

        <div className="about-card">
          <div className="icon-circle">🤝</div>
          <h3>Get Involved</h3>
          <p>
            Whether you are a student eager to learn or an instructor passionate
            about teaching, LearnNest offers opportunities to help you expand your
            skills and share your expertise.
          </p>
          <div className="card-shine"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
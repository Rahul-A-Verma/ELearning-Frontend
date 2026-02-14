import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.css";
import Testimonials from "../../components/testimonial/Testimonials.jsx";
import video from "../../assets/video.mp4"

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial state for background content
      gsap.set(".home-content", { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });

      tl
        // 1. Shrink the video circle
        .to(".video-container", {
          "--clip": "0%",
          ease: "power2.inOut",
        }, 'sync')
        
        // 2. Animate the background content appearing
        .to(".home-content", {
          opacity: 1,
          y: 0,
          ease: "power3.out",
        }, 'sync')

        // 3. Optional: Subtle animation for the pinned text while scrolling
        .to(".btm-text-layer", {
          scale: 0.95,
          opacity: 0.8,
          ease: "none"
        }, 'sync');

    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="main-wrapper">
      <section className="home">
        {/* Layer 1: The background revealed text */}
        <div className="home-text-layer">
          <div className="home-content">
            <h1>Unlock Your Potential with Us</h1>
            <p>Master new skills and shape your future with our E-learning platform.</p>
            <button onClick={() => navigate("/courses")} className="common-btn">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Layer 2: The Video (will shrink via clip-path) */}
        <div className="video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={video}
          />
        </div>

        {/* Layer 3: Pinned Bottom-Left Text (Stays on top of EVERYTHING) */}
        <div className="btm-text-layer">
          <p className="tagline">EMPOWERING MINDS</p>
          <h2>Igniting curiosity through <br/> digital excellence.</h2>
          <p className="sub-desc">Join 20,000+ students and educators <br/> shaping the future of education.</p>
        </div>
      </section>
      
      <Testimonials />
    </div>
  );
};

export default Home;
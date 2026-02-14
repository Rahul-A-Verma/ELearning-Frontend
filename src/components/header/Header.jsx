import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./header.css";

const Header = ({ isAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const magneticButton = useRef(null);

  const handleMagneticMove = (e) => {
    if (window.innerWidth <= 768 || !magneticButton.current) return;
    const btn = magneticButton.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMagneticReset = () => {
    if (!magneticButton.current) return;
    gsap.to(magneticButton.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };


  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, { 
          y: -100, 
          opacity: 0, 
          duration: 1, 
          ease: "power4.out",
          // CRITICAL: Remove GSAP styles after the animation finishes
          clearProps: "all",
        });
      }
    }, headerRef); 

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Learn<span>Nest</span></Link>
      </div>

      <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        
        <div className="magnetic-wrap" onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticReset}>
          <Link ref={magneticButton} to={isAuth ? "/account" : "/login"} className="auth-btn">
            {isAuth ? "Account" : "Login"}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
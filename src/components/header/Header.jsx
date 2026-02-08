import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ isAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LearnNest</Link></div>

      <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/courses" onClick={toggleMenu}>Courses</Link>
        {isAuth ? (
          <Link to="/account" onClick={toggleMenu}>Account</Link>
        ) : (
          <Link to="/login" onClick={toggleMenu}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

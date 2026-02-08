import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} LearnNest. All rights reserved. <br />
          Crafted with ❤️ by <a href="#">Rahul Verma</a>
        </p>
        <div className="social-links">
          <a href="#" aria-label="Facebook">
            <AiFillFacebook />
          </a>
          <a href="#" aria-label="Twitter">
            <AiFillTwitterSquare />
          </a>
          <a href="#" aria-label="Instagram">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

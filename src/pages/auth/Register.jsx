import React, { useState, useLayoutEffect, useRef } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import gsap from "gsap";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const formRef = useRef(null);

  useLayoutEffect(() => {
    // 1. Use gsap.context for proper cleanup on unmount
    let ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        // 2. Clear inline styles so they don't get stuck
        clearProps: "all", 
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(userName, email, password, navigate);
  };

  return (
    <div className="auth-page">
      <div ref={formRef} className="auth-form">
        <h2>Join LearnNest</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Your Name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create Password"
          />

          <button type="submit" disabled={btnLoading} className="common-btn">
            {btnLoading ? "Processing..." : "Create Account"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
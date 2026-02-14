import React, { useState, useLayoutEffect, useRef } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import gsap from "gsap";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const { fetchMyCourse } = CourseData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef(null);

useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    // We animate FROM these values
    gsap.from(formRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      clearProps: "all", // This deletes all GSAP styles when done!
      // onComplete: () => {
      //   // Double-check visibility
      //   gsap.set(formRef.current, { opacity: 1, visibility: "visible" });
      // }
    });
  }, formRef);

  return () => ctx.revert(); // Cleanup
}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div className="auth-page">
      <div ref={formRef} className="auth-form">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
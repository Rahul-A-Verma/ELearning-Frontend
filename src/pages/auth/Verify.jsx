import React, { useState, useLayoutEffect, useRef } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import gsap from "gsap";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useLayoutEffect(() => {
     let ctx = gsap.context(() => {
       gsap.from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      clearProps: "all",
    });
     },formRef)
   return () => ctx.revert();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-page">
      <div ref={formRef} className="auth-form">
        <h2>Verification</h2>
        <p style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>
          Enter the OTP sent to your email to activate your account.
        </p>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="6-digit code"
            style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '20px' }}
          />
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p>
          Need to change email? <Link to="/register">Go back</Link>
        </p>
      </div>
    </div>
  );
};

export default Verify;
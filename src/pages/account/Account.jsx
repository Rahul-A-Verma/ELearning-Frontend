import React, { useLayoutEffect, useRef } from "react";
import { MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./account.css";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
useLayoutEffect(() => {
    if (user) {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({ 
          defaults: { 
            ease: "power4.out", 
            duration: 0.5,
            clearProps: "all" // This removes GSAP-added inline styles once finished
          } 
        });

        // Ensure opacity is handled correctly; 1 ensures visibility if logic hangs
        tl.from(".profile", { scale: 0.9, opacity: 0 })
          .from(".profile-title", { y: -20, opacity: 0 }, "-=0.6")
          .from(".info-item", { x: -30, opacity: 0, stagger: 0.1 }, "-=0.4")
          .from(".btn", { 
            y: 20, 
            opacity: 0, 
            stagger: 0.1,
            // onComplete: () => gsap.set(".btn", { clearProps: "all" }) 
          }, "-=0.6");
      }, containerRef);
      return () => ctx.revert();
    }
  }, [user]); // The animation will re-run correctly whenever the user data is confirmed
  // useLayoutEffect(() => {
  //   if (user) {
  //     let ctx = gsap.context(() => {
  //       const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 0.5 } });

  //       tl.from(".profile", { scale: 0.9, opacity: 1 })
  //         .from(".profile-title", { y: -20, opacity: 1 }, "-=0.6")
  //         .from(".info-item", { x: -30, opacity: 0, stagger: 0.1 }, "-=0.4")
  //         .from(".btn", { y: 20, opacity: 1, stagger: 0.1 }, "-=0.6");
  //     }, containerRef);
  //     return () => ctx.revert();
  //   }
  // }, [user]);

  return (
    <div ref={containerRef} className="profile-wrapper">
      <div className="profile-glow"></div>
      <div className="profile">
        {user && (
          <>
            <h2 className="profile-title">Student Profile</h2>

            <div className="profile-avatar-circle">
              {user.userName?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-info">
              <div className="info-item">
                <strong>Name</strong>
                <span>{user.userName}</span>
              </div>
              <div className="info-item">
                <strong>Email</strong>
                <span>{user.email}</span>
              </div>
            </div>

            <div className="button-group">
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="btn"
              >
                <MdDashboard size={20} />
                <span>My Learning</span>
              </button>

              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="btn admin-btn"
                >
                  <MdAdminPanelSettings size={20} />
                  <span>Admin Panel</span>
                </button>
              )}

              <button
                onClick={logoutHandler}
                className="btn logout-btn"
              >
                <IoMdLogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
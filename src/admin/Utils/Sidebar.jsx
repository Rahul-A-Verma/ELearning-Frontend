import React, { useLayoutEffect, useRef } from "react";
import "./common.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import gsap from "gsap";

const Sidebar = () => {
  const { user } = UserData();
  const sidebarRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate sidebar background and then the list items
      gsap.from(".sidebar-list-item", {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all" // Ensures hover styles and layout don't break
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sidebarRef} className="sidebar">
      <ul>
        <li className="sidebar-list-item">
          <Link to="/admin/dashboard">
            <div className="icon"><AiFillHome /></div>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/course">
            <div className="icon"><FaBook /></div>
            <span>Courses</span>
          </Link>
        </li>

        {user && user.mainrole === "superadmin" && (
          <li className="sidebar-list-item">
            <Link to="/admin/users">
              <div className="icon"><FaUserAlt /></div>
              <span>Users</span>
            </Link>
          </li>
        )}

        <li className="sidebar-list-item">
          <Link to="/account">
            <div className="icon"><AiOutlineLogout /></div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
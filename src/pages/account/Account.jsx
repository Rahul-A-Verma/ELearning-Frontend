import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./account.css";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="profile">
      {user && (
        <>
          <h2 className="profile-title">My Profile</h2>

          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <div className="button-group">
            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="btn"
            >
              <MdDashboard size={18} />
              <span>Dashboard</span>
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="btn"
              >
                <MdDashboard size={18} />
                <span>Admin Panel</span>
              </button>
            )}

            <button
              onClick={logoutHandler}
              className="btn logout-btn"
            >
              <IoMdLogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;

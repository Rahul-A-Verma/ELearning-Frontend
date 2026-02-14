import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import "./user.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import gsap from "gsap";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const tableRef = useRef(null);

  if (user && user.mainrole !== "superadmin") return navigate("/");

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Safe GSAP Animation for Table Rows
  useLayoutEffect(() => {
    if (users.length > 0) {
      let ctx = gsap.context(() => {
        gsap.from("tr", {
          opacity: 0,
          x: -20,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all"
        });
      }, tableRef);
      return () => ctx.revert();
    }
  }, [users]); // Re-animate when list changes

  const updateRole = async (id) => {
    if (confirm("Update this user's role?")) {
      try {
        const { data } = await axios.put(`${server}/api/user/${id}`, {}, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const name = u.userName ? u.userName.toLowerCase() : "";
    const email = u.email ? u.email.toLowerCase() : "";
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
    const matchesSort = sortBy === "all" ? true : u.role === sortBy;
    return matchesSearch && matchesSort;
  });

  return (
    <Layout>
      <div className="users-container" ref={tableRef}>
        <div className="users-header">
          <h1>User Management</h1>
          <div className="controls">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="sort-select">
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{e.userName?.charAt(0)}</div>
                        <span>{e.userName}</span>
                      </div>
                    </td>
                    <td>{e.email}</td>
                    <td>
                      <span className={`role-badge ${e.role}`}>{e.role}</span>
                    </td>
                    <td>
                      <button onClick={() => updateRole(e._id)} className="update-btn">
                        Toggle Role
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No users match your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
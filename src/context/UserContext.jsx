import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { server } from "../main";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Changed to null for object consistency
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper to get token
  const token = localStorage.getItem("token");

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email, password });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      if (fetchMyCourse) fetchMyCourse(); // Safe check
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  async function registerUser(userName, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, { userName, email, password });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, { otp, activationToken });

      toast.success(data.message);
      localStorage.removeItem("activationToken"); // Specific removal instead of clear()
      setBtnLoading(false);
      navigate("/login");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response?.data?.message || "OTP Verification failed");
    }
  }

  async function fetchUser() {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token },
      });

      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      console.error("Auth fetch error:", error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user, setUser, setIsAuth, isAuth, loginUser,
        btnLoading, loading, registerUser, verifyOtp, fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
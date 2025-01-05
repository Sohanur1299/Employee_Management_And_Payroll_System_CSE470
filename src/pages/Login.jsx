import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('C:/Users/Tasnim/Downloads/MERN-Stack-Employee-MS-main-20241224T200015Z-001/MERN-Stack-Employee-MS-main/server/public/uploads/home.avif')" }}
    >
      <h1 className="font-times text-5xl font-bold text-black mb-8 text-center">
        Employee Management System
      </h1>
      <div className="border shadow p-6 w-80 bg-white">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="*****"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 text-right">
              <a href="#" className="text-blue-600">
                Forgot password?
              </a>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

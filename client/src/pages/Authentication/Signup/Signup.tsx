import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useTheme } from "../../../context/ThemeContext";

import Back from "../../../Layout/Back";

import { baseUrl } from "../../../Config/Config";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [successMessage, setSuccessMessage] = useState("");

  const { theme } = useTheme();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}users/register/`, formData);
      setSuccessMessage(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      setErrors(error.response?.data || { general: "An error occurred" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <div
        className={`bg-white login-wrapper rounded-lg p-8 max-w-[700px] w-full ${
          theme === "light" ? "bg-gray-100" : "bg-[#1f2937]"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-[10px]">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[10px]">
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg 
              border-neutral-300 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg 
              border-neutral-300
              focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <select
              name="role"
              id=""
              className="w-full w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">select your role</option>
              <option value="borrower">BORROWER</option>
              <option value="investor">INVESTOR</option>
            </select>
          </div>
          <div></div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
          {errors.general && (
            <p className="text-red-500 text-center mt-2">{errors.general}</p>
          )}
          <p className="text-center text-sm text-gray-600 mt-4">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Back />
    </div>
  );
};

export default Signup;

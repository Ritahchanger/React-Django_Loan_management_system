import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import Back from "../../../Layout/Back";
import axios from "axios";
import { baseUrl } from "../../../Config/Config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux/Store";
import { login } from "../../../store/slices/authSlice";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post<LoginResponse>(
        `${baseUrl}users/login/`,
        formData
      );

      dispatch(login(response.data));
      const role = response.data.user?.role;
      if (role === "borrower") {
        navigate("/loans");
        return;
      } else {
        navigate("/account/myinvestments");
        return;
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Use correct username and password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-[#1f2937]"
      }`}
    >
      <div className="bg-white p-8 rounded-xl login-wrapper w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              autoComplete="off"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full text-white py-3 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <Back />
    </div>
  );
};

export default Login;

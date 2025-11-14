import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, User } from "lucide-react";
import useAuthStore from "../store/authStore";
import { authAPI } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const data = await authAPI.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "student",
      });

      setAuth(data, data.token);
      navigate("/student/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-primary-100 via-white to-primary-50">
      {/* Left Section - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden">
        {/* Soft dark overlay for visibility */}
        <div className="absolute inset-0 bg-cover bg-center"></div>

        {/* Your real image - no opacity */}
        <img
          src="https://res.cloudinary.com/dmdemru8r/image/upload/v1763121385/ChatGPT_Image_Nov_14_2025_04_55_26_PM_xylkuh.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="German Learning Illustration"
        />

        {/* Text Layer */}
        {/* <div className="relative z-20 text-white text-center px-10">
          <h2 className="text-4xl font-bold mb-4 ">Start Learning German Today 🇩🇪</h2>
          <p className="text-lg opacity-90">
            Join <span className="font-semibold">DeutschMeister</span> and build your A1 foundation with confidence and fun.
          </p>
        </div> */}
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 bg-white shadow-xl z-10 relative">
        <div className="max-w-md w-full space-y-8 mx-auto">
          <div className="text-left">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <BookOpen className="h-10 w-10 text-primary-600" />
              <span className="text-3xl font-bold text-gray-900">
                Deutsch<span className="text-primary-600">Meister</span>
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account ✨
            </h2>
            <p className="mt-2 text-gray-600">
              Begin your{" "}
              <span className="font-medium text-primary-600">
                A1 German journey
              </span>{" "}
              with us
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Slow Server Info */}
            {loading && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded animate-pulse">
                ⏳ Our server may take up to <strong>60 seconds</strong> to wake
                up because it runs on a budget hosting plan.
                <br />
                Thank you for your patience!
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

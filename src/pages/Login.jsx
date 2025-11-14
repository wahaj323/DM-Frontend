import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const data = await authAPI.login(formData);
      setAuth(data, data.token);

      if (data.role === 'teacher' || data.role === 'admin') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-primary-50 via-white to-primary-100">

      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 bg-white shadow-xl z-10 relative">
        <div className="max-w-md w-full space-y-8 mx-auto">

          {/* Header */}
          <div className="text-left">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <BookOpen className="h-10 w-10 text-primary-600" />
              <span className="text-3xl font-bold text-gray-900">
                Deutsch<span className="text-primary-600">Meister</span>
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h2>
            <p className="mt-2 text-gray-600">
              Sign in to continue your <span className="font-medium text-primary-600">German learning journey</span>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section — Image without red opacity */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden bg-black/10">

        {/* Background image — CLEAR, NO RED OPACITY */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dmdemru8r/image/upload/v1763122138/ChatGPT_Image_Nov_14_2025_05_08_41_PM_ndzx39.png')",
          }}
        ></div>

        {/* Optional subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-black/5"></div>

        
      </div>

    </div>
  );
};

export default Login;

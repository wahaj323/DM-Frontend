import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  BookOpen,
  User,
  Settings,
  Users,
  BookMarked,
  TrendingUp,
  Award,
  Menu,
  X,
  Sparkles,
  Bot,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import { useState } from "react";
import myLogo from './logo/logo.jpg';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowMobileMenu(false);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={myLogo}
                alt="DeutschMeister Logo"
                className="h-10 sm:h-11 w-auto"
              />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                Deutsch<span className="text-primary-600">Meister</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={
                    user?.role === "teacher"
                      ? "/teacher/dashboard"
                      : "/student/dashboard"
                  }
                  className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </Link>

                {/* Teacher Links */}
                {user?.role === "teacher" && (
                  <>
                    <Link
                      to="/teacher/students"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <Users className="h-4 w-4" />
                      <span className="hidden xl:inline">Students</span>
                    </Link>
                    <Link
                      to="/teacher/courses"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span className="hidden xl:inline">Courses</span>
                    </Link>
                    <Link
                      to="/teacher/ai-monitor"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <Bot className="h-4 w-4" />
                      <span className="hidden xl:inline">AI Monitor</span>
                    </Link>
                  </>
                )}

                {/* Student Links */}
                {user?.role === "student" && (
                  <>
                    <Link
                      to="/student/courses"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <BookMarked className="h-4 w-4" />
                      <span className="hidden xl:inline">Courses</span>
                    </Link>
                    <Link
                      to="/student/progress"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <TrendingUp className="h-4 w-4" />
                      <span className="hidden xl:inline">Progress</span>
                    </Link>
                    <Link
                      to="/student/quiz-history"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <Award className="h-4 w-4" />
                      <span className="hidden xl:inline">Quizzes</span>
                    </Link>
                    <Link
                      to="/student/ai-assistant"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden xl:inline">AI</span>
                    </Link>
                    <Link
                      to="/student/dictionary"
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span className="hidden xl:inline">Dictionary</span>
                    </Link>
                  </>
                )}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="hidden xl:block">{user?.name}</span>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-gray-700 transition"
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-gray-700 border-t transition"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-red-600 border-t transition"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-700 hover:text-primary-600 p-2"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-1">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-200 mb-2">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>

                <Link
                  to={
                    user?.role === "teacher"
                      ? "/teacher/dashboard"
                      : "/student/dashboard"
                  }
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>

                {/* Teacher Links */}
                {user?.role === "teacher" && (
                  <>
                    <Link
                      to="/teacher/students"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <Users className="h-5 w-5" />
                      <span>Students</span>
                    </Link>
                    <Link
                      to="/teacher/courses"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Courses</span>
                    </Link>
                    <Link
                      to="/teacher/ai-monitor"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <Bot className="h-5 w-5" />
                      <span>AI Monitor</span>
                    </Link>
                  </>
                )}

                {/* Student Links */}
                {user?.role === "student" && (
                  <>
                    <Link
                      to="/student/courses"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <BookMarked className="h-5 w-5" />
                      <span>My Courses</span>
                    </Link>
                    <Link
                      to="/student/progress"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <TrendingUp className="h-5 w-5" />
                      <span>Progress</span>
                    </Link>
                    <Link
                      to="/student/quiz-history"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <Award className="h-5 w-5" />
                      <span>Quiz History</span>
                    </Link>
                    <Link
                      to="/student/ai-assistant"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>AI Assistant</span>
                    </Link>
                    <Link
                      to="/student/dictionary"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Dictionary</span>
                    </Link>
                  </>
                )}

                {/* Profile & Settings */}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                  >
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 text-red-600 hover:bg-red-50 px-4 py-3 rounded-md transition"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block text-gray-700 hover:bg-primary-50 hover:text-primary-600 px-4 py-3 rounded-md transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-md transition text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Desktop Dropdown Overlay */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;

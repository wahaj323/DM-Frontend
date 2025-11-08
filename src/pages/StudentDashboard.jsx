import {
  BookOpen,
  Award,
  BookMarked,
  Bot,
  TrendingUp,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Calendar,
  Star,
  ChevronRight,
  Play,
  CheckCircle2,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { userAPI } from "../services/userAPI";
import ActivityFeed from "../components/ActivityFeed";
import { dictionaryAPI } from '../services/dictionaryAPI';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsDict, setStatsDict] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    fetchStats();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        userAPI.getStats(),
        userAPI.getActivity(1, 5),
      ]);
      setStats(statsData);
      setActivities(activityData.activities);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await dictionaryAPI.getStats();
      setStatsDict(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statsDisplay = [
    {
      label: "Enrolled Courses",
      value: stats?.enrolledCourses || 0,
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "+2 this week"
    },
    {
      label: "Lessons Completed",
      value: stats?.completedLessons || 0,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "+5 this week"
    },
    {
      label: "Vocabulary Words",
      value: statsDict?.totalWords || 0,
      icon: BookMarked,
      gradient: "from-violet-500 to-purple-500",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      trend: "+12 new words"
    },
    {
      label: "Quizzes Passed",
      value: stats?.quizzesPassed || 0,
      icon: Award,
      gradient: "from-orange-500 to-amber-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: "3 perfect scores"
    },
  ];

  const quickLinks = [
    {
      label: "My Courses",
      description: "Continue learning",
      icon: BookOpen,
      action: () => navigate("/student/courses"),
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      label: "AI Assistant",
      description: "Get instant help",
      icon: Sparkles,
      action: () => navigate("/student/ai-assistant"),
      gradient: "from-violet-500 to-purple-500",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600"
    },
    {
      label: "My Progress",
      description: "Track performance",
      icon: BarChart3,
      action: () => navigate("/student/progress"),
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      label: "Quiz History",
      description: "Review results",
      icon: Award,
      action: () => navigate("/student/quiz-history"),
      gradient: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      label: "Dictionary",
      description: "Browse vocabulary",
      icon: BookMarked,
      action: () => navigate("/student/dictionary"),
      gradient: "from-pink-500 to-rose-500",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600"
    },
  ];

  const completionPercentage = stats?.completedLessons
    ? Math.min(
        Math.round(
          (stats.completedLessons / Math.max(stats.unlockedLessons, 1)) * 100
        ),
        100
      )
    : 0;

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Guten Morgen";
    if (hour < 18) return "Guten Tag";
    return "Guten Abend";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Header with Gradient */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 sm:p-2">
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      {getCurrentGreeting()}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 truncate">
                    Welcome back, {user?.name?.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-blue-100 mb-3 sm:mb-4">
                    Ready to continue your German learning journey?
                  </p>
                  
                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate("/student/courses")}
                      className="group bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium active:scale-95"
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Continue Learning</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition" />
                    </button>
                    <button
                      onClick={() => navigate("/student/ai-assistant")}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium active:scale-95"
                    >
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">AI Help</span>
                      <span className="sm:hidden">AI</span>
                    </button>
                  </div>
                </div>
                
                {/* Profile Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 sm:border-4 border-white/30 flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {statsDisplay.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 sm:p-4 lg:p-6 border border-gray-100 hover:border-gray-200 cursor-pointer hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className={`${stat.iconBg} w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition`}>
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                </div>
                <p className="text-[10px] sm:text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {stat.value}
                </p>
                <p className="text-[9px] sm:text-xs text-gray-400 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                  <span className="truncate">{stat.trend}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access - Modern Card Design */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                Quick Access
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Jump right into your learning</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={link.action}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 hover:border-gray-300 active:scale-95"
              >
                <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                  <div className={`${link.iconBg} w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition`}>
                    <link.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${link.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm mb-0.5">
                      {link.label}
                    </p>
                    <p className="text-[9px] sm:text-xs text-gray-500 hidden sm:block">
                      {link.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Continue Learning - Enhanced */}
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  Continue Learning
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Pick up where you left off</p>
              </div>
              <button
                onClick={() => navigate("/student/progress")}
                className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                <span className="hidden sm:inline">View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {stats?.enrolledCourses > 0 ? (
              <div className="text-center py-8 sm:py-12 lg:py-16">
                <div className="bg-gradient-to-br from-blue-100 to-violet-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Ready to continue?</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto px-4">
                  You have {stats.enrolledCourses} active {stats.enrolledCourses === 1 ? 'course' : 'courses'}
                </p>
                <button
                  onClick={() => navigate("/student/courses")}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto active:scale-95"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Go to My Courses
                </button>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 lg:py-16">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No courses enrolled yet</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto px-4">
                  Contact your teacher to get enrolled in a course and start learning
                </p>
                <button
                  onClick={() => navigate("/student/courses")}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto active:scale-95"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  Explore Courses
                </button>
              </div>
            )}
          </div>

          {/* Today's Progress - Redesigned */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                Today's Goal
              </h2>
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
            </div>
            
            <div className="text-center py-4 sm:py-6">
              {/* Modern Circular Progress */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="white"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(completionPercentage / 100) * 283} 283`}
                    className="transition-all duration-1000 drop-shadow-lg"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold mb-1">
                    {completionPercentage}%
                  </span>
                  <span className="text-xs sm:text-sm text-white/80">Complete</span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6 px-4">
                {completionPercentage === 0
                  ? "Start your learning journey today!"
                  : completionPercentage < 50
                  ? "Great start! Keep going!"
                  : completionPercentage < 100
                  ? "Almost there! You're doing amazing!"
                  : "Perfect! You've completed today's goal! 🎉"}
              </p>
              
              <button
                onClick={() => navigate("/student/courses")}
                className="w-full bg-white text-violet-600 hover:bg-gray-50 px-4 py-2.5 sm:py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                Start Learning
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-white/80 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Total Lessons
                </span>
                <span className="font-bold">{stats?.unlockedLessons || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Completed
                </span>
                <span className="font-bold">{stats?.completedLessons || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-white/80 flex items-center gap-2">
                  <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Vocabulary
                </span>
                <span className="font-bold">{stats?.vocabularyCount || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity - Modern Design */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                Recent Activity
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Your latest actions</p>
            </div>
            {activities.length > 0 && (
              <button
                onClick={() => navigate("/profile")}
                className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                <span className="hidden sm:inline">View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
          <ActivityFeed activities={activities} loading={loading} />
        </div>

        {/* Welcome Features - Modern Grid */}
        <div className="bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold">Welcome to DeutschMeister</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
                🎉 Start Your German Journey!
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-blue-100 max-w-2xl mx-auto px-2">
                Everything you need to master German, all in one place
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 hover:bg-white/20 transition group">
                <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2">Interactive Lessons</h3>
                <p className="text-xs sm:text-sm text-blue-100">
                  Learn with audio, dialogues, and engaging content
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 hover:bg-white/20 transition group">
                <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2">AI-Powered Help</h3>
                <p className="text-xs sm:text-sm text-blue-100">
                  Get instant assistance from our AI tutor anytime
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 hover:bg-white/20 transition group sm:col-span-2 lg:col-span-1">
                <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2">Track Progress</h3>
                <p className="text-xs sm:text-sm text-blue-100">
                  Monitor your journey and celebrate milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

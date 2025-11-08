import { useState, useEffect } from 'react';
import { progressAPI } from '../services/progressAPI';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar, 
  CheckCircle,
  Target,
  Zap,
  BookmarkCheck,
  ChevronRight,
  Trophy,
  Flame,
  Star
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import ProgressCircle from '../components/ProgressCircle';
import { useNavigate } from 'react-router-dom';

const StudentProgress = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await progressAPI.getDashboard();
      setDashboard(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Convert total time to hours and minutes
  const formatStudyTime = (totalHours) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    if (hours === 0) {
      return { display: `${minutes}m`, hours: 0, minutes };
    } else if (minutes === 0) {
      return { display: `${hours}h`, hours, minutes: 0 };
    } else {
      return { display: `${hours}h ${minutes}m`, hours, minutes };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 mt-6 font-medium">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center p-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md shadow-lg">
          <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-red-900 text-center mb-2">Oops!</h3>
          <p className="text-red-800 text-center">{error}</p>
        </div>
      </div>
    );
  }

  const studyTime = formatStudyTime(dashboard.totalTimeSpent);
  const completedCourses = dashboard.courseProgress.filter(c => c.progressPercentage === 100).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1.5 sm:p-2">
                      <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      Progress Dashboard
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                    My Learning Progress
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-blue-100">
                    Track your journey and celebrate achievements
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-white/30">
                  <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {/* Lessons Completed */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 sm:p-3 rounded-xl">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {dashboard.totalCompletedLessons}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Lessons Completed</p>
            <p className="text-[10px] sm:text-xs text-gray-500">
              of {dashboard.totalLessonsAcrossAllCourses} total
            </p>
          </div>

          {/* Time Studied */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 sm:p-3 rounded-xl">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {studyTime.display}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Time Studied</p>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {studyTime.hours > 0 ? `${studyTime.hours} hours ` : ''}{studyTime.minutes > 0 ? `${studyTime.minutes} minutes` : ''}
            </p>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-2 sm:p-3 rounded-xl">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-600" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {dashboard.overallProgress}%
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Overall Progress</p>
            <p className="text-[10px] sm:text-xs text-gray-500">Across all courses</p>
          </div>

          {/* Courses Completed */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-2 sm:p-3 rounded-xl">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-600" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {completedCourses}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Courses Completed</p>
            <p className="text-[10px] sm:text-xs text-gray-500">Ready for certificates</p>
          </div>
        </div>

        {/* Overall Progress Circle */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Overall Learning Progress
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
            <ProgressCircle 
              percentage={dashboard.overallProgress} 
              size={window.innerWidth < 640 ? 140 : 160} 
              strokeWidth={12} 
            />
            <div className="text-center md:text-left">
              <p className="text-sm sm:text-base text-gray-600 mb-2">You've completed</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {dashboard.totalCompletedLessons}/{dashboard.totalLessonsAcrossAllCourses}
              </p>
              <p className="text-sm sm:text-base text-gray-600">lessons across all your courses</p>
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Course Progress
          </h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {dashboard.courseProgress.map((course) => (
              <div 
                key={course.courseId} 
                className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:shadow-md hover:border-blue-200 transition group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1">
                        {course.courseTitle}
                      </h3>
                      {course.progressPercentage === 100 && (
                        <div className="bg-amber-100 rounded-lg p-1.5 sm:p-2 border border-amber-200">
                          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Last: {formatDate(course.lastAccessed)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="font-bold text-blue-600">{course.progressPercentage}%</span>
                  </div>
                  <div className="h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progressPercentage === 100 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                      }`}
                      style={{ width: `${course.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => navigate(`/courses/${course.courseId}`)}
                    className="flex-1 px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    Continue Learning
                  </button>
                  {course.progressPercentage === 100 && (
                    <button
                      onClick={() => navigate(`/student/certificates/${course.courseId}`)}
                      className="flex-1 px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg sm:rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
                    >
                      <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                      Get Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}

            {dashboard.courseProgress.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Courses Yet</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Start your learning journey today!</p>
                <button
                  onClick={() => navigate('/student/courses')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition shadow-lg hover:shadow-xl inline-flex items-center gap-2 active:scale-95"
                >
                  <Star className="w-5 h-5" />
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        {dashboard.recentLessons.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              Recent Lessons
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {dashboard.recentLessons.map((progress) => (
                <div 
                  key={progress._id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent hover:border-blue-200 transition group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-2.5 rounded-lg flex-shrink-0 ${
                      progress.status === 'completed' 
                        ? 'bg-emerald-100 border border-emerald-200' 
                        : 'bg-amber-100 border border-amber-200'
                    }`}>
                      {progress.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      ) : (
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                        {progress.lessonId?.title || 'Lesson'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {formatDate(progress.lastAccessedAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/student/lessons/${progress.lessonId._id}`)}
                    className="px-4 py-2 text-sm sm:text-base text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition flex items-center justify-center gap-2 border border-blue-200 group-hover:border-blue-300"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookmarked Lessons */}
        {dashboard.bookmarkedLessons.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              Bookmarked Lessons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {dashboard.bookmarkedLessons.map((progress) => (
                <div 
                  key={progress._id} 
                  className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-blue-200 transition"
                >
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <p className="font-semibold text-sm sm:text-base text-gray-900 flex-1">
                      {progress.lessonId?.title || 'Lesson'}
                    </p>
                    {progress.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    {progress.courseId?.title || 'Course'}
                  </p>
                  <button
                    onClick={() => navigate(`/student/lessons/${progress.lessonId._id}`)}
                    className="w-full px-4 py-2 sm:py-2.5 text-sm sm:text-base text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg sm:rounded-xl font-semibold transition active:scale-95"
                  >
                    Go to Lesson
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Footer */}
        {dashboard.totalCompletedLessons > 0 && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 flex-shrink-0">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-base sm:text-lg font-bold mb-1">Keep the Momentum! 🚀</h3>
                <p className="text-xs sm:text-sm text-emerald-100">
                  You've completed {dashboard.totalCompletedLessons} lessons and studied for {studyTime.display}. 
                  Keep going and achieve your goals!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;
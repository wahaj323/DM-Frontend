import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  RefreshCw,
  GraduationCap,
  Target,
  TrendingUp,
  CheckCircle,
  Lock,
  Play,
  Sparkles,
  Tag
} from 'lucide-react';
import { courseAPI } from '../services/courseAPI';
import CourseOutlineView from '../components/CourseOutlineView';
import QuizSection from '../components/QuizSection';
import useAuthStore from '../store/authStore';
import { authAPI } from '../services/api';

const PublicCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCourse();
    refreshUserData();
  }, [courseId]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const data = await courseAPI.getCourse(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
      alert('Failed to load course');
      navigate('/student/courses');
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    try {
      const userData = await authAPI.getMe();
      updateUser(userData);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshUserData();
    await fetchCourse();
    setRefreshing(false);
    alert('Course content refreshed!');
  };

  const isEnrolled = course?.enrolledStudents?.some(
    e => e.studentId === user?._id
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 mt-6 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/student/courses')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 group transition"
        >
          <div className="bg-white rounded-lg p-2 shadow-sm group-hover:shadow-md transition border border-gray-100">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition" />
          </div>
          <span className="font-medium text-sm sm:text-base">Back to Courses</span>
        </button>

        {/* Enhanced Course Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl mb-6 sm:mb-8 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Left Content */}
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/30">
                    <span className="text-xs sm:text-sm font-semibold">{course.level}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/30">
                    <span className="text-xs sm:text-sm font-semibold">{course.category}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/30">
                    <span className="text-xs sm:text-sm font-semibold capitalize">{course.difficulty}</span>
                  </div>
                  {isEnrolled && (
                    <div className="bg-emerald-500/90 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/30 flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-semibold">Enrolled</span>
                    </div>
                  )}
                </div>
                
                {/* Title & Description */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
                  {course.title}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-4 sm:mb-6 leading-relaxed">
                  {course.description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium text-blue-100">Modules</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">{course.modules?.length || 0}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium text-blue-100">Duration</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">{course.estimatedDuration}h</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium text-blue-100">Students</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">{course.enrolledStudents?.length || 0}</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Enrollment Card */}
              <div className="lg:w-80 flex-shrink-0">
                {isEnrolled ? (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-emerald-500/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
                        <Award className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300" />
                      </div>
                    </div>
                    <h3 className="text-center text-lg sm:text-xl font-bold mb-2">You're Enrolled!</h3>
                    <p className="text-center text-xs sm:text-sm text-blue-100 mb-4">
                      Start your learning journey now
                    </p>

                    <button
                      onClick={() => navigate(`/student/learning/${courseId}`)}
                      className="w-full bg-white text-blue-600 hover:bg-blue-50 px-4 py-3 sm:py-3.5 rounded-xl font-semibold mb-3 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Play className="w-5 h-5" />
                      Start Learning
                    </button>

                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                      <span className="text-sm">{refreshing ? 'Refreshing...' : 'Refresh Content'}</span>
                    </button>

                    <p className="text-center text-xs text-blue-200 mt-3">
                      Click refresh if new lessons don't appear
                    </p>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                    </div>
                    <h3 className="text-center text-lg sm:text-xl font-bold mb-2">Enrollment Required</h3>
                    <p className="text-center text-xs sm:text-sm text-blue-100 mb-4">
                      Contact your teacher to get access to this course
                    </p>
                    <button
                      disabled
                      className="w-full bg-white/20 text-white px-4 py-3 sm:py-3.5 rounded-xl font-semibold cursor-not-allowed opacity-60"
                    >
                      Not Enrolled
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        {isEnrolled && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 shadow-sm">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="bg-blue-500 rounded-lg p-2">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-blue-900 mb-1">Learning Progress</h4>
                <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                  Your teacher controls lesson access. Locked lessons show a 🔒 icon. 
                  If you've received access to new content, use the <strong>Refresh Content</strong> button above to update.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Teacher Info Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            About the Teacher
          </h2>
          <div className="flex items-center gap-3 sm:gap-4">
            {course.teacherId?.profileImage ? (
              <img
                src={course.teacherId.profileImage}
                alt={course.teacherId.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-blue-50">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{course.teacherId?.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{course.teacherId?.email}</p>
            </div>
            <div className="hidden sm:block">
              <div className="bg-blue-50 rounded-xl px-4 py-2 border border-blue-100">
                <p className="text-xs font-medium text-blue-600">Instructor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Outline */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Course Outline
          </h2>
          <CourseOutlineView course={course} />
        </div>

        {/* Quizzes Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            Course Quizzes
          </h2>
          <QuizSection courseId={courseId} />
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              Course Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 hover:shadow-sm transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Footer for Enrolled Students */}
        {isEnrolled && (
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 flex-shrink-0">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-base sm:text-lg font-bold mb-1">Ready to Excel? 🚀</h3>
                <p className="text-xs sm:text-sm text-emerald-100">
                  You're enrolled and ready to learn. Complete modules, take quizzes, and master German step by step!
                </p>
              </div>
              <button
                onClick={() => navigate(`/student/learning/${courseId}`)}
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 active:scale-95 text-sm sm:text-base"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Continue Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicCourse;
import { 
  BookOpen, 
  Lock, 
  CheckCircle, 
  Clock, 
  Play,
  FileText,
  Video,
  Headphones,
  FileQuestion,
  ChevronRight,
  Award,
  Circle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { authAPI } from '../services/api';

const CourseOutlineView = ({ course, userProgress = [] }) => {
  const navigate = useNavigate();
  const { user: storeUser, updateUser } = useAuthStore();
  const [currentUser, setCurrentUser] = useState(storeUser);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});

  // Fetch fresh user data to get latest unlocked lessons
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authAPI.getMe();
        setCurrentUser(userData);
        updateUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setCurrentUser(storeUser);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Expand first module by default
    if (course?.modules?.length > 0) {
      setExpandedModules({ [course.modules[0]._id]: true });
    }
  }, [course._id]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const isLessonCompleted = (lessonId) => {
    return userProgress.includes(lessonId);
  };

  const isLessonUnlocked = (lessonId) => {
    if (!currentUser || !currentUser.unlockedLessons) return false;
    return currentUser.unlockedLessons.some(l => l.toString() === lessonId.toString());
  };

  const handleLessonClick = (lesson, unlocked) => {
    if (currentUser?.role === 'student' && unlocked) {
      navigate(`/student/lessons/${lesson._id}`);
    }
  };

  const getLessonIcon = (type) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5";
    switch (type?.toLowerCase()) {
      case 'video':
        return <Video className={iconClass} />;
      case 'audio':
        return <Headphones className={iconClass} />;
      case 'reading':
        return <FileText className={iconClass} />;
      case 'quiz':
        return <FileQuestion className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  const getModuleProgress = (module) => {
    if (!module.lessons || module.lessons.length === 0) return 0;
    const completedLessons = module.lessons.filter(lesson => 
      isLessonCompleted(lesson._id)
    ).length;
    return Math.round((completedLessons / module.lessons.length) * 100);
  };

  const getUnlockedLessonsCount = (module) => {
    if (!module.lessons) return 0;
    return module.lessons.filter(lesson => isLessonUnlocked(lesson._id)).length;
  };

  if (loading) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-sm sm:text-base font-medium">Loading course content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {course.modules && course.modules.length > 0 ? (
        course.modules.map((module, moduleIndex) => {
          const progress = getModuleProgress(module);
          const unlockedCount = getUnlockedLessonsCount(module);
          const totalLessons = module.lessons?.length || 0;
          const isExpanded = expandedModules[module._id];

          return (
            <div 
              key={module._id} 
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md"
            >
              {/* Module Header */}
              <div 
                onClick={() => toggleModule(module._id)}
                className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100 cursor-pointer hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100 transition"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Module Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-base sm:text-lg shadow-lg">
                      {moduleIndex + 1}
                    </div>
                  </div>

                  {/* Module Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                        {module.title}
                      </h3>
                      <ChevronRight 
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0 transition transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                    
                    {module.description && (
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                        {module.description}
                      </p>
                    )}

                    {/* Module Stats */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                      <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-gray-200">
                        <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}
                        </span>
                      </div>
                      
                      {module.estimatedDuration > 0 && (
                        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-gray-200">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            {module.estimatedDuration} min
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-gray-200">
                        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          {unlockedCount}/{totalLessons} unlocked
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {progress > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-gray-700">Progress</span>
                          <span className="font-bold text-blue-600">{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              {isExpanded && (
                <div className="divide-y divide-gray-100">
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson, lessonIndex) => {
                      const unlocked = isLessonUnlocked(lesson._id);
                      const completed = isLessonCompleted(lesson._id);
                      
                      return (
                        <div
                          key={lesson._id}
                          onClick={() => handleLessonClick(lesson, unlocked)}
                          className={`p-3 sm:p-4 flex items-start sm:items-center gap-3 transition ${
                            unlocked 
                              ? 'hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent cursor-pointer group' 
                              : 'bg-gray-50/50 cursor-not-allowed opacity-75'
                          }`}
                        >
                          {/* Lesson Number */}
                          <div className="flex-shrink-0">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-sm sm:text-base font-bold transition ${
                              completed 
                                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                                : unlocked
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300 group-hover:bg-blue-200'
                                : 'bg-gray-200 text-gray-500 border-2 border-gray-300'
                            }`}>
                              {lessonIndex + 1}
                            </div>
                          </div>

                          {/* Lesson Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className={`font-semibold text-sm sm:text-base ${
                                unlocked ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {lesson.title}
                              </h4>
                              {!unlocked && (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                                  <Lock className="w-3 h-3" />
                                  Locked
                                </span>
                              )}
                            </div>
                            
                            {lesson.description && (
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                                {lesson.description}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] sm:text-xs font-medium">
                                {getLessonIcon(lesson.type)}
                                <span className="capitalize">{lesson.type}</span>
                              </span>
                              {lesson.estimatedDuration > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  {lesson.estimatedDuration} min
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Status Icon */}
                          <div className="flex-shrink-0">
                            {completed ? (
                              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                                <span className="text-[10px] sm:text-xs text-green-600 font-semibold hidden sm:inline">
                                  Completed
                                </span>
                              </div>
                            ) : unlocked ? (
                              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-3 border-blue-500 flex items-center justify-center group-hover:bg-blue-50 transition">
                                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                </div>
                                <span className="text-[10px] sm:text-xs text-blue-600 font-semibold hidden sm:inline">
                                  Start
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
                                <span className="text-[10px] sm:text-xs text-gray-500 font-medium hidden sm:inline">
                                  Locked
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 sm:p-12 text-center text-gray-500">
                      <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm sm:text-base font-medium">No lessons in this module yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 lg:p-16 text-center">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Modules Yet</h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            This course doesn't have any modules yet. Check back later for updates.
          </p>
        </div>
      )}

      {/* Summary Card */}
      {course.modules && course.modules.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white relative overflow-hidden mt-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 flex-shrink-0">
              <Award className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-base sm:text-lg font-bold mb-1">Course Summary</h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Total: <strong>{course.modules.length}</strong> modules • 
                <strong className="ml-1">
                  {course.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)}
                </strong> lessons • 
                <strong className="ml-1">
                  {course.modules.reduce((sum, m) => sum + (m.estimatedDuration || 0), 0)}
                </strong> minutes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseOutlineView
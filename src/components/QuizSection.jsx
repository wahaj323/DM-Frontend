import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Lock, 
  Trophy, 
  Target, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  PlayCircle,
  BarChart3
} from 'lucide-react';
import { quizAPI } from '../services/quizAPI';
import { attemptAPI } from '../services/attemptAPI';
import useAuthStore from '../store/authStore';
import QuizCard from './quiz/QuizCard';

const QuizSection = ({ courseId }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchQuizzes();
    }
  }, [courseId]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizAPI.getCourseQuizzes(courseId);
      
      const publishedQuizzes = data.filter(q => q.published);
      setQuizzes(publishedQuizzes);

      const attemptsData = {};
      for (const quiz of publishedQuizzes) {
        try {
          const quizAttempts = await attemptAPI.getQuizAttempts(quiz._id);
          attemptsData[quiz._id] = quizAttempts;
        } catch (error) {
          console.error('Error fetching attempts for quiz:', quiz._id, error);
          attemptsData[quiz._id] = [];
        }
      }
      setAttempts(attemptsData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quiz) => {
    const isUnlocked = user?.unlockedQuizzes?.some(q => q.toString() === quiz._id);
    
    if (!isUnlocked) {
      alert('This quiz is locked. Please contact your teacher to unlock it.');
      return;
    }

    const quizAttemptCount = (attempts[quiz._id] || []).length;
    const maxAttempts = quiz.settings?.maxAttempts || 3;
    const canAttempt = maxAttempts === 0 || quizAttemptCount < maxAttempts;

    if (canAttempt) {
      navigate(`/student/quiz/${quiz._id}`);
    } else {
      alert(`No attempts remaining for this quiz. You have used ${quizAttemptCount}/${maxAttempts} attempts.`);
    }
  };

  const getBestScore = (quizId) => {
    const quizAttempts = attempts[quizId] || [];
    if (quizAttempts.length === 0) return null;
    return Math.max(...quizAttempts.map(a => a.score));
  };

  const getAverageScore = (quizId) => {
    const quizAttempts = attempts[quizId] || [];
    if (quizAttempts.length === 0) return null;
    const sum = quizAttempts.reduce((acc, a) => acc + a.score, 0);
    return Math.round(sum / quizAttempts.length);
  };

  const isQuizUnlocked = (quizId) => {
    return user?.unlockedQuizzes?.some(q => q.toString() === quizId);
  };

  const isQuizCompleted = (quizId) => {
    return (attempts[quizId] || []).length > 0;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-emerald-100 border-emerald-300';
    if (score >= 70) return 'bg-blue-100 border-blue-300';
    if (score >= 50) return 'bg-amber-100 border-amber-300';
    return 'bg-red-100 border-red-300';
  };

  // Calculate overall stats
  const totalQuizzes = quizzes.length;
  const unlockedQuizzes = quizzes.filter(q => isQuizUnlocked(q._id)).length;
  const completedQuizzes = quizzes.filter(q => isQuizCompleted(q._id)).length;
  const averageScore = quizzes.length > 0 
    ? Math.round(quizzes.reduce((sum, q) => sum + (getBestScore(q._id) || 0), 0) / quizzes.length)
    : 0;

  if (loading) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-sm sm:text-base font-medium">Loading quizzes...</p>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl shadow-sm border border-purple-100 p-8 sm:p-12 text-center">
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Quizzes Yet</h3>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          Quizzes will appear here once your teacher creates them. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-600 rounded-lg p-1.5 sm:p-2">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-blue-900">Total</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-blue-900">{totalQuizzes}</div>
          <p className="text-[10px] sm:text-xs text-blue-600 mt-1">Available quizzes</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-600 rounded-lg p-1.5 sm:p-2">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-emerald-900">Completed</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-900">{completedQuizzes}</div>
          <p className="text-[10px] sm:text-xs text-emerald-600 mt-1">Quizzes taken</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-600 rounded-lg p-1.5 sm:p-2">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-purple-900">Unlocked</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-purple-900">{unlockedQuizzes}</div>
          <p className="text-[10px] sm:text-xs text-purple-600 mt-1">Ready to attempt</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-amber-600 rounded-lg p-1.5 sm:p-2">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-amber-900">Average</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-900">{averageScore}%</div>
          <p className="text-[10px] sm:text-xs text-amber-600 mt-1">Best scores</p>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {quizzes.map((quiz) => {
          const quizAttemptCount = (attempts[quiz._id] || []).length;
          const bestScore = getBestScore(quiz._id);
          const averageScore = getAverageScore(quiz._id);
          const unlocked = isQuizUnlocked(quiz._id);
          const completed = isQuizCompleted(quiz._id);
          const maxAttempts = quiz.settings?.maxAttempts || 3;
          const attemptsRemaining = maxAttempts === 0 ? 'Unlimited' : maxAttempts - quizAttemptCount;
          
          return (
            <div 
              key={quiz._id} 
              className={`bg-white rounded-xl sm:rounded-2xl shadow-sm border overflow-hidden transition hover:shadow-md relative ${
                unlocked ? 'border-gray-200' : 'border-gray-300'
              }`}
            >
              {/* Locked Overlay */}
              {!unlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl z-10 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 inline-flex mb-3">
                      <Lock className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <p className="text-base sm:text-lg font-bold mb-1">Quiz Locked</p>
                    <p className="text-xs sm:text-sm text-gray-300">Contact your teacher to unlock</p>
                  </div>
                </div>
              )}

              {/* Quiz Header */}
              <div className={`p-4 sm:p-5 ${
                completed 
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100'
                  : 'bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100'
              }`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1 line-clamp-2">
                    {quiz.title}
                  </h3>
                  {completed && (
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                  )}
                </div>
                {quiz.description && (
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {quiz.description}
                  </p>
                )}
              </div>

              {/* Quiz Body */}
              <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                {/* Quiz Info */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                      <span className="text-[10px] sm:text-xs font-medium text-gray-600">Questions</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-gray-900">
                      {quiz.questions?.length || 0}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                      <span className="text-[10px] sm:text-xs font-medium text-gray-600">Duration</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-gray-900">
                      {quiz.settings?.timeLimit || 'No'} min
                    </div>
                  </div>
                </div>

                {/* Attempts Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-blue-900">Attempts</span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {quizAttemptCount} / {maxAttempts === 0 ? '∞' : maxAttempts}
                    </span>
                  </div>
                  {maxAttempts > 0 && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${(quizAttemptCount / maxAttempts) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scores */}
                {bestScore !== null && (
                  <div className="space-y-2">
                    <div className={`border-2 rounded-lg p-2 sm:p-3 ${getScoreBgColor(bestScore)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 ${getScoreColor(bestScore)}`} />
                          <span className="text-xs sm:text-sm font-semibold text-gray-700">Best Score</span>
                        </div>
                        <span className={`text-lg sm:text-xl font-bold ${getScoreColor(bestScore)}`}>
                          {bestScore}%
                        </span>
                      </div>
                    </div>
                    {quizAttemptCount > 1 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <span className="text-xs sm:text-sm font-medium text-gray-700">Average</span>
                          </div>
                          <span className="text-base sm:text-lg font-bold text-gray-900">
                            {averageScore}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  disabled={!unlocked || (maxAttempts > 0 && quizAttemptCount >= maxAttempts)}
                  className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition flex items-center justify-center gap-2 ${
                    !unlocked || (maxAttempts > 0 && quizAttemptCount >= maxAttempts)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : completed
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                  }`}
                >
                  {!unlocked ? (
                    <>
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Locked</span>
                    </>
                  ) : maxAttempts > 0 && quizAttemptCount >= maxAttempts ? (
                    <>
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>No Attempts Left</span>
                    </>
                  ) : completed ? (
                    <>
                      <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Retake Quiz</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Start Quiz</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizSection;
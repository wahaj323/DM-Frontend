import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  TrendingUp,
  Trophy,
  Target,
  Zap,
  Calendar,
  BarChart3,
  ArrowRight,
  Star,
  ChevronRight,
  TrendingDown,
  Filter
} from 'lucide-react';
import { attemptAPI } from '../services/attemptAPI';

const QuizAttempts = () => {
  const navigate = useNavigate();
  
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all'); // all, passed, failed

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      setLoading(true);
      const data = await attemptAPI.getHistory();
      setAttempts(data);
      
      // Calculate stats
      if (data.length > 0) {
        const totalScore = data.reduce((sum, a) => sum + a.score, 0);
        const passed = data.filter(a => a.passed).length;
        
        setStats({
          totalAttempts: data.length,
          averageScore: Math.round(totalScore / data.length),
          passed,
          failed: data.length - passed,
          bestScore: Math.max(...data.map(a => a.score)),
          recentScore: data[0].score
        });
      }
    } catch (error) {
      console.error('Error fetching attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A', color: 'emerald', emoji: '🌟' };
    if (score >= 80) return { grade: 'B', color: 'blue', emoji: '⭐' };
    if (score >= 70) return { grade: 'C', color: 'yellow', emoji: '✨' };
    if (score >= 60) return { grade: 'D', color: 'orange', emoji: '💫' };
    return { grade: 'F', color: 'red', emoji: '📚' };
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-emerald-500 to-teal-500';
    if (score >= 80) return 'from-blue-500 to-cyan-500';
    if (score >= 70) return 'from-yellow-500 to-amber-500';
    return 'from-red-500 to-orange-500';
  };

  const filteredAttempts = attempts.filter(attempt => {
    if (filter === 'passed') return attempt.passed;
    if (filter === 'failed') return !attempt.passed;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-violet-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600 font-medium">Loading your quiz history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1.5 sm:p-2">
                      <Trophy className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      Your Performance
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                    Quiz History & Scores
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-blue-100">
                    Track your progress and review all quiz attempts
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center border border-white/30">
                    <div className="text-lg sm:text-2xl font-bold">{stats?.totalAttempts || 0}</div>
                    <div className="text-[9px] sm:text-xs text-blue-100">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 sm:p-4 lg:p-6 border border-gray-100 hover:border-violet-200 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="bg-violet-100 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats.totalAttempts}</div>
                  <div className="text-[9px] sm:text-xs text-gray-500 uppercase tracking-wide">Attempts</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-emerald-600">
                <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>All time</span>
              </div>
            </div>

            <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 sm:p-4 lg:p-6 border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats.averageScore}%</div>
                  <div className="text-[9px] sm:text-xs text-gray-500 uppercase tracking-wide">Average</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-purple-600">
                <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>Your score</span>
              </div>
            </div>

            <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 sm:p-4 lg:p-6 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="bg-emerald-100 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">{stats.passed}</div>
                  <div className="text-[9px] sm:text-xs text-gray-500 uppercase tracking-wide">Passed</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-emerald-600">
                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{stats.failed} failed</span>
              </div>
            </div>

            <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 sm:p-4 lg:p-6 border border-gray-100 hover:border-amber-200 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="bg-amber-100 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats.bestScore}%</div>
                  <div className="text-[9px] sm:text-xs text-gray-500 uppercase tracking-wide">Best</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-amber-600">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>Top score</span>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  filter === 'all'
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({attempts.length})
              </button>
              <button
                onClick={() => setFilter('passed')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  filter === 'passed'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Passed ({stats?.passed || 0})
              </button>
              <button
                onClick={() => setFilter('failed')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  filter === 'failed'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Failed ({stats?.failed || 0})
              </button>
            </div>
          </div>
        </div>

        {/* Attempts List */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Quiz Attempts</h2>
              <span className="text-xs sm:text-sm text-gray-500">{filteredAttempts.length} results</span>
            </div>
          </div>

          {filteredAttempts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                {filter === 'all' ? 'No quiz attempts yet' : `No ${filter} attempts`}
              </p>
              <button
                onClick={() => navigate('/student/dashboard')}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto active:scale-95 text-sm sm:text-base"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {filteredAttempts.map((attempt) => {
                const gradeInfo = getGrade(attempt.score);
                return (
                  <div key={attempt._id} className="p-3 sm:p-4 lg:p-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition group">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4">
                      {/* Left Section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className={`flex-shrink-0 bg-gradient-to-br ${getScoreColor(attempt.score)} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-white shadow-lg`}>
                            <span className="text-lg sm:text-2xl font-bold">{gradeInfo.grade}</span>
                            <span className="text-[9px] sm:text-xs opacity-80">Grade</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
                              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">
                                {attempt.quizId?.title || 'Quiz'}
                              </h3>
                              <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold flex items-center gap-1 flex-shrink-0 ${
                                attempt.passed 
                                  ? 'bg-emerald-100 text-emerald-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {attempt.passed ? (
                                  <>
                                    <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    PASSED
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    FAILED
                                  </>
                                )}
                              </span>
                            </div>

                            <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 truncate">
                              📚 {attempt.courseId?.title || 'Unknown Course'}
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                              <div>
                                <p className="text-gray-500 mb-0.5 sm:mb-1 text-[10px] sm:text-xs">Score</p>
                                <p className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${getScoreColor(attempt.score)} bg-clip-text text-transparent`}>
                                  {attempt.score}%
                                </p>
                                <p className="text-[9px] sm:text-xs text-gray-400">{gradeInfo.emoji} {gradeInfo.grade} grade</p>
                              </div>

                              <div>
                                <p className="text-gray-500 mb-0.5 sm:mb-1 text-[10px] sm:text-xs">Points</p>
                                <p className="font-bold text-gray-900 text-sm sm:text-base">
                                  {attempt.earnedPoints}/{attempt.totalPoints}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-500 mb-0.5 sm:mb-1 text-[10px] sm:text-xs">Correct</p>
                                <p className="font-bold text-emerald-600 text-sm sm:text-base">
                                  {attempt.answers.filter(a => a.isCorrect).length}/{attempt.answers.length}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-500 mb-0.5 sm:mb-1 text-[10px] sm:text-xs">Time</p>
                                <p className="font-bold text-gray-900 text-sm sm:text-base">
                                  {formatTime(attempt.timeSpent)}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-500 mb-0.5 sm:mb-1 text-[10px] sm:text-xs">Attempt</p>
                                <p className="font-bold text-gray-900 text-sm sm:text-base">
                                  #{attempt.attemptNumber}
                                </p>
                              </div>
                            </div>

                            <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span className="truncate">{formatDate(attempt.submittedAt)}</span>
                              </span>
                              {attempt.teacherReviewed && (
                                <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded-full font-medium flex-shrink-0">
                                  ✓ Reviewed
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - View Button */}
                      <button
                        onClick={() => navigate(`/student/quiz/${attempt.quizId._id}/results/${attempt._id}`)}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-violet-700 hover:to-purple-700 transition shadow-md hover:shadow-lg group-hover:scale-105 active:scale-95 text-xs sm:text-sm font-medium"
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Motivational Message */}
        {stats && stats.averageScore >= 80 && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1">Excellent Performance! 🎉</h3>
                <p className="text-xs sm:text-sm text-emerald-100">
                  You're maintaining an average score of {stats.averageScore}%. Keep up the amazing work!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizAttempts;
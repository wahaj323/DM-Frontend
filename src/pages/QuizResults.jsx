import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, Clock, CheckCircle, XCircle, Trophy, RotateCcw, ArrowLeft } from 'lucide-react';
import { attemptAPI } from '../services/attemptAPI';
import { quizAPI } from '../services/quizAPI';
import MCQQuestion from '../components/quiz/MCQQuestion';
import FillBlankQuestion from '../components/quiz/FillBlankQuestion';
import TrueFalseQuestion from '../components/quiz/TrueFalseQuestion';

const QuizResults = () => {
  const { quizId, attemptId } = useParams();
  const navigate = useNavigate();
  
  const [attempt, setAttempt] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    fetchData();
  }, [attemptId, quizId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [attemptData, quizData] = await Promise.all([
        attemptAPI.getAttempt(attemptId),
        quizAPI.getQuiz(quizId)
      ]);
      setAttempt(attemptData);
      setQuiz(quizData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load results');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    if (quiz.canAttempt) {
      navigate(`/student/quiz/${quizId}`);
    } else {
      alert('No attempts remaining');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGradeColor = () => {
    if (attempt.score >= 90) return 'text-green-600';
    if (attempt.score >= 80) return 'text-blue-600';
    if (attempt.score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrade = () => {
    if (attempt.score >= 90) return 'A';
    if (attempt.score >= 80) return 'B';
    if (attempt.score >= 70) return 'C';
    if (attempt.score >= 60) return 'D';
    return 'F';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/student/learning/${quiz.courseId}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Course
        </button>

        {/* Results Header */}
        <div className={`rounded-lg shadow-lg p-8 mb-8 ${
          attempt.passed 
            ? 'bg-gradient-to-r from-green-500 to-green-600' 
            : 'bg-gradient-to-r from-red-500 to-red-600'
        } text-white`}>
          <div className="text-center">
            {attempt.passed ? (
              <Trophy className="w-20 h-20 mx-auto mb-4" />
            ) : (
              <XCircle className="w-20 h-20 mx-auto mb-4" />
            )}
            
            <h1 className="text-4xl font-bold mb-2">
              {attempt.passed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
            </h1>
            <p className="text-xl mb-6">
              {attempt.passed 
                ? 'You passed the quiz!' 
                : `You need ${quiz.settings.passingScore}% to pass`}
            </p>

            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur rounded-full px-8 py-4">
              <span className="text-6xl font-bold">{attempt.score}%</span>
            </div>

            <p className="mt-4 text-lg">
              Grade: <span className="font-bold text-2xl">{getGrade()}</span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Score</p>
            <p className={`text-3xl font-bold ${getGradeColor()}`}>
              {attempt.score}%
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Correct</p>
            <p className="text-3xl font-bold text-gray-900">
              {attempt.answers.filter(a => a.isCorrect).length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Incorrect</p>
            <p className="text-3xl font-bold text-gray-900">
              {attempt.answers.filter(a => !a.isCorrect).length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Time Taken</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatTime(attempt.timeSpent)}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Points Earned</p>
              <p className="text-xl font-semibold text-gray-900">
                {attempt.earnedPoints} / {attempt.totalPoints}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Attempt Number</p>
              <p className="text-xl font-semibold text-gray-900">
                {attempt.attemptNumber} of {quiz.settings.maxAttempts === 0 ? '∞' : quiz.settings.maxAttempts}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Passing Score</p>
              <p className="text-xl font-semibold text-gray-900">
                {quiz.settings.passingScore}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                attempt.passed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {attempt.passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        </div>

        {/* Teacher Feedback */}
        {attempt.feedback && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">Teacher Feedback</h3>
            <p className="text-blue-800">{attempt.feedback}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {quiz.settings.allowReview && (
            <button
              onClick={() => setShowReview(!showReview)}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{showReview ? 'Hide Review' : 'Review Answers'}</span>
            </button>
          )}

          {quiz.canAttempt && !attempt.passed && (
            <button
              onClick={handleRetake}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>

        {/* Review Answers */}
        {showReview && quiz.settings.showAnswers && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Answer Review</h2>
            
            {quiz.questions.map((question, index) => {
              const studentAnswer = attempt.answers.find(a => a.questionIndex === index);
              
              return (
                <div key={index}>
                  {question.type === 'mcq' && (
                    <MCQQuestion
                      question={question}
                      questionNumber={index + 1}
                      selectedAnswer={studentAnswer?.answer}
                      isReview={true}
                    />
                  )}
                  {question.type === 'fill_blank' && (
                    <FillBlankQuestion
                      question={question}
                      questionNumber={index + 1}
                      answers={studentAnswer?.answer || []}
                      isReview={true}
                    />
                  )}
                  {question.type === 'true_false' && (
                    <TrueFalseQuestion
                      question={question}
                      questionNumber={index + 1}
                      selectedAnswer={studentAnswer?.answer}
                      isReview={true}
                    />
                  )}

                  {/* Result Badge */}
                  <div className="mt-2">
                    {studentAnswer?.isCorrect ? (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Correct (+{question.points} pts)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        <XCircle className="w-4 h-4" />
                        <span>Incorrect (0 pts)</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResults;
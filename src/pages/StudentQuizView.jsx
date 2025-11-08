import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { quizAPI } from '../services/quizAPI';
import { attemptAPI } from '../services/attemptAPI';
import QuizTimer from '../components/quiz/QuizTimer';
import MCQQuestion from '../components/quiz/MCQQuestion';
import FillBlankQuestion from '../components/quiz/FillBlankQuestion';
import TrueFalseQuestion from '../components/quiz/TrueFalseQuestion';

const StudentQuizView = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [startTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    // Auto-submit when time is up
    if (timeUp && !submitting) {
      handleSubmit();
    }
  }, [timeUp]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const data = await quizAPI.getQuiz(quizId);
      
      if (!data.canAttempt) {
        alert('No attempts remaining for this quiz');
        navigate(-1);
        return;
      }

      setQuiz(data);
      // Initialize answers array
      setAnswers(new Array(data.questions.length).fill(null));
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Failed to load quiz');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = { answer };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = answers.filter(a => a === null || a.answer === undefined || a.answer === null);
    
    if (unanswered.length > 0 && !timeUp) {
      if (!confirm(`You have ${unanswered.length} unanswered question(s). Submit anyway?`)) {
        return;
      }
    }

    try {
      setSubmitting(true);
      
      const attemptData = {
        answers: answers.map((ans, index) => ({
          answer: ans?.answer ?? null
        })),
        startedAt: startTime.toISOString(),
        submittedAt: new Date().toISOString()
      };

      const result = await attemptAPI.submitAttempt(quizId, attemptData);
      
      // Navigate to results
      navigate(`/student/quiz/${quizId}/results/${result.attempt._id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert(error.response?.data?.message || 'Failed to submit quiz');
      setSubmitting(false);
    }
  };

  const getAnsweredCount = () => {
    return answers.filter(a => a !== null && a.answer !== undefined && a.answer !== null).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Timer */}
            {quiz.settings.timeLimit > 0 && (
              <QuizTimer
                timeLimit={quiz.settings.timeLimit}
                onTimeUp={() => setTimeUp(true)}
              />
            )}

            {/* Question */}
            <div>
              {question.type === 'mcq' && (
                <MCQQuestion
                  question={question}
                  questionNumber={currentQuestion + 1}
                  selectedAnswer={answers[currentQuestion]?.answer}
                  onAnswerChange={handleAnswerChange}
                />
              )}
              {question.type === 'fill_blank' && (
                <FillBlankQuestion
                  question={question}
                  questionNumber={currentQuestion + 1}
                  answers={answers[currentQuestion]?.answer || []}
                  onAnswerChange={handleAnswerChange}
                />
              )}
              {question.type === 'true_false' && (
                <TrueFalseQuestion
                  question={question}
                  questionNumber={currentQuestion + 1}
                  selectedAnswer={answers[currentQuestion]?.answer}
                  onAnswerChange={handleAnswerChange}
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{submitting ? 'Submitting...' : 'Submit Quiz'}</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">Questions</h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Answered:</span>
                  <span className="font-semibold text-gray-900">
                    {getAnsweredCount()}/{quiz.questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(getAnsweredCount() / quiz.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((_, index) => {
                  const isAnswered = answers[index] !== null && answers[index]?.answer !== undefined && answers[index]?.answer !== null;
                  const isCurrent = index === currentQuestion;

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(index)}
                      className={`w-10 h-10 rounded-lg font-semibold transition ${
                        isCurrent
                          ? 'bg-primary-600 text-white'
                          : isAnswered
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-primary-600 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Not answered</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-semibold"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizView;
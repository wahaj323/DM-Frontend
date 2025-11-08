import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Eye, BarChart3 } from 'lucide-react';
import { quizAPI } from '../services/quizAPI';
import { courseAPI } from '../services/courseAPI';
import QuizCard from '../components/quiz/QuizCard';

const QuizList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courseData, quizzesData] = await Promise.all([
        courseAPI.getCourse(courseId),
        quizAPI.getCourseQuizzes(courseId)
      ]);
      setCourse(courseData);
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = () => {
    navigate(`/teacher/courses/${courseId}/quiz/create`);
  };

  const handleEditQuiz = (quiz) => {
    navigate(`/teacher/courses/${courseId}/quiz/${quiz._id}/edit`);
  };

const handleViewQuiz = (quiz) => {
  // Temporarily redirect to edit page since we don't have stats page yet
  navigate(`/teacher/courses/${courseId}/quiz/${quiz._id}/edit`);
};

  const handleDeleteQuiz = async (quiz) => {
    if (!confirm(`Delete quiz "${quiz.title}"? This will also delete all student attempts.`)) {
      return;
    }

    try {
      await quizAPI.deleteQuiz(quiz._id);
      alert('Quiz deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz');
    }
  };

  const handleTogglePublish = async (quiz) => {
    try {
      await quizAPI.togglePublish(quiz._id);
      alert(quiz.published ? 'Quiz unpublished' : 'Quiz published');
      fetchData();
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update quiz');
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/teacher/courses/${courseId}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Course
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quizzes
              </h1>
              <p className="text-gray-600">Course: {course?.title}</p>
            </div>
            <button
              onClick={handleCreateQuiz}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Create Quiz</span>
            </button>
          </div>
        </div>

        {/* Quiz Stats */}
        {quizzes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">Total Quizzes</p>
              <p className="text-3xl font-bold text-gray-900">{quizzes.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">Published</p>
              <p className="text-3xl font-bold text-green-600">
                {quizzes.filter(q => q.published).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">Drafts</p>
              <p className="text-3xl font-bold text-orange-600">
                {quizzes.filter(q => !q.published).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">Total Attempts</p>
              <p className="text-3xl font-bold text-blue-600">
                {quizzes.reduce((sum, q) => sum + (q.totalAttempts || 0), 0)}
              </p>
            </div>
          </div>
        )}

        {/* Quizzes Grid */}
        {quizzes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No quizzes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first quiz to test student knowledge
            </p>
            <button
              onClick={handleCreateQuiz}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Create Your First Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz._id}>
                <QuizCard
                  quiz={quiz}
                  isTeacher={true}
                  onEdit={handleEditQuiz}
                  onView={handleViewQuiz}
                  onDelete={handleDeleteQuiz}
                />
                <button
                  onClick={() => handleTogglePublish(quiz)}
                  className={`w-full mt-2 px-4 py-2 rounded-lg font-medium transition ${
                    quiz.published
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {quiz.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;
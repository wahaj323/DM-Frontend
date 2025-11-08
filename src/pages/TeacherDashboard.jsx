import { BookOpen, Users, FileText, MessageSquare, Settings, Plus, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { studentAPI } from '../services/studentAPI';
import { userAPI } from '../services/userAPI';

const TeacherDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    totalLessons: 0,
    totalQuizzes: 0,
    aiConversations: 0
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const studentsData = await studentAPI.getAllStudents({ limit: 5, sortBy: 'createdAt', order: 'desc' });
      const statsData = await userAPI.getStats(); // ✅ fetch quiz & other stats from backend

      setRecentStudents(studentsData.students);
      setStats({
        totalStudents: studentsData.pagination.total,
        activeCourses: statsData?.activeCourses || 0,
        totalLessons: statsData?.totalLessons || 0,
        totalQuizzes: statsData?.totalQuizzes || 0, // ✅ new quiz stat
        aiConversations: statsData?.aiConversations || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Added new "Total Quizzes" stat
  const statsData = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-500' },
    { label: 'Active Courses', value: stats.activeCourses, icon: BookOpen, color: 'bg-green-500' },
    { label: 'Total Lessons', value: stats.totalLessons, icon: FileText, color: 'bg-purple-500' },
    { label: 'Total Quizzes', value: stats.totalQuizzes, icon: Award, color: 'bg-indigo-500' },
    { label: 'AI Conversations', value: stats.aiConversations, icon: MessageSquare, color: 'bg-orange-500' },
  ];

  const quickActions = [
    {
      label: 'Create New Course',
      icon: Plus,
      action: () => navigate('/teacher/courses'),
      available: true,
    },
    {
      label: 'Manage Courses',
      icon: BookOpen,
      action: () => navigate('/teacher/courses'),
      available: true,
    },
    {
      label: 'Manage Students',
      icon: Users,
      action: () => navigate('/teacher/students'),
      available: true,
    },
    {
      label: 'Settings',
      icon: Settings,
      action: () => navigate('/settings'),
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your courses today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition ${
                  action.available
                    ? 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <action.icon className={`h-6 w-6 ${action.available ? 'text-primary-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${action.available ? 'text-gray-900' : 'text-gray-500'}`}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Students</h2>
              {recentStudents.length > 0 && (
                <button
                  onClick={() => navigate('/teacher/students')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </button>
              )}
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentStudents.length > 0 ? (
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                    onClick={() => navigate('/teacher/students')}
                  >
                    {student.profileImage ? (
                      <img
                        src={student.profileImage}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{student.name}</p>
                      <p className="text-sm text-gray-600 truncate">{student.email}</p>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No students enrolled yet</p>
                <p className="text-sm mt-1">Students will appear here once they sign up</p>
              </div>
            )}
          </div>

          {/* Recent Lessons */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Lessons</h2>
            </div>
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>No lessons created yet</p>
              <p className="text-sm mt-1">Create your first lesson to get started</p>
              <button
                onClick={() => alert('Coming in Phase 4!')}
                className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Coming in Phase 4
              </button>
            </div>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🚀 Getting Started</h2>
          <p className="mb-6 text-primary-50">
            Welcome to DeutschMeister! Here's how to get started with your teaching platform:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">1</div>
              <h3 className="font-semibold mb-2">Manage Students</h3>
              <p className="text-sm text-primary-50 mb-3">
                View and manage your students, track their progress ✅ Available Now!
              </p>
              <button
                onClick={() => navigate('/teacher/students')}
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition"
              >
                Go to Students
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">2</div>
              <h3 className="font-semibold mb-2">Create Your Course</h3>
              <p className="text-sm text-primary-50">
                Set up your first German course with modules and lessons (Coming in Phase 3)
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">3</div>
              <h3 className="font-semibold mb-2">Design Lessons</h3>
              <p className="text-sm text-primary-50">
                Use our block editor to create interactive lessons with audio and exercises (Coming in Phase 4)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

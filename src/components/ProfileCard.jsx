import { User, Mail, Calendar, Award } from 'lucide-react';

const ProfileCard = ({ user, stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600"></div>
      
      {/* Profile content */}
      <div className="px-6 pb-6">
        {/* Profile image */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="relative">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
              user?.isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
        </div>

        {/* User info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            {user?.email}
          </p>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              user?.role === 'teacher' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </span>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{stats.enrolledCourses || 0}</p>
              <p className="text-sm text-gray-600">Courses</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{stats.completedLessons || 0}</p>
              <p className="text-sm text-gray-600">Lessons</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{stats.vocabularyCount || 0}</p>
              <p className="text-sm text-gray-600">Vocabulary</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{stats.quizzesPassed || 0}</p>
              <p className="text-sm text-gray-600">Quizzes</p>
            </div>
          </div>
        )}

        {/* Member since */}
        <div className="flex items-center justify-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          Member since {new Date(user?.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
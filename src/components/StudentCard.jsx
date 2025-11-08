import { User, Mail, Calendar, MoreVertical, UserCheck, UserX, BookOpen } from 'lucide-react';
import { useState } from 'react';

const StudentCard = ({ student, onViewDetails, onToggleActive, onEnroll }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 relative">
      {/* Menu button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <button
              onClick={() => {
                onViewDetails(student);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
            >
              View Details
            </button>
            <button
              onClick={() => {
                onEnroll(student);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 border-t flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Enroll in Course
            </button>
            <button
              onClick={() => {
                onToggleActive(student._id, student.isActive);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 border-t"
            >
              {student.isActive ? 'Deactivate' : 'Activate'} Account
            </button>
          </div>
        )}
      </div>

      {/* Student info */}
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {student.profileImage ? (
            <img
              src={student.profileImage}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
            student.isActive ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {student.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1 truncate">
            <Mail className="w-4 h-4" />
            {student.email}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Calendar className="w-3 h-3" />
            Joined {new Date(student.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{student.enrolledCourses?.length || 0}</p>
          <p className="text-xs text-gray-600">Courses</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{student.unlockedLessons?.length || 0}</p>
          <p className="text-xs text-gray-600">Lessons</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{student.personalDictionary?.length || 0}</p>
          <p className="text-xs text-gray-600">Vocab</p>
        </div>
      </div>

      {/* Status badge */}
      <div className="mt-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
          student.isActive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          {student.isActive ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
          {student.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default StudentCard;
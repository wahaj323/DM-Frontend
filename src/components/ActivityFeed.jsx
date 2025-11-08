import { Clock, BookOpen, Award, Plus, User, CheckCircle } from 'lucide-react';

const ActivityFeed = ({ activities, loading }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'course_enrolled':
        return <Plus className="w-5 h-5 text-blue-600" />;
      case 'lesson_completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'quiz_passed':
        return <Award className="w-5 h-5 text-yellow-600" />;
      case 'dictionary_added':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'profile_updated':
        return <User className="w-5 h-5 text-gray-600" />;
      case 'login':
        return <Clock className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'course_enrolled':
        return 'bg-blue-100';
      case 'lesson_completed':
        return 'bg-green-100';
      case 'quiz_passed':
        return 'bg-yellow-100';
      case 'dictionary_added':
        return 'bg-purple-100';
      case 'profile_updated':
        return 'bg-gray-100';
      case 'login':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
        <p>No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity._id} className="flex items-start space-x-4">
          {/* Icon */}
          <div className={`${getActivityColor(activity.type)} p-2 rounded-full flex-shrink-0`}>
            {getActivityIcon(activity.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {activity.description}
            </p>
            {activity.metadata?.courseId?.title && (
              <p className="text-xs text-gray-600 mt-1">
                Course: {activity.metadata.courseId.title}
              </p>
            )}
            {activity.metadata?.lessonId?.title && (
              <p className="text-xs text-gray-600 mt-1">
                Lesson: {activity.metadata.lessonId.title}
              </p>
            )}
            {activity.metadata?.score !== undefined && (
              <p className="text-xs text-gray-600 mt-1">
                Score: {activity.metadata.score}%
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formatTime(activity.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
import { MessageSquare, Zap, Users, TrendingUp, Clock } from 'lucide-react';

const AIUsageStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Loading statistics...</p>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Conversations',
      value: stats.totalConversations?.toLocaleString() || '0',
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: null
    },
    {
      label: 'Total Messages',
      value: stats.totalMessages?.toLocaleString() || '0',
      icon: MessageSquare,
      color: 'bg-purple-500',
      change: null
    },
    {
      label: 'Tokens Used',
      value: stats.totalTokens?.toLocaleString() || '0',
      icon: Zap,
      color: 'bg-yellow-500',
      change: null
    },
    {
      label: 'Active Students',
      value: stats.activeStudents?.toString() || '0',
      icon: Users,
      color: 'bg-green-500',
      change: null
    },
    {
      label: 'Avg Messages/Conv',
      value: stats.averageMessagesPerConversation?.toString() || '0',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: null
    },
    {
      label: 'Avg Response Time',
      value: `${stats.averageResponseTime || 0}ms`,
      icon: Clock,
      color: 'bg-pink-500',
      change: null
    }
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            {stat.change && (
              <div className={`mt-2 text-xs ${
                stat.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}% from last period
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Flagged Conversations Alert */}
      {stats.flaggedConversations > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-orange-900">
                {stats.flaggedConversations} Flagged Conversation{stats.flaggedConversations > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Review these conversations for inappropriate content or issues
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Daily Breakdown Chart */}
      {stats.dailyBreakdown && Object.keys(stats.dailyBreakdown).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">Daily Activity</h3>
          <div className="space-y-3">
            {Object.entries(stats.dailyBreakdown)
              .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
              .slice(0, 7)
              .map(([date, data]) => (
                <div key={date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">
                      {data.conversations} conv
                    </span>
                    <span className="text-gray-500">
                      {data.messages} msg
                    </span>
                    <span className="text-gray-500">
                      {data.tokens.toLocaleString()} tokens
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Top Students */}
      {stats.topStudents && stats.topStudents.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="font-bold text-gray-900 mb-4">Most Active Students</h3>
          <div className="space-y-3">
            {stats.topStudents.slice(0, 5).map((student, index) => (
              <div key={student.studentId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Student {index + 1}</p>
                    <p className="text-xs text-gray-500">
                      {student.conversations} conversations
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-900 font-semibold">{student.messages} messages</p>
                  <p className="text-gray-500 text-xs">{student.tokens.toLocaleString()} tokens</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIUsageStats;
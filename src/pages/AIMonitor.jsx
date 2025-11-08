import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Flag, 
  Eye, 
  Download,
  MessageSquare,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { aiAPI } from '../services/aiAPI';
import AIUsageStats from '../components/analytics/AIUsageStats';

const AIMonitor = () => {
  const navigate = useNavigate();
  
  const [conversations, setConversations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    flagged: false,
    studentId: '',
    courseId: ''
  });
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    fetchData();
  }, [filters, timeframe]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [convData, statsData] = await Promise.all([
        aiAPI.adminGetConversations({ ...filters, search: searchTerm }),
        aiAPI.adminGetStats(timeframe)
      ]);
      setConversations(convData.conversations);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleFlagConversation = async (convId, reason = '') => {
    try {
      await aiAPI.adminFlagConversation(convId, reason);
      fetchData();
    } catch (error) {
      alert('Failed to flag conversation');
    }
  };

  const handleViewConversation = (conv) => {
    navigate(`/teacher/ai-conversations/${conv._id}`);
  };

  const handleExport = async () => {
    try {
      const data = await aiAPI.adminExport(filters);
      
      // Convert to CSV
      const csv = [
        ['Conversation ID', 'Student', 'Course', 'Messages', 'Tokens', 'Flagged', 'Created At'].join(','),
        ...data.map(row => [
          row.conversationId,
          row.student,
          row.course,
          row.messageCount,
          row.tokensUsed,
          row.flagged,
          new Date(row.createdAt).toLocaleDateString()
        ].join(','))
      ].join('\n');

      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-conversations-${Date.now()}.csv`;
      a.click();
    } catch (error) {
      alert('Failed to export data');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'all', label: 'All Conversations', count: conversations.length },
    { id: 'flagged', label: 'Flagged', count: conversations.filter(c => c.flagged).length },
    { id: 'stats', label: 'Statistics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Assistant Monitor
          </h1>
          <p className="text-gray-600">
            Monitor student conversations and AI usage
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon && <tab.icon className="w-5 h-5" />}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <AIUsageStats stats={stats} />
          </div>
        )}

        {/* Conversations Tab */}
        {(activeTab === 'all' || activeTab === 'flagged') && (
          <div>
            {/* Filters & Search */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search conversations..."
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>

                <button
                  onClick={handleExport}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No conversations found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {conversations
                    .filter(conv => activeTab === 'all' || (activeTab === 'flagged' && conv.flagged))
                    .map((conv) => (
                      <div
                        key={conv._id}
                        className={`p-6 hover:bg-gray-50 transition ${
                          conv.flagged ? 'bg-orange-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {conv.title}
                              </h3>
                              {conv.flagged && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold flex items-center space-x-1">
                                  <Flag className="w-3 h-3" />
                                  <span>Flagged</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span>Student: {conv.studentId?.name}</span>
                              <span>•</span>
                              <span>{conv.metadata.totalMessages} messages</span>
                              <span>•</span>
                              <span>{conv.metadata.totalTokens.toLocaleString()} tokens</span>
                              <span>•</span>
                              <span>{formatDate(conv.lastMessageAt)}</span>
                            </div>

                            {conv.courseId && (
                              <p className="text-sm text-purple-600">
                                📚 {conv.courseId.title}
                              </p>
                            )}

                            {conv.flagged && conv.flagReason && (
                              <div className="mt-2 p-2 bg-orange-100 rounded text-sm text-orange-800">
                                <strong>Flag reason:</strong> {conv.flagReason}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleViewConversation(conv)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View conversation"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleFlagConversation(conv._id, '')}
                              className={`p-2 rounded-lg transition ${
                                conv.flagged
                                  ? 'text-orange-600 hover:bg-orange-50'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                              title={conv.flagged ? 'Unflag' : 'Flag conversation'}
                            >
                              <Flag className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMonitor;
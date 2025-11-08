import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flag, Edit, Save, X } from 'lucide-react';
import { aiAPI } from '../services/aiAPI';
import MessageBubble from '../components/ai/MessageBubble';
import ContextPanel from '../components/ai/ContextPanel';

const AIConversations = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingMessage, setEditingMessage] = useState(null);
  const [correctedContent, setCorrectedContent] = useState('');
  const [correctionNote, setCorrectionNote] = useState('');

  useEffect(() => {
    fetchConversation();
  }, [conversationId]);

  const fetchConversation = async () => {
    try {
      setLoading(true);
      const data = await aiAPI.getConversation(conversationId);
      setConversation(data);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      alert('Failed to load conversation');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleFlag = async () => {
    const reason = prompt('Enter reason for flagging (optional):');
    
    try {
      await aiAPI.adminFlagConversation(conversationId, reason || '');
      fetchConversation();
    } catch (error) {
      alert('Failed to flag conversation');
    }
  };

  const handleCorrectMessage = (message, index) => {
    setEditingMessage(index);
    setCorrectedContent(message.correctedContent || message.content);
    setCorrectionNote(message.correctionNote || '');
  };

  const handleSaveCorrection = async () => {
    try {
      await aiAPI.adminCorrectMessage(
        conversationId,
        editingMessage,
        correctedContent,
        correctionNote
      );
      
      setEditingMessage(null);
      setCorrectedContent('');
      setCorrectionNote('');
      fetchConversation();
      alert('Correction saved successfully');
    } catch (error) {
      alert('Failed to save correction');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setCorrectedContent('');
    setCorrectionNote('');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Conversation not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/teacher/ai-monitor')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Monitor
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Conversation Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {conversation.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Student: {conversation.studentId?.name}</span>
                    <span>•</span>
                    <span>{conversation.metadata.totalMessages} messages</span>
                    <span>•</span>
                    <span>{conversation.metadata.totalTokens.toLocaleString()} tokens</span>
                  </div>
                  {conversation.courseId && (
                    <p className="text-sm text-purple-600 mt-2">
                      📚 Course: {conversation.courseId.title}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleFlag}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    conversation.flagged
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  <span>{conversation.flagged ? 'Unflag' : 'Flag'}</span>
                </button>
              </div>

              {conversation.flagged && conversation.flagReason && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-900">
                    <strong>Flag reason:</strong> {conversation.flagReason}
                  </p>
                </div>
              )}

              {/* Metadata */}
              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(conversation.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Message</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(conversation.lastMessageAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    conversation.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {conversation.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Conversation</h2>
              
              <div className="space-y-4">
                {conversation.messages.map((message, index) => (
                  <div key={index}>
                    {editingMessage === index ? (
                      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Corrected Response:
                          </label>
                          <textarea
                            value={correctedContent}
                            onChange={(e) => setCorrectedContent(e.target.value)}
                            rows="6"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correction Note:
                          </label>
                          <input
                            type="text"
                            value={correctionNote}
                            onChange={(e) => setCorrectionNote(e.target.value)}
                            placeholder="Explain why you corrected this..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={handleSaveCorrection}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Correction</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <MessageBubble
                        message={message}
                        isTeacher={true}
                        onCorrect={() => handleCorrectMessage(message, index)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Context Panel */}
            {conversation.context && (
              <ContextPanel context={conversation.context} />
            )}

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Messages:</span>
                  <span className="font-semibold text-gray-900">
                    {conversation.metadata.totalMessages}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Tokens:</span>
                  <span className="font-semibold text-gray-900">
                    {conversation.metadata.totalTokens.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Avg Response Time:</span>
                  <span className="font-semibold text-gray-900">
                    {conversation.metadata.averageResponseTime}ms
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    conversation.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {conversation.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Flagged:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    conversation.flagged
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {conversation.flagged ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Student Info</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-600">Name:</span>{' '}
                  <span className="font-medium text-gray-900">
                    {conversation.studentId?.name}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{' '}
                  <span className="font-medium text-gray-900">
                    {conversation.studentId?.email}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConversations;
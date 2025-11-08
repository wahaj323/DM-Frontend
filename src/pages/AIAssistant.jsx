import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  ArrowLeft,
  Sparkles,
  Zap,
  BookOpen,
  Languages,
  X,
  Menu,
  Bot,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import ChatInterface from '../components/ai/ChatInterface';
import GrammarHelper from '../components/ai/GrammarHelper';
import TranslationTool from '../components/ai/TranslationTool';
import ContextPanel from '../components/ai/ContextPanel';
import { aiAPI } from '../services/aiAPI';

const AIAssistant = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(conversationId || null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false); // Mobile: closed by default
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentContext, setCurrentContext] = useState(null);

  useEffect(() => {
    fetchConversations();
    fetchUsage();
    
    // Show sidebar on desktop by default
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (conversationId) {
      setSelectedConversation(conversationId);
      setActiveTab('chat');
      fetchConversationContext(conversationId);
    } else {
      setSelectedConversation(null);
      setCurrentContext(null);
    }
  }, [conversationId]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await aiAPI.getConversations();
      setConversations(data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsage = async () => {
    try {
      const data = await aiAPI.getUsage();
      setUsage(data);
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const fetchConversationContext = async (convId) => {
    try {
      const conv = await aiAPI.getConversation(convId);
      setCurrentContext(conv.context);
    } catch (error) {
      console.error('Error fetching context:', error);
    }
  };

  const handleNewChat = () => {
    setSelectedConversation(null);
    setCurrentContext(null);
    setActiveTab('chat');
    navigate('/student/ai-assistant');
    if (window.innerWidth < 1024) setShowSidebar(false);
  };

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv._id);
    setActiveTab('chat');
    navigate(`/student/ai-assistant/${conv._id}`);
    if (window.innerWidth < 1024) setShowSidebar(false);
  };

  const handleDeleteConversation = async (convId, e) => {
    e.stopPropagation();
    if (!confirm('Archive this conversation?')) return;

    try {
      await aiAPI.deleteConversation(convId);
      setConversations(conversations.filter(c => c._id !== convId));
      if (selectedConversation === convId) {
        handleNewChat();
      }
    } catch (error) {
      alert('Failed to archive conversation');
    }
  };

  const handleConversationCreated = (conv) => {
    setConversations([conv, ...conversations]);
    setSelectedConversation(conv._id);
    navigate(`/student/ai-assistant/${conv._id}`);
    fetchUsage();
  };

  const formatDate = (date) => {
    const now = new Date();
    const convDate = new Date(date);
    const diffDays = Math.floor((now - convDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return convDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const tools = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, color: 'violet' },
    { id: 'grammar', label: 'Grammar', icon: BookOpen, color: 'blue' },
    { id: 'translation', label: 'Translate', icon: Languages, color: 'emerald' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/30">
      {/* Enhanced Mobile-First Header */}
      <div className="bg-gradient-to-r from-violet-600 via-violet-700 to-blue-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between gap-2">
            {/* Left: Back & Menu */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => navigate('/student/dashboard')}
                className="hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition"
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition"
                aria-label="Toggle menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Logo & Title */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 backdrop-blur p-1.5 sm:p-2 rounded-lg">
                  <Bot className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center gap-2">
                    <span>AI Assistant</span>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  </h1>
                  <p className="text-violet-100 text-xs hidden lg:block">Powered by Gemini AI</p>
                </div>
                <h1 className="sm:hidden text-base font-bold">AI Tutor</h1>
              </div>
            </div>

            {/* Right: Usage Stats */}
            {usage && (
              <div className="bg-white/15 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 border border-white/20">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="text-right">
                    <div className="text-[10px] sm:text-xs text-violet-100 leading-tight">Tokens</div>
                    <div className="text-xs sm:text-sm font-bold leading-tight">
                      {(usage.tokensUsed / 1000).toFixed(1)}k
                      <span className="text-[10px] sm:text-xs text-violet-200 mx-0.5">/</span>
                      <span className="text-[10px] sm:text-xs text-violet-200">
                        {(usage.tokensLimit / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                  <div className="w-1 sm:w-1.5 h-8 sm:h-10 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-t from-white to-violet-200 rounded-full transition-all"
                      style={{ 
                        height: `${Math.min((usage.tokensUsed / usage.tokensLimit) * 100, 100)}%`,
                        width: '100%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tool Tabs - Scrollable on Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition whitespace-nowrap flex-shrink-0 ${
                  activeTab === tool.id
                    ? 'bg-white text-violet-700 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <tool.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Enhanced Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-[85vw] sm:w-80 lg:w-80
          bg-white border-r shadow-2xl lg:shadow-lg
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sidebar Header - Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-3 border-b bg-violet-50">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-violet-600" />
              Conversations
            </h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-1.5 hover:bg-violet-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3 sm:p-4 border-b bg-gradient-to-r from-violet-50 to-blue-50">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:from-violet-700 hover:to-blue-700 transition shadow-md hover:shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">New Chat</span>
            </button>
          </div>

          {/* Usage Warning */}
          {usage && usage.tokensRemaining < 5000 && (
            <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-200">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-orange-900">Low on tokens!</p>
                  <p className="text-[10px] sm:text-xs text-orange-700">
                    {usage.tokensRemaining.toLocaleString()} remaining
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-600 border-t-transparent mx-auto"></div>
                <p className="text-xs sm:text-sm mt-2">Loading...</p>
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-6 sm:p-8 text-center text-gray-500">
                <div className="bg-gradient-to-br from-violet-100 to-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-violet-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">No conversations yet</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Start your first chat!</p>
              </div>
            ) : (
              <div className="divide-y">
                {conversations.map((conv) => (
                  <div
                    key={conv._id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`p-3 sm:p-4 cursor-pointer transition group active:bg-violet-100 ${
                      selectedConversation === conv._id 
                        ? 'bg-gradient-to-r from-violet-50 to-blue-50 border-l-4 border-violet-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate group-hover:text-violet-600 transition text-sm sm:text-base">
                          {conv.title}
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            {formatDate(conv.lastMessageAt)}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-400">•</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            {conv.metadata.totalMessages} msgs
                          </span>
                        </div>
                        {conv.courseId && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs">📚</span>
                            <span className="text-[10px] sm:text-xs text-violet-600 truncate">
                              {conv.courseId.title}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleDeleteConversation(conv._id, e)}
                        className="p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg text-red-600 transition flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Usage Stats Summary */}
          {usage && (
            <div className="p-3 sm:p-4 border-t bg-gradient-to-r from-violet-50 to-blue-50">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-gray-600 font-medium">💬 Conversations:</span>
                  <span className="font-bold text-violet-700">{usage.conversations}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-gray-600 font-medium">✉️ Messages:</span>
                  <span className="font-bold text-blue-700">{usage.messagesCount}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-gray-600 font-medium">⚡ Hourly Limit:</span>
                  <span className="font-bold text-emerald-700">{usage.hourlyLimit}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {activeTab === 'chat' && (
            <div className="flex-1 flex overflow-hidden">
              {/* Chat Interface */}
              <div className="flex-1 relative">
                <ChatInterface
                  conversationId={selectedConversation}
                  onConversationCreated={handleConversationCreated}
                  key={selectedConversation}
                />
              </div>

              {/* Context Panel Toggle Button (Mobile) */}
              {selectedConversation && currentContext && (
                <button
                  onClick={() => setShowContextPanel(!showContextPanel)}
                  className="lg:hidden fixed bottom-20 right-4 z-30 bg-violet-600 text-white p-3 rounded-full shadow-lg active:scale-95 transition"
                >
                  {showContextPanel ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
              )}

              {/* Context Panel (Desktop: Always visible, Mobile: Toggleable) */}
              {selectedConversation && currentContext && (
                <div className={`
                  fixed lg:relative inset-y-0 right-0 z-40
                  w-[85vw] sm:w-80 lg:w-80
                  border-l bg-gradient-to-br from-violet-50 to-blue-50
                  p-3 sm:p-4 overflow-y-auto shadow-2xl lg:shadow-none
                  transform transition-transform duration-300
                  ${showContextPanel ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}>
                  {/* Mobile Close Button */}
                  <button
                    onClick={() => setShowContextPanel(false)}
                    className="lg:hidden absolute top-3 right-3 p-2 hover:bg-violet-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  <ContextPanel context={currentContext} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'grammar' && (
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
              <GrammarHelper conversationId={selectedConversation} />
            </div>
          )}

          {activeTab === 'translation' && (
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
              <TranslationTool conversationId={selectedConversation} />
            </div>
          )}
        </div>
      </div>

      {/* Floating Help Button - Hidden on small mobile */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-30">
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">Need help?</span>
        </div>
      </div>

      {/* Context Panel Overlay (Mobile) */}
      {showContextPanel && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setShowContextPanel(false)}
        />
      )}
    </div>
  );
};

export default AIAssistant;
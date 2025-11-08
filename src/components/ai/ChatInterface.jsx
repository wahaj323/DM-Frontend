import { useState, useRef, useEffect } from 'react';
import { Send, Loader, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { aiAPI } from '../../services/aiAPI';

const ChatInterface = ({ 
  conversationId = null, 
  courseId = null, 
  lessonId = null,
  onConversationCreated 
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [currentConvId, setCurrentConvId] = useState(conversationId);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Reset when conversationId changes to null (new conversation)
  useEffect(() => {
    if (conversationId) {
      loadConversation();
    } else {
      // Reset for new conversation
      setMessages([{
        role: 'assistant',
        content: '👋 **Hallo!** I\'m your German learning assistant. I can help you with:\n\n• Grammar explanations\n• Translations\n• Vocabulary practice\n• Writing corrections\n• Cultural insights\n\nWhat would you like to learn today?',
        timestamp: new Date(),
        tokensUsed: 0
      }]);
      setCurrentConvId(null); // Reset current conversation ID
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const loadConversation = async () => {
    try {
      setLoading(true);
      const data = await aiAPI.getConversation(conversationId);
      setMessages(data.messages || []);
      setCurrentConvId(data._id);
    } catch (error) {
      console.error('Error loading conversation:', error);
      // If loading fails, show welcome message
      setMessages([{
        role: 'assistant',
        content: '👋 **Hallo!** I\'m your German learning assistant. I can help you with:\n\n• Grammar explanations\n• Translations\n• Vocabulary practice\n• Writing corrections\n• Cultural insights\n\nWhat would you like to learn today?',
        timestamp: new Date(),
        tokensUsed: 0
      }]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || typing) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setTyping(true);

    try {
      const response = await aiAPI.sendMessage(
        userMessage.content,
        currentConvId, // This will be null for new conversations
        courseId,
        lessonId
      );

      console.log('API Response:', response); // Debug log

      // Update conversation ID if new conversation was created
      if (!currentConvId && response.conversation && response.conversation._id) {
        const newConvId = response.conversation._id;
        setCurrentConvId(newConvId);
        
        if (onConversationCreated) {
          onConversationCreated(response.conversation);
        }
      }

      // Add AI response - get the last message from the conversation
      if (response.conversation && response.conversation.messages) {
        const aiMessage = response.conversation.messages[response.conversation.messages.length - 1];
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Fallback if response structure is different
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.message || 'I received your message but there was an issue processing it.',
          timestamp: new Date(),
          tokensUsed: response.tokensUsed || 0
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again. If the problem persists, you may have reached your usage limit.',
        timestamp: new Date(),
        tokensUsed: 0,
        isError: true
      }]);
    } finally {
      setTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const quickActions = [
    { label: 'Explain grammar', prompt: 'Can you explain German grammar rules for...' },
    { label: 'Translate', prompt: 'Please translate this to German: ' },
    { label: 'Correct my text', prompt: 'Please correct this German text: ' },
    { label: 'Practice vocabulary', prompt: 'I want to practice vocabulary about...' }
  ];

  const handleQuickAction = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header - Show current conversation status */}
      <div className="border-b bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              {currentConvId ? 'Existing Conversation' : 'New Conversation'}
            </span>
          </div>
          {currentConvId && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              ID: {currentConvId.slice(-8)}...
            </span>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-6 py-3 border-t bg-gray-50">
          <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-100 transition"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSend} className="flex space-x-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about German..."
            rows="2"
            disabled={typing}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {typing ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Send</span>
              </>
            )}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
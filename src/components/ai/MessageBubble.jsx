import { Bot, User, AlertCircle, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message, isTeacher = false, onCorrect }) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Markdown components configuration
  const markdownComponents = {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    code: ({ children, inline }) => 
      inline ? (
        <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs">
          {children}
        </code>
      ) : (
        <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto my-2">
          <code>{children}</code>
        </pre>
      ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    h1: ({ children }) => <h1 className="text-2xl font-bold my-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold my-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold my-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base font-bold my-1">{children}</h4>,
    h5: ({ children }) => <h5 className="text-sm font-bold my-1">{children}</h5>,
    h6: ({ children }) => <h6 className="text-xs font-bold my-1">{children}</h6>,
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 max-w-3xl`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1">
          <div
            className={`rounded-lg px-4 py-3 ${
              isUser
                ? 'bg-primary-600 text-white'
                : message.corrected
                ? 'bg-orange-50 border-2 border-orange-300'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {/* Corrected Message Badge */}
            {message.corrected && (
              <div className="flex items-center space-x-2 mb-2 text-orange-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">Corrected by Teacher</span>
              </div>
            )}

            {/* Message Text */}
            <div className={isUser ? 'text-white' : 'text-gray-900'}>
              {message.corrected && message.correctedContent ? (
                <div>
                  <div className="mb-2">
                    <p className="text-xs text-orange-600 font-semibold mb-1">Original:</p>
                    <div className="text-sm line-through opacity-60">
                      <ReactMarkdown components={markdownComponents}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-semibold mb-1">Corrected:</p>
                    <div className="text-sm">
                      <ReactMarkdown components={markdownComponents}>
                        {message.correctedContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {message.correctionNote && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                      <strong>Note:</strong> {message.correctionNote}
                    </div>
                  )}
                </div>
              ) : (
                <ReactMarkdown components={markdownComponents}>
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>

          {/* Message Footer */}
          <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span>{formatTime(message.timestamp)}</span>
            {message.tokensUsed > 0 && (
              <span className="text-gray-400">• {message.tokensUsed} tokens</span>
            )}
            {isAssistant && isTeacher && !message.corrected && onCorrect && (
              <button
                onClick={() => onCorrect(message)}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                • Correct
              </button>
            )}
            {message.corrected && (
              <span className="flex items-center text-green-600">
                • <CheckCircle className="w-3 h-3 ml-1" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
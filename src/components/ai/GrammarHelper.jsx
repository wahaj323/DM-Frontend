import { useState } from 'react';
import { CheckCircle, Loader, BookOpen } from 'lucide-react';
import { aiAPI } from '../../services/aiAPI';
import ReactMarkdown from 'react-markdown';

const GrammarHelper = ({ conversationId = null }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!text.trim()) {
      setError('Please enter some German text to check');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await aiAPI.checkGrammar(text, conversationId);
      setResult(response.result);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check grammar');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Grammar Helper</h2>
      </div>

      <p className="text-gray-600 mb-4">
        Check your German grammar and get detailed explanations
      </p>

      {/* Input Area */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter German text to check:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="z.B. Ich gehe zu der Schule..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleCheck}
            disabled={loading || !text.trim()}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Check Grammar</span>
              </>
            )}
          </button>

          {(text || result) && (
            <button
              onClick={handleClear}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Result Area */}
      {result && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Grammar Analysis</span>
          </h3>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-2 text-gray-700" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2 text-gray-700" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2 text-gray-700" {...props} />,
                h3: ({ node, ...props }) => <h3 className="font-bold text-gray-900 mt-3 mb-2" {...props} />,
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Example Sentences */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-semibold text-gray-900 mb-2">💡 Try these examples:</p>
        <div className="space-y-2">
          {[
            'Ich habe gestern in der Stadt gegangen.',
            'Der Kinder spielen im Garten.',
            'Ich möchte ein Kaffee trinken.'
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setText(example)}
              className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 hover:bg-white p-2 rounded transition"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrammarHelper;
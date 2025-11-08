import { useState } from 'react';
import { Languages, Loader, ArrowRightLeft } from 'lucide-react';
import { aiAPI } from '../../services/aiAPI';
import ReactMarkdown from 'react-markdown';

const TranslationTool = ({ conversationId = null }) => {
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('German');
  const [contextNote, setContextNote] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await aiAPI.translate(
        text,
        fromLang,
        toLang,
        contextNote,
        conversationId
      );
      setResult(response.result);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to translate');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setText('');
    setResult(null);
  };

  const handleClear = () => {
    setText('');
    setContextNote('');
    setResult(null);
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Languages className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">Translation Tool</h2>
      </div>

      <p className="text-gray-600 mb-4">
        Get contextual translations with usage examples
      </p>

      {/* Language Selection */}
      <div className="flex items-center space-x-2 mb-4">
        <select
          value={fromLang}
          onChange={(e) => setFromLang(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="English">English</option>
          <option value="German">German</option>
        </select>

        <button
          onClick={handleSwapLanguages}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowRightLeft className="w-5 h-5 text-gray-600" />
        </button>

        <select
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="German">German</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text to translate:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Enter ${fromLang} text...`}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Context (optional):
          </label>
          <input
            type="text"
            value={contextNote}
            onChange={(e) => setContextNote(e.target.value)}
            placeholder="e.g., formal, casual, business..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleTranslate}
            disabled={loading || !text.trim()}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Translating...</span>
              </>
            ) : (
              <>
                <Languages className="w-5 h-5" />
                <span>Translate</span>
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
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
            <Languages className="w-5 h-5" />
            <span>Translation</span>
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

      {/* Quick Phrases */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-semibold text-gray-900 mb-2">💡 Common phrases:</p>
        <div className="space-y-2">
          {[
            { en: 'How are you?', de: 'Wie geht es dir?' },
            { en: 'Thank you very much', de: 'Vielen Dank' },
            { en: 'Where is the train station?', de: 'Wo ist der Bahnhof?' }
          ].map((phrase, index) => (
            <button
              key={index}
              onClick={() => {
                setText(fromLang === 'English' ? phrase.en : phrase.de);
                setContextNote('');
              }}
              className="block w-full text-left text-sm hover:bg-white p-2 rounded transition"
            >
              <span className="text-gray-900 font-medium">
                {fromLang === 'English' ? phrase.en : phrase.de}
              </span>
              <span className="text-gray-500 ml-2">→</span>
              <span className="text-gray-600 ml-2">
                {toLang === 'German' ? phrase.de : phrase.en}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranslationTool;
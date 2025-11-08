import { CheckCircle, XCircle } from 'lucide-react';

const TrueFalseQuestion = ({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onAnswerChange, 
  isReview = false 
}) => {
  const handleOptionClick = (value) => {
    if (!isReview) {
      onAnswerChange(value);
    }
  };

  const getButtonClassName = (value) => {
    const baseClasses = "flex-1 p-4 border-2 rounded-lg font-semibold transition cursor-pointer";
    
    if (isReview) {
      // Show correct answer in green
      if (value === question.isTrue) {
        return `${baseClasses} bg-green-50 border-green-500 text-green-900`;
      }
      // Show wrong selection in red
      if (value === selectedAnswer && value !== question.isTrue) {
        return `${baseClasses} bg-red-50 border-red-500 text-red-900`;
      }
      return `${baseClasses} border-gray-300 text-gray-500 opacity-50`;
    }
    
    if (selectedAnswer === value) {
      return `${baseClasses} bg-primary-50 border-primary-600 text-primary-900`;
    }
    
    return `${baseClasses} border-gray-300 text-gray-700 hover:border-primary-400 hover:bg-gray-50`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <span className="text-sm font-semibold text-primary-600">
          Question {questionNumber}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mt-2">
          {question.question}
        </h3>
        {question.points > 0 && (
          <span className="text-sm text-gray-600 mt-1">
            ({question.points} {question.points === 1 ? 'point' : 'points'})
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleOptionClick(true)}
          disabled={isReview}
          className={getButtonClassName(true)}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">✓</span>
            <span>TRUE</span>
            {isReview && question.isTrue === true && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {isReview && selectedAnswer === true && question.isTrue !== true && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </div>
        </button>

        <button
          onClick={() => handleOptionClick(false)}
          disabled={isReview}
          className={getButtonClassName(false)}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">✗</span>
            <span>FALSE</span>
            {isReview && question.isTrue === false && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {isReview && selectedAnswer === false && question.isTrue !== false && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </div>
        </button>
      </div>

      {/* Explanation */}
      {isReview && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}

      {/* Result indicator when not in review mode */}
      {selectedAnswer !== undefined && !isReview && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          selectedAnswer === question.isTrue 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-sm font-semibold ${
            selectedAnswer === question.isTrue 
              ? 'text-green-900' 
              : 'text-yellow-900'
          }`}>
            {selectedAnswer === question.isTrue ? 'Answer selected ✓' : 'Answer selected'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrueFalseQuestion;
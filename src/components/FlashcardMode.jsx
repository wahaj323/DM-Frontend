import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCw, Check, XCircle, Volume2 } from 'lucide-react';
import TTSButton from './editor/TTSButton';

const FlashcardMode = ({ words, onClose, onPractice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState([]);

  const currentWord = words[currentIndex];
  const vocab = currentWord.vocabItemId;

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleAnswer = async (correct) => {
    setResults([...results, { wordId: currentWord._id, correct }]);
    await onPractice(currentWord._id, correct);

    if (currentIndex < words.length - 1) {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setResults([]);
  };

  const correctCount = results.filter(r => r.correct).length;
  const totalAnswered = results.length;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white p-4 sm:p-6 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold truncate">Flashcard Practice</h2>
            <p className="text-purple-100 mt-0.5 sm:mt-1 text-xs sm:text-sm">
              Card {currentIndex + 1} of {words.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition ml-2 flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-600">
            <span>Progress: {currentIndex + 1}/{words.length}</span>
            {totalAnswered > 0 && (
              <span className="font-semibold">
                Score: {correctCount}/{totalAnswered} ({Math.round((correctCount / totalAnswered) * 100)}%)
              </span>
            )}
          </div>
        </div>

        {/* Flashcard */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div
            className={`relative bg-gradient-to-br ${
              showAnswer 
                ? 'from-emerald-50 via-teal-50 to-cyan-50' 
                : 'from-purple-50 via-pink-50 to-rose-50'
            } rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl border-2 ${
              showAnswer ? 'border-emerald-200' : 'border-purple-200'
            }`}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {/* Front (Question) */}
            {!showAnswer ? (
              <div className="text-center w-full">
                <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4 font-medium">
                  German Word
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                    {vocab.gender && (
                      <span className="text-purple-600 text-2xl sm:text-3xl mr-1 sm:mr-2">
                        {vocab.gender}
                      </span>
                    )}
                    {vocab.word}
                  </h3>
                  {/* Fixed TTS Button - Stop propagation */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <TTSButton text={vocab.word} className="text-base sm:text-lg" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400 mt-4 sm:mt-6">
                  <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-xs sm:text-sm">
                    Click card to reveal answer
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center w-full">
                <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4 font-medium">
                  English Meaning
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {vocab.meaning}
                </h3>

                {vocab.exampleDe && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/80 backdrop-blur rounded-lg sm:rounded-xl shadow-sm border border-emerald-200">
                    <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                      <p className="text-gray-800 text-sm sm:text-base lg:text-lg font-medium">{vocab.exampleDe}</p>
                      {/* Fixed TTS Button - Stop propagation */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <TTSButton text={vocab.exampleDe} />
                      </div>
                    </div>
                    {vocab.exampleEn && (
                      <p className="text-gray-600 text-xs sm:text-sm italic">{vocab.exampleEn}</p>
                    )}
                  </div>
                )}

                {/* Answer Buttons */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnswer(false);
                    }}
                    className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base"
                  >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Incorrect</span>
                    <span className="sm:hidden">Wrong</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnswer(true);
                    }}
                    className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Correct</span>
                    <span className="sm:hidden">Right</span>
                  </button>
                </div>
              </div>
            )}

            {/* Flip Indicator */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-30">
              <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-between gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition active:scale-95 text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition active:scale-95 text-sm sm:text-base font-medium"
          >
            <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Restart</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition active:scale-95 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Completion Message */}
        {currentIndex === words.length - 1 && totalAnswered === words.length && (
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg">
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🎉</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                Practice Complete!
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                You got <span className="font-bold text-emerald-600">{correctCount}</span> out of{' '}
                <span className="font-bold">{totalAnswered}</span> correct{' '}
                <span className="font-bold text-emerald-600">
                  ({Math.round((correctCount / totalAnswered) * 100)}%)
                </span>
              </p>
              <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base"
              >
                Practice Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardMode;
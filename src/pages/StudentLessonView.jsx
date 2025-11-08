import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Lock, 
  CheckCircle, 
  Clock,
  BookOpen,
  Award,
  Sparkles,
  Volume2,
  Image as ImageIcon,
  Table as TableIcon,
  MessageSquare,
  BookMarked,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { courseAPI } from "../services/courseAPI";
import { dictionaryAPI } from "../services/dictionaryAPI";
import { authAPI } from "../services/api";
import useAuthStore from "../store/authStore";
import TTSButton from "../components/editor/TTSButton";
import { progressAPI } from "../services/progressAPI";

const StudentLessonView = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user: storeUser, updateUser } = useAuthStore();

  const [currentUser, setCurrentUser] = useState(storeUser);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [startTime] = useState(Date.now());
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);

  useEffect(() => {
    fetchData();
  }, [lessonId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userData = await authAPI.getMe();
      setCurrentUser(userData);
      updateUser(userData);

      const lessonData = await courseAPI.getLesson(lessonId);
      setLesson(lessonData);

      const unlocked = userData?.unlockedLessons?.some(
        (l) => l.toString() === lessonId
      );
      setIsUnlocked(unlocked);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      alert("Failed to load lesson");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!confirm("Mark this lesson as complete? This will add all vocabulary to your dictionary.")) return;

    setCompleting(true);
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      await progressAPI.completeLesson(lessonId, {
        timeSpent,
        score: null,
      });

      await dictionaryAPI.addFromLesson(lessonId);

      setShowCompletionAnimation(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert(error.response?.data?.message || "Failed to mark lesson complete");
      setCompleting(false);
    }
  };

  const getTimeSpent = () => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    return minutes > 0 ? `${minutes} min` : `${seconds} sec`;
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case "heading":
        return <HeadingView block={block} />;
      case "paragraph":
        return <ParagraphView block={block} />;
      case "image":
        return <ImageView block={block} />;
      case "table":
        return <TableView block={block} />;
      case "dialogue":
        return <DialogueView block={block} />;
      case "vocabulary":
        return <VocabularyView block={block} />;
      case "grammar":
        return <GrammarView block={block} />;
      case "note":
        return <NoteView block={block} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <BookOpen className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-blue-600 animate-pulse" />
          </div>
          <p className="text-gray-600 mt-4 sm:mt-6 font-medium text-sm sm:text-base">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Completion Animation Overlay */}
      {showCompletionAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl text-center max-w-md w-full mx-4 animate-scaleIn">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              🎉 Lesson Completed!
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Vocabulary has been added to your dictionary
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-6 transition-colors"
        >
          <div className="p-1.5 sm:p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md group-hover:bg-blue-50 transition-all mr-2">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-medium text-sm sm:text-base">Back to Course</span>
        </button>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50 backdrop-blur-sm"></div>
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <span className="text-blue-100 text-xs sm:text-sm font-medium">
                      Interactive Lesson
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                    {lesson.title}
                  </h1>
                  {lesson.description && (
                    <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {lesson.description}
                    </p>
                  )}
                </div>
                <div className="flex sm:flex-col items-center gap-3 self-start">
                  {isUnlocked ? (
                    <div className="p-2 sm:p-3 bg-emerald-500/20 backdrop-blur-sm rounded-xl border-2 border-emerald-300">
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                  ) : (
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white/30">
                      <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                  )}
                </div>
              </div>

              {/* Time Tracker */}
              {isUnlocked && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Time: {getTimeSpent()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{lesson.blocks?.length || 0} Blocks</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
            {!isUnlocked ? (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <div className="relative inline-block mb-6 sm:mb-8">
                  <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full">
                    <Lock className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-400" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
                  This Lesson is Locked
                </h2>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-md mx-auto px-4">
                  Please contact your teacher to unlock this lesson and continue your learning journey
                </p>
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Back to Course
                </button>
              </div>
            ) : lesson.blocks && lesson.blocks.length > 0 ? (
              <>
                <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                  {lesson.blocks
                    .sort((a, b) => a.order - b.order)
                    .map((block, index) => (
                      <div 
                        key={block.id}
                        className="animate-slideUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {renderBlock(block)}
                      </div>
                    ))}
                </div>

                {/* Completion Section */}
                <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t-2 border-gray-100">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-200">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-emerald-100 rounded-xl flex-shrink-0">
                        <Award className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                          Ready to Complete?
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
                          Mark this lesson as complete to automatically add all vocabulary to your personal dictionary and track your progress.
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleMarkComplete}
                      disabled={completing}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2 sm:gap-3 active:scale-95"
                    >
                      {completing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                          <span className="text-sm sm:text-base lg:text-lg">Completing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="text-sm sm:text-base lg:text-lg">Complete Lesson & Add Vocabulary</span>
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-emerald-700">
                      <BookMarked className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>All vocabulary will be added to your dictionary</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <div className="relative inline-block mb-6 sm:mb-8">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full">
                    <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-blue-400" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg px-4">This lesson doesn't have any content yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== Enhanced View Components with Full Responsiveness =====

const HeadingView = ({ block }) => {
  const HeadingTag = `h${block.data.level}`;
  const configs = {
    1: { 
      size: "text-2xl sm:text-3xl lg:text-4xl", 
      color: "text-gray-900", 
      icon: Sparkles 
    },
    2: { 
      size: "text-xl sm:text-2xl lg:text-3xl", 
      color: "text-gray-800", 
      icon: BookOpen 
    },
    3: { 
      size: "text-lg sm:text-xl lg:text-2xl", 
      color: "text-gray-800", 
      icon: null 
    }
  };
  const config = configs[block.data.level];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      {Icon && (
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex-shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
        </div>
      )}
      <HeadingTag className={`font-bold ${config.color} ${config.size}`}>
        {block.data.text}
      </HeadingTag>
    </div>
  );
};

const ParagraphView = ({ block }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
      <p className="flex-1 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
        {block.data.text}
      </p>
      {block.data.hasAudio && (
        <div className="flex-shrink-0 self-end sm:self-start">
          <TTSButton text={block.data.text} />
        </div>
      )}
    </div>
  </div>
);

const ImageView = ({ block }) => {
  if (!block.data.url) return null;
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
        <img
          src={block.data.url}
          alt={block.data.alt || "Lesson image"}
          className="w-full transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </div>
      </div>
      {block.data.caption && (
        <p className="text-center text-xs sm:text-sm text-gray-600 italic bg-gray-50 rounded-lg py-2 sm:py-3 px-3 sm:px-4">
          {block.data.caption}
        </p>
      )}
    </div>
  );
};

const TableView = ({ block }) => (
  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 sm:px-6 py-2 sm:py-3 border-b-2 border-gray-100">
      <TableIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
      <span className="font-semibold text-gray-900 text-sm sm:text-base">Data Table</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
            {block.data.headers.map((header, index) => (
              <th
                key={index}
                className="border-b-2 border-gray-200 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left font-bold text-gray-900 text-xs sm:text-sm lg:text-base whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.data.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-blue-50 transition-colors ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
                  {cell.type === "image" ? (
                    cell.content ? (
                      <img
                        src={cell.content}
                        alt="Table cell"
                        className="w-full h-24 sm:h-32 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <span className="flex-1 text-gray-700 text-xs sm:text-sm lg:text-base">{cell.content}</span>
                      {cell.content && (
                        <div className="flex-shrink-0">
                          <TTSButton text={cell.content} />
                        </div>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DialogueView = ({ block }) => {
  const speakerConfigs = [
    { bg: "from-blue-50 to-blue-100", border: "border-blue-300", icon: "bg-blue-500" },
    { bg: "from-green-50 to-green-100", border: "border-green-300", icon: "bg-green-500" },
    { bg: "from-purple-50 to-purple-100", border: "border-purple-300", icon: "bg-purple-500" },
    { bg: "from-orange-50 to-orange-100", border: "border-orange-300", icon: "bg-orange-500" },
    { bg: "from-pink-50 to-pink-100", border: "border-pink-300", icon: "bg-pink-500" },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Dialogue</h3>
      </div>
      {block.data.lines.map((line, index) => {
        const config = speakerConfigs[index % speakerConfigs.length];
        return (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${config.bg} border-2 ${config.border} rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${config.icon} rounded-full flex items-center justify-center text-white font-bold shadow-md text-sm sm:text-base flex-shrink-0`}>
                  {line.speaker.charAt(0)}
                </div>
                <span className="font-bold text-gray-900 text-base sm:text-lg">{line.speaker}</span>
              </div>
              {line.text && (
                <div className="flex-shrink-0 self-end sm:self-start">
                  <TTSButton text={line.text} />
                </div>
              )}
            </div>
            <p className="text-gray-800 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 leading-relaxed">{line.text}</p>
            {line.translation && (
              <p className="text-gray-600 text-xs sm:text-sm italic bg-white/50 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2">
                {line.translation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const VocabularyView = ({ block }) => (
  <div className="space-y-3 sm:space-y-4">
    <div className="flex items-center gap-2 mb-4 sm:mb-6">
      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
        <BookMarked className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Vocabulary</h3>
    </div>
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
      {block.data.words.map((word, index) => (
        <div
          key={index}
          className="group bg-gradient-to-br from-purple-50 via-pink-50 to-white border-2 border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {word.gender && (
                  <span className="px-2 sm:px-3 py-1 bg-purple-200 text-purple-800 text-xs sm:text-sm font-bold rounded-full">
                    {word.gender}
                  </span>
                )}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">
                {word.word}
              </h4>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg">{word.meaning}</p>
            </div>
            {word.word && (
              <div className="flex-shrink-0 self-end sm:self-start">
                <TTSButton text={word.word} />
              </div>
            )}
          </div>
          {word.exampleDe && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-purple-200">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3">
                <div className="flex-1">
                  <p className="text-gray-800 font-medium mb-2 text-sm sm:text-base break-words">{word.exampleDe}</p>
                  {word.exampleEn && (
                    <p className="text-gray-600 italic text-xs sm:text-sm">"{word.exampleEn}"</p>
                  )}
                </div>
                {word.exampleDe && (
                  <div className="flex-shrink-0 self-end sm:self-start">
                    <TTSButton text={word.exampleDe} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const GrammarView = ({ block }) => (
  <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border-2 border-amber-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
      <div className="p-2 sm:p-3 bg-amber-200 rounded-xl flex-shrink-0">
        <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-amber-700" />
      </div>
      <div className="flex-1">
        {block.data.title && (
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            {block.data.title}
          </h3>
        )}
        <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
          {block.data.content}
        </p>
      </div>
    </div>
  </div>
);

const NoteView = ({ block }) => {
  const noteConfigs = {
    info: {
      bg: "from-blue-50 to-blue-100",
      border: "border-blue-400",
      iconBg: "bg-blue-200",
      icon: AlertCircle,
      iconColor: "text-blue-700",
      textColor: "text-blue-900",
    },
    warning: {
      bg: "from-orange-50 to-orange-100",
      border: "border-orange-400",
      iconBg: "bg-orange-200",
      icon: AlertCircle,
      iconColor: "text-orange-700",
      textColor: "text-orange-900",
    },
    tip: {
      bg: "from-green-50 to-green-100",
      border: "border-green-400",
      iconBg: "bg-green-200",
      icon: Lightbulb,
      iconColor: "text-green-700",
      textColor: "text-green-900",
    },
    important: {
      bg: "from-red-50 to-red-100",
      border: "border-red-400",
      iconBg: "bg-red-200",
      icon: AlertCircle,
      iconColor: "text-red-700",
      textColor: "text-red-900",
    },
  };
  
  const config = noteConfigs[block.data.noteType] || noteConfigs.info;
  const Icon = config.icon;

  return (
    <div className={`bg-gradient-to-br ${config.bg} border-2 ${config.border} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md`}>
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className={`p-2 sm:p-3 ${config.iconBg} rounded-xl flex-shrink-0`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.iconColor}`} />
        </div>
        <p className={`${config.textColor} text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap flex-1`}>
          {block.data.content}
        </p>
      </div>
    </div>
  );
};

export default StudentLessonView;
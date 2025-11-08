import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Save,
  Eye,
  Settings,
  Users,
  BookOpen,
  Award,
  Lock,
  CheckCircle,
} from "lucide-react";
import { courseAPI } from "../services/courseAPI";
import { studentAPI } from "../services/studentAPI";
import ModuleCard from "../components/ModuleCard";
import CourseOutlineView from "../components/CourseOutlineView";
import { quizAPI } from '../services/quizAPI';

const CourseBuilder = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("builder");
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const data = await courseAPI.getCourse(courseId);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to load course";
      alert(errorMessage);
      navigate("/teacher/courses");
    } finally {
      setLoading(false);
    }
  };

  const handleAddModule = () => {
    setEditingModule(null);
    setShowModuleModal(true);
  };

  const handleEditModule = (module) => {
    setEditingModule(module);
    setShowModuleModal(true);
  };

  const handleDeleteModule = async (moduleId) => {
    if (
      confirm(
        "Are you sure you want to delete this module? All lessons will be deleted."
      )
    ) {
      try {
        await courseAPI.deleteModule(moduleId);
        fetchCourse();
        alert("Module deleted successfully");
      } catch (error) {
        alert("Failed to delete module");
      }
    }
  };

  const handleAddLesson = (module) => {
    setSelectedModule(module);
    setShowLessonModal(true);
  };

  const handleViewLesson = (lesson) => {
    navigate(`/teacher/lessons/${lesson._id}`);
  };

  const tabs = [
    { id: "builder", label: "Course Builder", icon: BookOpen },
    { id: "outline", label: "Course Outline", icon: Eye },
    { id: "students", label: "Enrolled Students", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/teacher/courses")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {course.title}
              </h1>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  navigate(`/teacher/courses/${courseId}/quizzes`)
                }
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Award className="w-5 h-5" />
                <span>Manage Quizzes</span>
              </button>

              <button
                onClick={() => navigate(`/teacher/courses/${courseId}/edit`)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
              >
                <Settings className="w-5 h-5" />
                <span>Edit Details</span>
              </button>
            </div>
          </div>
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
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "builder" && (
          <div>
            <div className="mb-6">
              <button
                onClick={handleAddModule}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add Module</span>
              </button>
            </div>

            {course.modules && course.modules.length > 0 ? (
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <ModuleCard
                    key={module._id}
                    module={module}
                    onEdit={handleEditModule}
                    onDelete={handleDeleteModule}
                    onAddLesson={handleAddLesson}
                    onViewLesson={handleViewLesson}
                    isTeacher={true}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No modules yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start building your course by adding your first module
                </p>
                <button
                  onClick={handleAddModule}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Add Your First Module
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "outline" && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Course Outline Preview
              </h2>
              <p className="text-gray-600">
                This is how students will see your course structure
              </p>
            </div>
            <CourseOutlineView course={course} />
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Enrolled Students ({course.enrolledStudents?.length || 0})
              </h2>
              {course.enrolledStudents && course.enrolledStudents.length > 0 ? (
                <StudentAccessManager
                  courseId={course._id}
                  modules={course.modules}
                  enrolledStudents={course.enrolledStudents}
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Students Enrolled
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Enroll students from the Students page to manage their
                    access
                  </p>
                  <button
                    onClick={() => navigate("/teacher/students")}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    Go to Students Page
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Course Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Advanced course settings coming in future updates
            </p>
            <button
              onClick={() => navigate(`/teacher/courses/${courseId}/edit`)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Edit Basic Details
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModuleModal && (
        <ModuleModal
          courseId={courseId}
          module={editingModule}
          onClose={() => {
            setShowModuleModal(false);
            setEditingModule(null);
          }}
          onSuccess={() => {
            setShowModuleModal(false);
            setEditingModule(null);
            fetchCourse();
          }}
        />
      )}

      {showLessonModal && selectedModule && (
        <LessonModal
          module={selectedModule}
          onClose={() => {
            setShowLessonModal(false);
            setSelectedModule(null);
          }}
          onSuccess={() => {
            setShowLessonModal(false);
            setSelectedModule(null);
            fetchCourse();
          }}
        />
      )}
    </div>
  );
};

// Module Modal Component
const ModuleModal = ({ courseId, module, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: module?.title || "",
    description: module?.description || "",
    estimatedDuration: module?.estimatedDuration || 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title) {
      setError("Please provide a title");
      return;
    }

    setLoading(true);

    try {
      if (module) {
        await courseAPI.updateModule(module._id, formData);
        alert("Module updated successfully!");
      } else {
        await courseAPI.createModule({
          ...formData,
          courseId,
          estimatedDuration: parseInt(formData.estimatedDuration) || 0,
        });
        alert("Module created successfully!");
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
          <h2 className="text-2xl font-bold">
            {module ? "Edit Module" : "Create New Module"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Introduction to German Grammar"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of this module..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration (minutes)
            </label>
            <input
              type="number"
              name="estimatedDuration"
              value={formData.estimatedDuration}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : module
                ? "Update Module"
                : "Create Module"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Lesson Modal Component
const LessonModal = ({ module, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lecture",
    estimatedDuration: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title) {
      setError("Please provide a title");
      return;
    }

    setLoading(true);

    try {
      await courseAPI.createLesson(module._id, {
        ...formData,
        estimatedDuration: parseInt(formData.estimatedDuration) || 0,
      });
      alert("Lesson created successfully!");
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
          <h2 className="text-2xl font-bold">Create New Lesson</h2>
          <p className="text-primary-100 mt-1">Module: {module.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., German Articles: Der, Die, Das"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of this lesson..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="lecture">Lecture</option>
                <option value="practice">Practice</option>
                <option value="quiz">Quiz</option>
                <option value="dialogue">Dialogue</option>
                <option value="story">Story</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              📝 <strong>Note:</strong> After creating the lesson, you'll be
              able to add content using the block editor (coming in Phase 4).
            </p>
          </div>

          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Lesson"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add this component at the bottom of CourseBuilder.jsx, before the export

const StudentAccessManager = ({ courseId, modules, enrolledStudents }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
    fetchQuizzes();
  }, [enrolledStudents]);

  const fetchStudentDetails = async () => {
    setLoading(true);
    try {
      const studentPromises = enrolledStudents.map(e => 
        studentAPI.getStudent(e.studentId)
      );
      const studentData = await Promise.all(studentPromises);
      setStudents(studentData.map(d => d.student));
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH QUIZZES
  const fetchQuizzes = async () => {
    try {
      const quizData = await quizAPI.getCourseQuizzes(courseId);
      setQuizzes(quizData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleUnlockLesson = async (studentId, lessonId) => {
    try {
      await studentAPI.unlockLesson(studentId, lessonId);
      await fetchStudentDetails();
      alert('Lesson unlocked successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to unlock lesson');
    }
  };

  const handleLockLesson = async (studentId, lessonId) => {
    try {
      await studentAPI.lockLesson(studentId, lessonId);
      await fetchStudentDetails();
      alert('Lesson locked successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to lock lesson');
    }
  };

  const handleUnlockModule = async (studentId, moduleId) => {
    if (confirm('Unlock all lessons in this module for this student?')) {
      try {
        await studentAPI.unlockModule(studentId, moduleId);
        await fetchStudentDetails();
        alert('Module unlocked successfully!');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to unlock module');
      }
    }
  };

  // ✅ QUIZ LOCK/UNLOCK HANDLERS
  const handleUnlockQuiz = async (studentId, quizId) => {
    try {
      await studentAPI.unlockQuiz(studentId, quizId);
      await fetchStudentDetails();
      alert('Quiz unlocked successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to unlock quiz');
    }
  };

  const handleLockQuiz = async (studentId, quizId) => {
    try {
      await studentAPI.lockQuiz(studentId, quizId);
      await fetchStudentDetails();
      alert('Quiz locked successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to lock quiz');
    }
  };

  const handleUnlockAllQuizzes = async (studentId) => {
    if (confirm('Unlock all quizzes in this course for this student?')) {
      try {
        await studentAPI.unlockCourseQuizzes(studentId, courseId);
        await fetchStudentDetails();
        alert('All quizzes unlocked successfully!');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to unlock quizzes');
      }
    }
  };

  const isLessonUnlocked = (studentId, lessonId) => {
    const student = students.find(s => s._id === studentId);
    return student?.unlockedLessons?.some(l => l.toString() === lessonId);
  };

  // ✅ CHECK IF QUIZ IS UNLOCKED
  const isQuizUnlocked = (studentId, quizId) => {
    const student = students.find(s => s._id === studentId);
    return student?.unlockedQuizzes?.some(q => q.toString() === quizId);
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading students...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Student Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Student
        </label>
        <select
          value={selectedStudent?._id || ''}
          onChange={(e) => {
            const student = students.find(s => s._id === e.target.value);
            setSelectedStudent(student);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Choose a student...</option>
          {students.map(student => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.email})
            </option>
          ))}
        </select>
      </div>

      {/* Access Controls */}
      {selectedStudent && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Managing access for: {selectedStudent.name}
            </h3>
            <div className="text-sm text-gray-600">
              {selectedStudent.unlockedLessons?.length || 0} lessons, {selectedStudent.unlockedQuizzes?.length || 0} quizzes unlocked
            </div>
          </div>

          {/* ✅ LESSONS SECTION */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Lessons Access</span>
            </h4>
            <div className="space-y-4">
              {modules.map(module => (
                <div key={module._id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-gray-900">{module.title}</h5>
                    <button
                      onClick={() => handleUnlockModule(selectedStudent._id, module._id)}
                      className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded font-medium"
                    >
                      Unlock All
                    </button>
                  </div>

                  <div className="space-y-2">
                    {module.lessons && module.lessons.length > 0 ? (
                      module.lessons.map(lesson => {
                        const unlocked = isLessonUnlocked(selectedStudent._id, lesson._id);
                        return (
                          <div
                            key={lesson._id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div className="flex items-center space-x-3">
                              {unlocked ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Lock className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="text-sm text-gray-900">{lesson.title}</span>
                            </div>
                            <button
                              onClick={() => 
                                unlocked 
                                  ? handleLockLesson(selectedStudent._id, lesson._id)
                                  : handleUnlockLesson(selectedStudent._id, lesson._id)
                              }
                              className={`text-xs px-3 py-1 rounded font-medium ${
                                unlocked
                                  ? 'bg-red-100 hover:bg-red-200 text-red-700'
                                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                              }`}
                            >
                              {unlocked ? 'Lock' : 'Unlock'}
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500">No lessons in this module</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ QUIZZES SECTION */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Quizzes Access</span>
              </h4>
              {quizzes.length > 0 && (
                <button
                  onClick={() => handleUnlockAllQuizzes(selectedStudent._id)}
                  className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded font-medium"
                >
                  Unlock All Quizzes
                </button>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {quizzes.length > 0 ? (
                <div className="space-y-2">
                  {quizzes.map(quiz => {
                    const unlocked = isQuizUnlocked(selectedStudent._id, quiz._id);
                    return (
                      <div
                        key={quiz._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center space-x-3">
                          {unlocked ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{quiz.title}</p>
                            <p className="text-xs text-gray-500">
                              {quiz.questionCount} questions • {quiz.settings.timeLimit} min
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => 
                            unlocked 
                              ? handleLockQuiz(selectedStudent._id, quiz._id)
                              : handleUnlockQuiz(selectedStudent._id, quiz._id)
                          }
                          className={`text-xs px-3 py-1 rounded font-medium ${
                            unlocked
                              ? 'bg-red-100 hover:bg-red-200 text-red-700'
                              : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                          }`}
                        >
                          {unlocked ? 'Lock' : 'Unlock'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No quizzes in this course yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Import needed icons at the top


export default CourseBuilder;

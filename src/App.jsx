import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TeacherStudents from "./pages/TeacherStudents";
import StudentCourses from "./pages/StudentCourses";
import TeacherCourses from "./pages/TeacherCourses";
import CourseBuilder from "./pages/CourseBuilder";
import EditCourse from "./pages/EditCourse";
import PublicCourse from "./pages/PublicCourse";
import LessonEditor from "./pages/LessonEditor";
import StudentLessonView from "./pages/StudentLessonView";
import StudentDictionary from "./pages/StudentDictionary";
import StudentProgress from "./pages/StudentProgress";
import CourseLearning from "./pages/CourseLearning";
import Certificate from "./pages/Certificate";
import useAuthStore from "./store/authStore";
import QuizBuilder from "./pages/QuizBuilder";
import QuizList from "./pages/QuizList";
import StudentQuizView from "./pages/StudentQuizView";
import QuizResults from "./pages/QuizResults";
import QuizAttempts from "./pages/QuizAttempts";
import AIAssistant from "./pages/AIAssistant";
import AIMonitor from "./pages/AIMonitor";
import AIConversations from "./pages/AIConversations";

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate
                  to={
                    user?.role === "teacher"
                      ? "/teacher/dashboard"
                      : "/student/dashboard"
                  }
                  replace
                />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate
                  to={
                    user?.role === "teacher"
                      ? "/teacher/dashboard"
                      : "/student/dashboard"
                  }
                  replace
                />
              ) : (
                <Signup />
              )
            }
          />

          {/* Shared Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Public Course View */}
          <Route
            path="/courses/:courseId"
            element={
              <ProtectedRoute>
                <PublicCourse />
              </ProtectedRoute>
            }
          />

          {/* Teacher Routes */}
          <Route
            path="/teacher/dashboard"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <TeacherDashboard />
              </RoleRoute>
            }
          />
          {/* Teacher Quiz Routes */}
          <Route
            path="/teacher/courses/:courseId/quizzes"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <QuizList />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/courses/:courseId/quiz/create"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <QuizBuilder />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/courses/:courseId/quiz/:quizId/edit"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <QuizBuilder />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/students"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <TeacherStudents />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/courses"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <TeacherCourses />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/ai-monitor"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <AIMonitor />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/ai-conversations/:conversationId"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <AIConversations />
              </RoleRoute>
            }
          />

          <Route
            path="/teacher/courses/:courseId"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <CourseBuilder />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/courses/:courseId/edit"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <EditCourse />
              </RoleRoute>
            }
          />
          <Route
            path="/teacher/lessons/:lessonId"
            element={
              <RoleRoute allowedRoles={["teacher", "admin"]}>
                <LessonEditor />
              </RoleRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </RoleRoute>
            }
          />
          {/* Student Quiz Routes */}
          <Route
            path="/student/quiz/:quizId"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentQuizView />
              </RoleRoute>
            }
          />
          <Route
            path="/student/ai-assistant"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <AIAssistant />
              </RoleRoute>
            }
          />
          <Route
            path="/student/ai-assistant/:conversationId"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <AIAssistant />
              </RoleRoute>
            }
          />
          <Route
            path="/student/quiz/:quizId/results/:attemptId"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <QuizResults />
              </RoleRoute>
            }
          />
          <Route
            path="/student/quiz-history"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <QuizAttempts />
              </RoleRoute>
            }
          />
          <Route
            path="/student/dictionary"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentDictionary />
              </RoleRoute>
            }
          />
          <Route
            path="/student/lessons/:lessonId"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentLessonView />
              </RoleRoute>
            }
          />
          <Route
            path="/student/courses"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentCourses />
              </RoleRoute>
            }
          />

          {/* Phase 6: Progress & Certificate Routes */}
          <Route
            path="/student/progress"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentProgress />
              </RoleRoute>
            }
          />
          <Route
            path="/student/learning/:courseId"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <CourseLearning />
              </RoleRoute>
            }
          />
          <Route
            path="/student/certificates/:courseId"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <Certificate />
              </RoleRoute>
            }
          />

          {/* Catch all - redirect to appropriate dashboard or landing */}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate
                  to={
                    user?.role === "teacher"
                      ? "/teacher/dashboard"
                      : "/student/dashboard"
                  }
                  replace
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

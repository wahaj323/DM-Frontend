import api from './api';

export const studentAPI = {
  // Get all students (teacher only)
  getAllStudents: async (params = {}) => {
    const { search = '', page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = params;
    const response = await api.get('/students', {
      params: { search, page, limit, sortBy, order }
    });
    return response.data;
  },

  // Get single student
  getStudent: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // Toggle student active status
  toggleActiveStatus: async (id) => {
    const response = await api.put(`/students/${id}/toggle-active`);
    return response.data;
  },

  // Enroll student in course
  enrollStudent: async (studentId, courseId, cohortId) => {
    const response = await api.post(`/students/${studentId}/enroll`, {
      courseId,
      cohortId
    });
    return response.data;
  },

  // Unenroll student from course
  unenrollStudent: async (studentId, courseId) => {
    const response = await api.delete(`/students/${studentId}/unenroll/${courseId}`);
    return response.data;
  },

  // Get student progress
  getStudentProgress: async (id) => {
    const response = await api.get(`/students/${id}/progress`);
    return response.data;
  },

  // Unlock lesson for student
  unlockLesson: async (studentId, lessonId) => {
    const response = await api.post(`/students/${studentId}/unlock-lesson/${lessonId}`);
    return response.data;
  },

  // Lock lesson for student
  lockLesson: async (studentId, lessonId) => {
    const response = await api.delete(`/students/${studentId}/unlock-lesson/${lessonId}`);
    return response.data;
  },

  // Unlock all lessons in a module
  unlockModule: async (studentId, moduleId) => {
    const response = await api.post(`/students/${studentId}/unlock-module/${moduleId}`);
    return response.data;
  },

   // ✅ ADD THESE NEW FUNCTIONS
  unlockQuiz: async (studentId, quizId) => {
    const response = await api.post(`/students/${studentId}/unlock-quiz/${quizId}`);
    return response.data;
  },

  lockQuiz: async (studentId, quizId) => {
    const response = await api.post(`/students/${studentId}/lock-quiz/${quizId}`);
    return response.data;
  },

  unlockCourseQuizzes: async (studentId, courseId) => {
    const response = await api.post(`/students/${studentId}/unlock-course-quizzes/${courseId}`);
    return response.data;
  },
};

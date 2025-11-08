import api from './api';

export const quizAPI = {
  // Create quiz
  createQuiz: async (quizData) => {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  },

  // Get all quizzes for a course
  getCourseQuizzes: async (courseId) => {
    const response = await api.get(`/quizzes/course/${courseId}`);
    return response.data;
  },

  // Get single quiz
  getQuiz: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  // Update quiz
  updateQuiz: async (quizId, quizData) => {
    const response = await api.put(`/quizzes/${quizId}`, quizData);
    return response.data;
  },

  // Delete quiz
  deleteQuiz: async (quizId) => {
    const response = await api.delete(`/quizzes/${quizId}`);
    return response.data;
  },

  // Publish/unpublish quiz
  togglePublish: async (quizId) => {
    const response = await api.post(`/quizzes/${quizId}/publish`);
    return response.data;
  },

  // Get quiz statistics
  getQuizStats: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}/stats`);
    return response.data;
  },
};

export default quizAPI;
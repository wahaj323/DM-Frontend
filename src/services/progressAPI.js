import api from './api';

export const progressAPI = {
  // Get course progress
  getCourseProgress: async (courseId) => {
    const response = await api.get(`/progress/course/${courseId}`);
    return response.data;
  },

  // Get lesson progress
  getLessonProgress: async (lessonId) => {
    const response = await api.get(`/progress/lesson/${lessonId}`);
    return response.data;
  },

  // Start lesson
  startLesson: async (lessonId) => {
    const response = await api.post(`/progress/start/${lessonId}`);
    return response.data;
  },

  // Complete lesson
  completeLesson: async (lessonId, data) => {
    const response = await api.post(`/progress/complete/${lessonId}`, data);
    return response.data;
  },

  // Update time spent
  updateTimeSpent: async (lessonId, timeSpent) => {
    const response = await api.put(`/progress/time/${lessonId}`, { timeSpent });
    return response.data;
  },

  // Toggle bookmark
  toggleBookmark: async (lessonId) => {
    const response = await api.post(`/progress/bookmark/${lessonId}`);
    return response.data;
  },

  // Get dashboard
  getDashboard: async () => {
    const response = await api.get('/progress/dashboard');
    return response.data;
  },
};
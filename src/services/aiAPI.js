import api from './api';

export const aiAPI = {
  // Send chat message
  sendMessage: async (message, conversationId = null, courseId = null, lessonId = null) => {
    const response = await api.post('/ai/chat', {
      message,
      conversationId,
      courseId,
      lessonId
    });
    return response.data;
  },

  // Get conversations
  getConversations: async (page = 1, limit = 10, status = 'active') => {
    const response = await api.get('/ai/conversations', {
      params: { page, limit, status }
    });
    return response.data;
  },

  // Get single conversation
  getConversation: async (id) => {
    const response = await api.get(`/ai/conversations/${id}`);
    return response.data;
  },

  // Delete/Archive conversation
  deleteConversation: async (id) => {
    const response = await api.delete(`/ai/conversations/${id}`);
    return response.data;
  },

  // Grammar check
  checkGrammar: async (text, conversationId = null) => {
    const response = await api.post('/ai/grammar-check', {
      text,
      conversationId
    });
    return response.data;
  },

  // Translate
  translate: async (text, fromLang, toLang, contextNote = '', conversationId = null) => {
    const response = await api.post('/ai/translate', {
      text,
      fromLang,
      toLang,
      contextNote,
      conversationId
    });
    return response.data;
  },

  // Correct text
  correctText: async (text, conversationId = null) => {
    const response = await api.post('/ai/correct', {
      text,
      conversationId
    });
    return response.data;
  },

  // Generate exercise
  generateExercise: async (topic, type = 'fill-blank') => {
    const response = await api.post('/ai/generate-exercise', {
      topic,
      type
    });
    return response.data;
  },

  // Get usage stats
  getUsage: async () => {
    const response = await api.get('/ai/usage');
    return response.data;
  },

  // === TEACHER ADMIN ENDPOINTS ===

  // Get all conversations (admin)
  adminGetConversations: async (filters = {}) => {
    const response = await api.get('/ai/admin/conversations', {
      params: filters
    });
    return response.data;
  },

  // Get AI statistics
  adminGetStats: async (timeframe = 'week', courseId = null) => {
    const response = await api.get('/ai/admin/stats', {
      params: { timeframe, courseId }
    });
    return response.data;
  },

  // Flag conversation
  adminFlagConversation: async (conversationId, reason = '') => {
    const response = await api.post(`/ai/admin/conversations/${conversationId}/flag`, {
      reason
    });
    return response.data;
  },

  // Correct AI message
  adminCorrectMessage: async (conversationId, messageIndex, correctedContent, correctionNote) => {
    const response = await api.post(
      `/ai/admin/messages/${conversationId}/${messageIndex}/correct`,
      { correctedContent, correctionNote }
    );
    return response.data;
  },

  // Get student conversations
  adminGetStudentConversations: async (studentId) => {
    const response = await api.get(`/ai/admin/students/${studentId}/conversations`);
    return response.data;
  },

  // Delete conversation (admin)
  adminDeleteConversation: async (conversationId) => {
    const response = await api.delete(`/ai/admin/conversations/${conversationId}`);
    return response.data;
  },

  // Export data
  adminExport: async (filters = {}) => {
    const response = await api.get('/ai/admin/export', {
      params: filters
    });
    return response.data;
  }
};

export default aiAPI;
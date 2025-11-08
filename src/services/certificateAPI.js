import api from './api';

export const certificateAPI = {
  // Generate certificate
  generateCertificate: async (courseId) => {
    const response = await api.post(`/certificates/generate/${courseId}`);
    return response.data;
  },

  // Get all certificates
  getAllCertificates: async () => {
    const response = await api.get('/certificates');
    return response.data;
  },

  // Get single certificate
  getCertificate: async (id) => {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },

  // Verify certificate
  verifyCertificate: async (certificateNumber) => {
    const response = await api.get(`/certificates/verify/${certificateNumber}`);
    return response.data;
  },
};
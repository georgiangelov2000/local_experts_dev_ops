import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // adjust to your Laravel API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API calls
const apiService = {
  getAds: (config = {}) => apiClient.get('/services', config),
  getAdById: (id) => apiClient.get(`/services/${id}`),
  // Add more endpoints here
};

export default apiService;
    
import axios from 'axios';

// Създаваме инстанция на Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавяме интерцептор за всяка заявка -> автоматично слага Authorization header
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const apiService = {
  // 🔐 Authentication
  login: (data) => apiClient.post('/login', data),
  register: (data) => apiClient.post('/register', data),
  forgotPassword: (data) => apiClient.post('/forgot-password', data),
  resetPassword: (data) => apiClient.post('/reset-password', data),
  refresh: () => apiClient.post('/refresh'),
  auth: () => apiClient.get('/me'),
  logout: () => apiClient.post('/logout'),

  // 👤 Profile
  profile: (data) => apiClient.put('/profile', data),

  // 📦 Services (Ads)
  getAds: (config = {}) => apiClient.get('/services', config),
  getAdById: (alias) => apiClient.get(`/services/${alias}`),
  registerView: (alias) => apiClient.post(`/services/${alias}/views`),

  // 📂 Categories
  getCategories: () => apiClient.get('/categories'),
  getCategoryById: (id) => apiClient.get(`/categories/${id}/service-categories`),

  // 🌟 Reviews
  reviews: (data) => apiClient.post('/reviews', data),

  // ❤️ Interactions
  likeProvider: (id) => apiClient.post(`/providers/${id}/like`),
  dislikeProvider: (id) => apiClient.post(`/providers/${id}/dislike`),
  toggleFavourite: (id) => apiClient.post(`/providers/${id}/favourite`),
};

export default apiService;

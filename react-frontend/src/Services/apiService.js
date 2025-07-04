import axios from 'axios';

// Създаваме инстанция на Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Adjust според реалния ти бекенд адрес
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавяме интерцептор за всяка заявка -> автоматично слага Authorization header
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const apiService = {
  getAds: (config = {}) => apiClient.get('/services', config),
  getAdById: (id) => apiClient.get(`/services/${id}`),
  getCategories: () => apiClient.get('/categories'),
  getCategoryById: (id) => apiClient.get(`/categories/${id}/service-categories`),
  register: (data) => apiClient.post('/register', data),
  login: (data) => apiClient.post('/login', data),
  profile: (data) => apiClient.put('/profile', data),
  reviews: (data) => apiClient.post('/reviews', data),
  refresh: () => apiClient.post("/refresh"),
  auth: () => apiClient.get('/me'),
  logout: () => apiClient.post('/logout'),
  likeProvider(id) {
    return apiClient.post(`/providers/${id}/like`);
  },
  dislikeProvider(id) {
    return apiClient.post(`/providers/${id}/dislike`);
  },
  toggleFavourite(id) {
    return apiClient.post(`/providers/${id}/favourite`);
  }
};

export default apiService;

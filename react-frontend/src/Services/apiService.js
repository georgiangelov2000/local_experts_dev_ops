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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Можеш да добавиш response interceptor за глобален 401 хендлинг
// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized, redirecting to login...");
//       // Може би redirect към login
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

const apiService = {
  getAds: (config = {}) => apiClient.get('/services', config),
  getAdById: (id) => apiClient.get(`/services/${id}`),
  getCategories: () => apiClient.get('/categories'),
  getCategoryById: (id) => apiClient.get(`/categories/${id}/service-categories`),
  register: (data) => apiClient.post('/register', data),
  login: (data) => apiClient.post('/login', data),
  auth: () => apiClient.get('/me'),
  logout: () => apiClient.post('/logout'),
};

export default apiService;

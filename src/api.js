import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
          });
          
          const newToken = response.data.access;
          localStorage.setItem('access', newToken);
          api.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
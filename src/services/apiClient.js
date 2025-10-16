import axios from 'axios';
import { store } from '../redux';
import { logout } from '../redux/slices/authSlice';

const BASE_URL = 'https://your-api-domain.com/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    
    console.log('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
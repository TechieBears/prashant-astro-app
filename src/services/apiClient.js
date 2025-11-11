import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { Alert } from 'react-native';
import { BASE_URL } from './configConstant';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  // (response) => response,
  // (error) => {
  //   if (error.response?.status === 401) {
  //     store.dispatch(logout());
  //   }
  //   // console.log('API Error:', error?.response?.data?.message || error?.response?.data  || error.response?.data?.message || error.message);
  //   return Promise.reject(error?.response?.data?.message || error?.response?.data  || error.response?.data?.message || error.message);
  // }
   (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const { response, message } = error;

        // ✅ Handle maintenance mode (show alert only once)
        if (!response || response.status >= 500) {
            if (!maintenanceAlertShown) {
                maintenanceAlertShown = true;
                Alert.alert('Maintenance', 'Our servers are currently under maintenance. Please try again later.', [
                    { text: 'OK', onPress: () => (maintenanceAlertShown = false) },
                ]);
            }
            return Promise.reject(error);
        }

        // ✅ Handle network errors (offline screen navigation)
        if (message === 'Network Error') {
            console.log('Network error detected. Navigating to offline screen...');
            // resetAndNavigate('offline');
            return Promise.reject(error);
        }

        // ✅ Handle token expiration (refresh logic)
        if (response.status === 401 || response.status === 403) {
            // const refreshToken = await Storage.getItem('@storage_refresh');
            // if (refreshToken && !isTokenExpired(refreshToken)) {
            //     try {
            //         const newAccessToken = await refreshAccessToken(refreshToken);
            //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            //         return customAxios(originalRequest); // Retry original request
            //     } catch (err) {
            //         console.error('Error refreshing token:', err);
            //         await handleLogout();
            //     }
            // } else {
            //     console.log('Refresh token expired. Redirecting to login...');
            //     await handleLogout();
            // }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
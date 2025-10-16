import apiClient from './apiClient';

// Auth APIs
export const loginApi = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

export const registerApi = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.log('Register error:', error);
    throw error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await apiClient.post('/customer/verify-otp', data);
    return response.data;
  } catch (error) {
    console.log('OTP verification error:', error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.log('Logout error:', error);
    throw error;
  }
};

// User APIs
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile');
    return response.data;
  } catch (error) {
    console.log('Get profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await apiClient.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    console.log('Update profile error:', error);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await apiClient.put('/user/password', passwordData);
    return response.data;
  } catch (error) {
    console.log('Change password error:', error);
    throw error;
  }
};
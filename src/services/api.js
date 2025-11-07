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

// Service APIs
export const getServiceCategories = async () => {
  try {
    const response = await apiClient.get('/service-categories/public/our-service-categories');
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const getServices = async () => {
  try {
    const response = await apiClient.get('/service/astroguid/public/get-all');
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const getSingleServicesDetails = async (id) => {
  try {
    if (!id) throw new Error('Service ID is required');
    const response = await apiClient.get(`/service/public/get-single?id=${id}`);
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const getAvailabilityServicesType = async () => {
  try {
    const response = await apiClient.get("/service-categories/public/dropdown");
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const getAvailabilityAstrologers = async (employeeType) => {
  try {
    const response = await apiClient.post("/employee-users/astroguid/public/get-all", { employeeType });
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const getAvailabilityTimeSlot = async (slotData) => {
  try {
    const response = await apiClient.post("/calender/check-availability", slotData);
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const getCustomerAddresses = async () => {
  try {
    const response = await apiClient.get("/customer-address/get-all");
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const getCartData = async () => {
  try {
    const response = await apiClient.get("/service-cart/public/get");
    return response.data;
  } catch (error) {
    console.log('Get cart data error:', error);
    throw error;
  }
};

export const addToCartService = async (cartBookingPayload) => {
  try {
    const response = await apiClient.post("/service-cart/public/add", cartBookingPayload);
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const removeFromCartService = async (itemPayload) => {
  try {
    const response = await apiClient.put("/service-cart/public/remove-item", itemPayload);
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

export const bookService = async (bookingPayload) => {
  try {
    const response = await apiClient.post("/service-order/public/create", bookingPayload);
    return response.data;
  } catch (error) {
    console.log('Get service categories error:', error);
    throw error;
  }
};

// Product APIs

export const getProducts = async () => {
  try {
    const response = await apiClient.get('/product/public/active');
    return response.data;
  } catch (error) {
    console.log('Get products error:', error);
    throw error;
  }
};

export const getProductsCategories = async () => {
  try {
    const response = await apiClient.get('product/public/filter');
    return response.data;
  } catch (error) {
    console.log('Get product categories error:', error);
    throw error;
  }
};

export const getProductDetails = async productId => {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }
    const response = await apiClient.get(
      `/product/public/active-single?id=${productId}`,
    );
    return response.data;
  } catch (error) {
    console.log('Get product details error:', error);
    throw error;
  }
};

export const addToCartProduct = async productPayload => {
  try {
    const response = await apiClient.post(`/product-cart/public/add`, productPayload);
    return response.data;
  } catch (error) {
    console.log('Get product details error:', error);
    throw error;
  }
};

export const getProductCartData = async () => {
  try {
    const response = await apiClient.get(`/product-cart/public/get`);
    return response.data;
  } catch (error) {
    console.log('Get product details error:', error);
    throw error;
  }
};


export const updateProductCartData = async (productPayload) => {
  try {
    const response = await apiClient.put(`/product-cart/public/update`, productPayload);
    return response.data;
  } catch (error) {
    console.log('Get product details error:', error);
    throw error;
  }
};

export const deleteProductFromCart = async (productPayload) => {
  try {
    const response = await apiClient.put(`/product-cart/public/remove-item`, productPayload);
    return response.data;
  } catch (error) {
    console.log('Get product details error:', error);
    throw error;
  }
};

export const productOrderPlace = async (productPayload) => {
  try {
    const response = await apiClient.post(`/product-order/public/create`, productPayload);
    return response.data;
  } catch (error) {
    console.log('Get product details error:', error);
    throw error;
  }
};


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const LOGIN_URL = `${API_BASE_URL}/login`;
export const USERS_URL = `${API_BASE_URL}/users`;
export const FOODS_URL = `${API_BASE_URL}/foods`;
export const BASKET_URL = `${API_BASE_URL}/basket`;

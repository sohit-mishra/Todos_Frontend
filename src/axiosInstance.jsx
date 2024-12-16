import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import { AuthContextProvider } from './AuthContext';

let isRefreshing = false;
let failedQueue = [];

// Creating an axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        if (isRefreshing) {
          // If a refresh is already in progress, add the request to the queue
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          }).catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          // Get the refreshAccessToken from context
          const context = useContext(AuthContext); 
          const newAccessToken = await context.refreshAccessToken(); // Use refreshAccessToken from context
          if (newAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            axiosInstance(originalRequest);

            // Process all the queued requests
            failedQueue.forEach(({ resolve }) => resolve(newAccessToken));
            failedQueue = [];
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          failedQueue.forEach(({ reject }) => reject(refreshError));
          failedQueue = [];
          window.location.href = "/login"; // Redirect to login page
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

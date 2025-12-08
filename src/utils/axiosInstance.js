// src/utils/axiosInstance.js
import axios from "axios";

const API_URL = "https://tdtlworld.com/hrms-backend/"; 
// const API_URL = "http://127.0.0.1:8000/";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data?.code === "token_not_valid"
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const res = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // Update header and retry request
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // Optionally logout user here
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

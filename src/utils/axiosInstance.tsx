// src/utils/axios.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://findjobs-sepia.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

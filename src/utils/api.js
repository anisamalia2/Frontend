import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://backend-capstone-group5.vercel.app";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== (INTERCEPTOR) =====
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

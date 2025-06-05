import axios from "axios";

// Đọc URL từ biến môi trường (mặc định fallback về localhost)
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/";

const API = axios.create({
  baseURL,
});

export default API;

import axios from "axios";  
const api = axios.create({
  baseURL: "https://mychanjo-app-backend.onrender.com/api", // 👈 Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;

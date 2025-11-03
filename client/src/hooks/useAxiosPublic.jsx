// src/hooks/useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ auto-picks from .env
  withCredentials: true, // optional, only if you use cookies/sessions
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

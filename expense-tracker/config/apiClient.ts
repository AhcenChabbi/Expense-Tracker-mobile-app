import axios from "axios";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

export default API;

import { getClerkInstance } from "@clerk/clerk-expo";
import axios from "axios";
const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});
API.interceptors.request.use(async (config) => {
  const clerkInstance = getClerkInstance();
  const token = await clerkInstance.session?.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

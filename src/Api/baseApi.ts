import axios from "axios";
import store from "../store";
import { logout, refreshToken } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_API_URL = "https://api.mockaroo.com/api";

const instanceAPI = axios.create({
  baseURL: BASE_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

instanceAPI.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instanceAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await AsyncStorage.getItem("token");
        const newRefreshToken = await AsyncStorage.getItem("refreshToken");
        store.dispatch(
          refreshToken({
            token: newToken as string,
            refreshToken: newRefreshToken as string,
          })
        );
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instanceAPI(originalRequest);
      } catch (error) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instanceAPI;

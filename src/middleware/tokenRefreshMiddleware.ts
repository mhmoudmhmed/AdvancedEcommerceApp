import { Middleware } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../store/authSlice";

const tokenRefreshMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if ((action as any).type === "auth/refreshToken") {
      const { refreshToken } = getState().auth;
      try {
        const newToken = await AsyncStorage.getItem("token");
        const newRefreshToken = await AsyncStorage.getItem("refreshToken");
        dispatch(
          refreshToken({ token: newToken, refreshToken: newRefreshToken })
        );
      } catch (error) {
        dispatch(logout());
      }
    }
    return next(action);
  };

export default tokenRefreshMiddleware;

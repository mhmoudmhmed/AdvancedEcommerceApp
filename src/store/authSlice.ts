import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      AsyncStorage.multiSet([
        ["token", action.payload.token],
        ["refreshToken", action.payload.refreshToken],
      ]);
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      AsyncStorage.multiRemove(["token", "refreshToken"]);
    },
    loadToken: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = !!action.payload.token;
    },
    signup: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      AsyncStorage.multiSet([
        ["token", action.payload.token],
        ["refreshToken", action.payload.refreshToken],
      ]);
    },
    refreshToken: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      AsyncStorage.multiSet([
        ["token", action.payload.token],
        ["refreshToken", action.payload.refreshToken],
      ]);
    },
  },
});

export const { login, logout, loadToken, signup, refreshToken } =
  authSlice.actions;
export default authSlice.reducer;

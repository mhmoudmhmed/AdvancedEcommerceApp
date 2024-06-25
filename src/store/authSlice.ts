import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token");
    },
    loadToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    signup: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem("token", action.payload);
    },
  },
});

export const { login, logout, loadToken, signup } = authSlice.actions;
export default authSlice.reducer;

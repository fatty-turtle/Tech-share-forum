"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "USER" | "MOD" | "ADMIN";

interface User {
  user_id: number;
  roles: UserRole[];
  email?: string;
  username?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setRoles: (state, action: PayloadAction<UserRole[]>) => {
      if (state.user) {
        state.user.roles = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setRoles, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const currentUser = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
};

const initialState = {
  user: currentUser || null,
  isLoggedIn: !!currentUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("currentUser");
      localStorage.setItem("isLoggedIn", "false");
    },
    loadUser(state) {
      const saved = localStorage.getItem("currentUser");
      if (saved) state.user = JSON.parse(saved);
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadThemeFromStorage = () => {
  try {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  } catch {
    console.error("Theme loading error:", error);
    return "dark";
  }
};

const initialState = {
  mode: loadThemeFromStorage(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.mode)
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", state.mode)
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

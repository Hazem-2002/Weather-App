import { createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("theme");

const initialState = storedTheme ? storedTheme : "dark";

export const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    changeTheme: (state) => {
      const newState = state === "dark" ? "light" : "dark";

      if (newState === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("theme", newState);

      return newState;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;

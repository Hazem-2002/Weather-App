import { createSlice } from "@reduxjs/toolkit";

const getSystemTheme = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
};

const storedTheme = JSON.parse(localStorage.getItem("theme")) || {
  theme: "systemTheme",
  actualTheme: getSystemTheme(),
};

const initialState = storedTheme;

export const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    changeTheme: (state, action) => {
      const theme = action.payload;
      let actualTheme;

      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        actualTheme = "dark";
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
        actualTheme = "light";
      } else if (theme === "systemTheme") {
        const theme = getSystemTheme();
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
          actualTheme = "dark";
        } else {
          document.documentElement.classList.remove("dark");
          actualTheme = "light";
        }
      }

      const finalTheme = { theme, actualTheme };

      localStorage.setItem("theme", JSON.stringify(finalTheme));

      return finalTheme;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;

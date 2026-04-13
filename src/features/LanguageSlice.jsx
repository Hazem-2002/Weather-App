import { createSlice } from "@reduxjs/toolkit";

const getLanguage = () => {
  const language = navigator.language;
  return language.startsWith("ar") ? "rtl" : "ltr";
};

const storedDirection = JSON.parse(localStorage.getItem("dir"));

const initialState = storedDirection
  ? storedDirection
  : { direction: getLanguage(), lang: "systemLanguage" };

export const languageSlice = createSlice({
  name: "direction",
  initialState,

  reducers: {
    changeLanguage: (state, action) => {
      const lang = action.payload;
      let direction;

      if (lang === "ar") {
        direction = "rtl";
      } else if (lang === "en") {
        direction = "ltr";
      } else {
        direction = getLanguage();
      }

      localStorage.setItem("dir", JSON.stringify({ direction, lang }));

      return { direction, lang };
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;

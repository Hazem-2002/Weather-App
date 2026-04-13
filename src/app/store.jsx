import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "../features/CityCoords";
import weatherReducer from "../features/WeatherDetials";
import historyReducer from "../features/HistorySlice";
import languageReducer from "../features/LanguageSlice";
import themeReducer from "../features/ThemeSlice";

export default configureStore({
  reducer: {
    city: coordsReducer,
    weather: weatherReducer,
    history: historyReducer,
    language: languageReducer,
    theme: themeReducer,
  },
});

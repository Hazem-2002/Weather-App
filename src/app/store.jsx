import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "../features/CityCoords";
import weatherReducer from "../features/WeatherDetials";
import historyReducer from "../features/HistorySlice";
import languageReducer from "../features/LanguageSlice";
import themeReducer from "../features/ThemeSlice";
import temperatureUnitReducer from "../features/TemperatureUnit";
import windUnitReducer from "../features/WindUnitSlice";
import pressureUnitReducer from "../features/PressureUnitSlice";
import VisibilityUnitReducer from "../features/VisibilityUnitSlice";
import TimeFormatReducer from "../features/TimeFormatSlice";

export default configureStore({
  reducer: {
    city: coordsReducer,
    weather: weatherReducer,
    history: historyReducer,
    language: languageReducer,
    theme: themeReducer,
    temperatureUnit: temperatureUnitReducer,
    windUnit: windUnitReducer,
    pressureUnit: pressureUnitReducer,
    visibilityUnit: VisibilityUnitReducer,
    timeFormat: TimeFormatReducer,
  },
});

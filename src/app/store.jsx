import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "../features/CityCoords";
import weatherReducer from "../features/WeatherDetials";
import historyReducer from "../features/HistorySlice";

export default configureStore({
  reducer: {
    city: coordsReducer,
    weather: weatherReducer,
    history: historyReducer,
  },
});

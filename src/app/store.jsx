import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "../features/CityCoords";
import weatherReducer from "../features/WeatherDetials";

export default configureStore({
  reducer: {
    city: coordsReducer,
    weather: weatherReducer,
  },
});

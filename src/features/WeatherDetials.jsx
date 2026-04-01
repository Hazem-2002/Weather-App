import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;

const storedCoords = localStorage.getItem("weather");

const initialState = storedCoords
  ? JSON.parse(storedCoords)
  : {
      temp: "",
      feelslike: "",
      min_temp: "",
      max_temp: "",
      desc: "",
      icon: "",
      city: "",
      place: "",
      date: "",
    };

export const weatherSlice = createSlice({
  name: "weather",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => action.payload);
  },
});

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (_, { getState, signal }) => {
    const coords = getState().city;

    if (coords.lon == null || coords.lat == null) return;

    const direction = "ltr";
    const lang = direction === "rtl" ? "ar" : "en";
    const locale = `${lang}-EG`;

    try {
      const weatherRes = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${coords.lat},${coords.lon}&days=7&lang=${lang}`,
        { signal },
      );

      console.log(weatherRes.data);

      // التاريخ والوقت
      const getDate = (timeZone) => {
        return new Date().toLocaleString("en-EG", {
          timeZone,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      };

      // الطقس
      const current = Math.round(weatherRes.data.current.temp_c);

      const hours = weatherRes.data.forecast.forecastday[0].hour;

      const min_temp = Math.round(
        hours.reduce(
          (acc, ele) => (ele.temp_c < acc ? ele.temp_c : acc),
          hours[0].temp_c,
        ),
      );

      const max_temp = Math.round(
        hours.reduce(
          (acc, ele) => (ele.temp_c > acc ? ele.temp_c : acc),
          hours[0].temp_c,
        ),
      );

      const { region, name, country } = weatherRes.data.location;

      const placeAddress = region
        ? country
          ? `${region}, ${country}`
          : region
        : name
          ? country
            ? `${name}, ${country}`
            : name
          : country
            ? country
            : "";

      return {
        min_temp: min_temp.toLocaleString(locale),
        max_temp: max_temp.toLocaleString(locale),
        temp: current.toLocaleString(locale),
        desc: weatherRes.data.current.condition.text,
        icon: weatherRes.data.current.condition.icon,
        date: getDate(weatherRes.data.location.tz_id),
        city:
          getState().city.city.replace(
            new RegExp(weatherRes.data.location.country, "g"),
            "",
          ) || weatherRes.data.location.name,
        feelslike: Math.round(weatherRes.data.current.feelslike_c),
        place: placeAddress,
      };
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Error fetching data:", err);
      }
    }
  },
);

export default weatherSlice.reducer;

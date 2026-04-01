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
      placeAddress: "",
      date: "",
      WeatherUI: "",
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

      // Weather
      const temp = Math.round(weatherRes.data.current.temp_c).toLocaleString(
        locale,
      );

      const hours = weatherRes.data.forecast.forecastday[0].hour;

      const min_temp = Math.round(
        hours.reduce(
          (acc, ele) => (ele.temp_c < acc ? ele.temp_c : acc),
          hours[0].temp_c,
        ),
      ).toLocaleString(locale);

      const max_temp = Math.round(
        hours.reduce(
          (acc, ele) => (ele.temp_c > acc ? ele.temp_c : acc),
          hours[0].temp_c,
        ),
      ).toLocaleString(locale);

      // City
      const city =
        getState().city.city.replace(
          new RegExp(weatherRes.data.location.country, "g"),
          "",
        ) || weatherRes.data.location.name;

      // City Description
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

      // Date && Time
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

      const date = getDate(weatherRes.data.location.tz_id);

      // Weather State Icon
      const icon = weatherRes.data.current.condition.icon;

      // Weather Descriptiom
      const desc = weatherRes.data.current.condition.text;

      // Weather UI Theme
      const getWeatherUI = (desc, isDay) => {
        const weather = desc.toLowerCase();

        const isMatch = (keywords) => keywords.some((k) => weather.includes(k));

        const dayNight = (dayClasses, nightClasses) =>
          isDay ? dayClasses : nightClasses;

        if (isMatch(["sun", "clear"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-yellow-300 via-orange-400 to-yellow-500",
              "bg-gradient-to-br from-indigo-900 via-purple-900 to-black",
            ),
            glow: dayNight("bg-yellow-400", "bg-purple-500"),
          };
        }

        if (isMatch(["partly cloudy"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-blue-300 via-gray-200 to-yellow-200",
              "bg-gradient-to-br from-indigo-800 via-gray-700 to-gray-900",
            ),
            glow: dayNight("bg-yellow-300", "bg-gray-400"),
          };
        }

        if (isMatch(["cloud", "overcast"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-gray-300 to-gray-500",
              "bg-gradient-to-br from-gray-700 to-gray-900",
            ),
            glow: "bg-gray-400",
          };
        }

        if (isMatch(["rain", "drizzle", "shower"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700",
              "bg-gradient-to-br from-blue-900 via-indigo-900 to-black",
            ),
            glow: "bg-blue-500",
          };
        }

        if (isMatch(["thunder", "storm"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-gray-700 via-purple-800 to-black",
              "bg-gradient-to-br from-black via-purple-900 to-black",
            ),
            glow: "bg-purple-600",
          };
        }

        if (isMatch(["snow", "blizzard", "ice"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-blue-100 via-white to-gray-200",
              "bg-gradient-to-br from-gray-500 to-gray-800",
            ),
            glow: "bg-white",
          };
        }

        if (isMatch(["fog", "mist", "haze"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-gray-200 to-gray-400",
              "bg-gradient-to-br from-gray-600 to-gray-800",
            ),
            glow: "bg-gray-300",
          };
        }

        if (isMatch(["wind", "dust", "sand"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-yellow-200 to-orange-300",
              "bg-gradient-to-br from-gray-700 to-gray-900",
            ),
            glow: "bg-orange-300",
          };
        }

        // DEFAULT
        return {
          bg: dayNight(
            "bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500",
            "bg-gradient-to-br from-gray-900 via-indigo-900 to-black",
          ),
          glow: dayNight("bg-blue-400", "bg-indigo-500"),
        };
      };

      const WeatherUI = getWeatherUI(
        weatherRes.data.current.condition.text,
        weatherRes.data.current.is_day,
      );

      // Feels Like Of Temperature
      const feelslike = Math.round(weatherRes.data.current.feelslike_c);

      return {
        temp,
        min_temp,
        max_temp,
        city,
        placeAddress,
        date,
        icon,
        desc,
        feelslike,
        WeatherUI,
      };
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Error fetching data:", err);
      }
    }
  },
);

export default weatherSlice.reducer;

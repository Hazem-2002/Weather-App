import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const currentWeather = localStorage.getItem("history");

const initialState = currentWeather
  ? JSON.parse(currentWeather)
  : {
      date: "2022-04-05",
    };

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    editDate: (state, action) => ({ ...state, date: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.fulfilled, (state, action) => action.payload);
  },
});

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (date, { getState, signal }) => {
    const coords = getState().city;
    if (coords.lon == null || coords.lat == null) return;

    const direction = "ltr";
    const lang = direction === "rtl" ? "ar" : "en";
    const locale = `${lang}-EG`;
    try {
      const weatherHistory = await axios.get(
        `https://api.weatherapi.com/v1/history.json?key=94add4e12f5d432fa03145025260204&q=${coords.lat},${coords.lon}&dt=${date}&lang=${lang}`,
        { signal },
      );
      console.log(weatherHistory.data);

      const fullDate = new Date(date).toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // City
      const city =
        getState().city.city.replace(
          new RegExp(weatherHistory.data.location.country, "g"),
          "",
        ) ||
        weatherHistory.data.location.name ||
        weatherHistory.data.location.region;

      const address = `${city} (${weatherHistory.data.location.country})`;

      // Weather
      const temp = `${Math.round(
        weatherHistory.data.forecast.forecastday[0].day.avgtemp_c,
      ).toLocaleString(locale)}°`;

      // Min && Max Temperature
      const hours = weatherHistory.data.forecast.forecastday[0].hour;
      const normalize = (num) => (Object.is(num, -0) ? 0 : num);

      const mintemp_c = `${normalize(
        Math.round(
          hours.reduce(
            (acc, ele) => (ele.temp_c < acc ? ele.temp_c : acc),
            hours[0].temp_c,
          ),
        ),
      ).toLocaleString(locale)}°`;

      const maxtemp_c = `${normalize(
        Math.round(
          hours.reduce(
            (acc, ele) => (ele.temp_c > acc ? ele.temp_c : acc),
            hours[0].temp_c,
          ),
        ),
      ).toLocaleString(locale)}°`;

      // Array to store formatted hourly forecast data
      const hourly_forecast = [];

      // Loop through each hour in the first forecast day
      for (let day of weatherHistory.data.forecast.forecastday[0].hour) {
        // Format time (HH:MM AM/PM)
        const time = new Date(day.time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        // Weather condition icon (URL from API)
        const icon = day.condition.icon;

        // Round temperature to nearest integer
        const temp = `${Math.round(day.temp_c)}°`;

        // Chance of rain (already 0–100 from API)
        const chance_of_rain = `${day.chance_of_rain}%`;

        const desc = day.condition.text;

        // Push formatted data into array
        hourly_forecast.push({
          time,
          icon,
          temp,
          desc,
          chance_of_rain,
        });
      }

      const icon =
        weatherHistory.data.forecast.forecastday[0].day.condition.icon;

      const desc =
        weatherHistory.data.forecast.forecastday[0].day.condition.text;

      const windSpeed = `${Math.round(weatherHistory.data.forecast.forecastday[0].day.maxwind_kph)} Km/h`;

      const avghumidity = `${weatherHistory.data.forecast.forecastday[0].day.avghumidity}%`;

      const daily_chance_of_rain = `${weatherHistory.data.forecast.forecastday[0].day.daily_chance_of_rain}%`;

      const uv = weatherHistory.data.forecast.forecastday[0].day.uv;

      const sunrise = weatherHistory.data.forecast.forecastday[0].astro.sunrise;

      const sunset = weatherHistory.data.forecast.forecastday[0].astro.sunset;

      const moonrise =
        weatherHistory.data.forecast.forecastday[0].astro.moonrise;

      const moonset = weatherHistory.data.forecast.forecastday[0].astro.moonset;

      const moon_phase =
        weatherHistory.data.forecast.forecastday[0].astro.moon_phase;
        
      const moon_illumination = `${weatherHistory.data.forecast.forecastday[0].astro.moon_illumination}%`;

      const astronomy = {
        sunrise,
        sunset,
        moonrise,
        moonset,
        moon_phase,
        moon_illumination,
      };

      return {
        date,
        fullDate,
        address,
        temp,
        icon,
        desc,
        maxtemp_c,
        mintemp_c,
        windSpeed,
        avghumidity,
        daily_chance_of_rain,
        uv,
        hourly_forecast,
        astronomy,
      };
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Error fetching data:", err);
      }
    }
  },
);

export const { editDate } = historySlice.actions;
export default historySlice.reducer;

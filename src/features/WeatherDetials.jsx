import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const currentWeather = localStorage.getItem("weather");

const initialState = currentWeather
  ? JSON.parse(currentWeather)
  : {
      temp: "",
      feelslike: "",
      icon: "",
      desc: "",
      city: "",
      placeAddress: "",
      date: "",
      WeatherUI: {},
      hourly_forecast: [{}],
      days_detials: [{}],
      current_detials: {},
      astronomy: {},
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
        `https://api.weatherapi.com/v1/forecast.json?key=94add4e12f5d432fa03145025260204&q=${coords.lat},${coords.lon}&days=7&lang=${lang}`,
        { signal },
      );

      console.log(weatherRes.data);

      // Weather
      const temp = `${Math.round(weatherRes.data.current.temp_c).toLocaleString(
        locale,
      )}°`;

      let min_temp;
      let max_temp;
      const days_detials = [];

      const normalize = (num) => (Object.is(num, -0) ? 0 : num);

      for (let day of weatherRes.data.forecast.forecastday) {
        const hours = day.hour;

        min_temp = normalize(
          Math.round(
            hours.reduce(
              (acc, ele) => (ele.temp_c < acc ? ele.temp_c : acc),
              hours[0].temp_c,
            ),
          ),
        ).toLocaleString(locale);

        max_temp = normalize(
          Math.round(
            hours.reduce(
              (acc, ele) => (ele.temp_c > acc ? ele.temp_c : acc),
              hours[0].temp_c,
            ),
          ),
        ).toLocaleString(locale);

        const icon = day.day.condition.icon;

        const dayName = new Date(day.date).toLocaleString("en-EG", {
          timeZone: weatherRes.data.location.tz_id,
          weekday: "long",
        });

        days_detials.push({
          min_temp: `${min_temp}°`,
          max_temp: `${max_temp}°`,
          icon,
          dayName,
        });
      }

      // Array to store formatted hourly forecast data
      const hourly_forecast = [];

      // Loop through each hour in the first forecast day
      for (let day of weatherRes.data.forecast.forecastday[0].hour) {
        // 🕒 Format time (HH:MM AM/PM)
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

      // Weather Icon State
      const icon = weatherRes.data.current.condition.icon;

      // Weather Descriptiom
      const desc = weatherRes.data.current.condition.text;

      // Weather UI Theme
      const getWeatherUI = (desc, isDay) => {
        const weather = desc.toLowerCase();

        const isMatch = (keywords) => keywords.some((k) => weather.includes(k));

        const dayNight = (dayClasses, nightClasses) =>
          isDay ? dayClasses : nightClasses;

        // ☀️ Clear / Sunny
        if (isMatch(["sun", "clear"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500",
              "bg-gradient-to-br from-slate-900 via-indigo-950 to-black",
            ),
            glow: dayNight("bg-yellow-300/30", "bg-indigo-500/30"),
          };
        }

        // ⛅ Partly Cloudy
        if (isMatch(["partly cloudy"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-sky-400 via-blue-400 to-yellow-300",
              "bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900",
            ),
            glow: dayNight("bg-yellow-300/25", "bg-gray-400/25"),
          };
        }

        // ☁️ Cloudy
        if (isMatch(["cloud", "overcast"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-gray-400 to-gray-600",
              "bg-gradient-to-br from-gray-800 to-gray-950",
            ),
            glow: dayNight("bg-gray-300/25", "bg-gray-500/25"),
          };
        }

        // 🌧 Rain
        if (isMatch(["rain", "drizzle", "shower"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700",
              "bg-gradient-to-br from-slate-900 via-blue-950 to-black",
            ),
            glow: dayNight("bg-blue-300/25", "bg-blue-500/25"),
          };
        }

        // ⛈ Thunder
        if (isMatch(["thunder", "storm"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-gray-600 via-purple-700 to-gray-800",
              "bg-gradient-to-br from-black via-purple-950 to-slate-950",
            ),
            glow: dayNight("bg-purple-400/25", "bg-purple-600/25"),
          };
        }

        // ❄️ Snow
        if (isMatch(["snow", "blizzard", "ice"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-slate-400 via-gray-400 to-slate-500",
              "bg-gradient-to-br from-gray-600 to-gray-900",
            ),
            glow: dayNight("bg-white/40", "bg-gray-400/25"),
          };
        }

        // 🌫 Fog / Mist
        if (isMatch(["fog", "mist", "haze"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-gray-300 to-gray-400",
              "bg-gradient-to-br from-gray-700 to-gray-900",
            ),
            glow: dayNight("bg-gray-200/40", "bg-gray-400/25"),
          };
        }

        // 🌪 Wind / Dust
        if (isMatch(["wind", "dust", "sand"])) {
          return {
            bg: dayNight(
              "bg-gradient-to-br from-amber-400 to-orange-500",
              "bg-gradient-to-br from-slate-800 to-gray-900",
            ),
            glow: dayNight("bg-orange-300/25", "bg-orange-500/25"),
          };
        }

        // 🌈 Default
        return {
          bg: dayNight(
            "bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600",
            "bg-gradient-to-br from-slate-900 via-indigo-950 to-black",
          ),
          glow: dayNight("bg-blue-300/25", "bg-indigo-500/25"),
        };
      };

      const WeatherUI = getWeatherUI(
        weatherRes.data.current.condition.text,
        weatherRes.data.current.is_day,
      );

      // Feels Like Of Temperature
      const feelslike = `${Math.round(weatherRes.data.current.feelslike_c)}°`;

      // Current Detials
      const wind_kph = `${weatherRes.data.current.wind_kph}Km/h`;
      const humidity = `${weatherRes.data.current.humidity}%`;
      const pressure_mb = `${weatherRes.data.current.pressure_mb}mb`;
      const uv = weatherRes.data.current.uv;
      const vis_km = `${weatherRes.data.current.vis_km}Km`;
      const current_detials = {
        wind_kph,
        humidity,
        pressure_mb,
        uv,
        feelslike,
        vis_km,
      };

      // Astronomy
      const sunrise = weatherRes.data.forecast.forecastday[0].astro.sunrise;
      const sunset = weatherRes.data.forecast.forecastday[0].astro.sunset;
      const moonrise = weatherRes.data.forecast.forecastday[0].astro.moonrise;
      const moonset = weatherRes.data.forecast.forecastday[0].astro.moonset;
      const moon_phase =
        weatherRes.data.forecast.forecastday[0].astro.moon_phase;
      const moon_illumination = `${weatherRes.data.forecast.forecastday[0].astro.moon_illumination}%`;

      const astronomy = {
        sunrise,
        sunset,
        moonrise,
        moonset,
        moon_phase,
        moon_illumination,
      };

      const weather = {
        temp,
        days_detials,
        city,
        placeAddress,
        date,
        icon,
        desc,
        feelslike,
        WeatherUI,
        hourly_forecast,
        current_detials,
        astronomy,
      };
      localStorage.setItem("weather", JSON.stringify(weather));
      return weather;
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Error fetching data:", err);
      }
    }
  },
);

export default weatherSlice.reducer;

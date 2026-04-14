import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeatherUI } from "./WeatherUI";
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
      currentDate: "",
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

    const direction = getState().language.direction;
    const windUnit = getState().windUnit;
    const pressureUnit = getState().pressureUnit;
    const visibilityUnit = getState().visibilityUnit;
    const timeFormat = getState().timeFormat;
    const temperatureUnit = getState().temperatureUnit;
    const Weather_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const Google_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const lang = direction === "rtl" ? "ar" : "en";
    const locale = `${lang}-EG`;

    try {
      const [weatherRes, geoRes] = await Promise.all([
        axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${Weather_KEY}&q=${coords.lat},${coords.lon}&days=7&lang=${lang}`,
          { signal },
        ),
        axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lon}&language=${lang}&key=${Google_KEY}`,
          { signal },
        ),
      ]);

      console.log(weatherRes.data);
      console.log(geoRes.data);

      // Weather
      const t =
        temperatureUnit === "Celsius"
          ? weatherRes.data.current.temp_c
          : weatherRes.data.current.temp_f;
      const temp = `${Math.round(t).toLocaleString(locale)}°`;

      let min_temp;
      let max_temp;
      const days_detials = [];

      const normalize = (num) => (Object.is(num, -0) ? 0 : num);

      for (let day of weatherRes.data.forecast.forecastday) {
        const hours = day.hour;

        min_temp = normalize(
          Math.round(
            temperatureUnit === "Celsius"
              ? hours.reduce(
                  (acc, ele) => (ele.temp_c < acc ? ele.temp_c : acc),
                  hours[0].temp_c,
                )
              : hours.reduce(
                  (acc, ele) => (ele.temp_f < acc ? ele.temp_f : acc),
                  hours[0].temp_f,
                ),
          ),
        ).toLocaleString(locale);

        max_temp = normalize(
          Math.round(
            temperatureUnit === "Celsius"
              ? hours.reduce(
                  (acc, ele) => (ele.temp_c > acc ? ele.temp_c : acc),
                  hours[0].temp_c,
                )
              : hours.reduce(
                  (acc, ele) => (ele.temp_f > acc ? ele.temp_f : acc),
                  hours[0].temp_f,
                ),
          ),
        ).toLocaleString(locale);

        const icon = day.day.condition.icon;

        const dayName = new Date(day.date).toLocaleString(locale, {
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
        const time = new Date(day.time).toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: timeFormat === "12-hour" ? true : false,
        });

        // Weather condition icon (URL from API)
        const icon = day.condition.icon;

        // Round temperature to nearest integer
        const t = temperatureUnit === "Celsius" ? day.temp_c : day.temp_f;
        const temp = `${Math.round(t).toLocaleString(locale)}°`;

        // Chance of rain (already 0–100 from API)
        const chance_of_rain = `${day.chance_of_rain.toLocaleString(locale)}%`;

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

      const getLocationInfo = () => {
        const results = geoRes.data.results;
        if (!results || !results.length) {
          return {
            city: direction === "ltr" ? "Unknown" : "غير معروف",
            subtitle: "",
          };
        }

        const get = (type) =>
          results.find((item) => item.types.includes(type))
            ?.address_components?.[0]?.long_name;

        const city = (
          get("locality") ||
          get("administrative_area_level_3") ||
          get("sublocality") ||
          get("administrative_area_level_2") ||
          (direction === "ltr" ? "Unknown" : "غير معروف")
        )
          .replace(/^(city|مدينة)/i, "")
          .trim();

        const sublocality =
          get("sublocality") ||
          get("neighborhood") ||
          get("administrative_area_level_2");

        const admin1 = get("administrative_area_level_1");

        const country = get("country");

        const subtitleParts = [sublocality, admin1, country].filter(
          (item) => item && item !== city,
        );

        const subtitle = subtitleParts.join(direction === "ltr" ? ", " : "، ");

        return {
          city,
          subtitle,
        };
      };

      const city = getLocationInfo().city;

      const placeAddress = getLocationInfo().subtitle;

      // Date && Time
      const getDate = (timeZone) => {
        return new Date().toLocaleString(locale, {
          timeZone,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: timeFormat === "12-hour" ? true : false,
        });
      };

      const date = getDate(weatherRes.data.location.tz_id);

      const currentDate = weatherRes.data.current.last_updated;

      // Weather Icon State
      const icon = weatherRes.data.current.condition.icon;

      // Weather Descriptiom
      const desc = weatherRes.data.current.condition.text;

      // Weather UI Theme
      const WeatherUI = getWeatherUI(
        weatherRes.data.current.condition.text,
        weatherRes.data.current.is_day,
        direction,
      );

      // Feels Like Of Temperature
      const ft =
        temperatureUnit === "Celsius"
          ? weatherRes.data.current.feelslike_c
          : weatherRes.data.current.feelslike_f;
      const feelslike = `${Math.round(ft).toLocaleString(locale)}°`;

      // Current Detials
      const wind =
        windUnit === "Kph"
          ? `${weatherRes.data.current.wind_kph.toLocaleString(locale)} ${direction === "ltr" ? "Km/h" : "كم/ساعة"}`
          : `${weatherRes.data.current.wind_mph.toLocaleString(locale)} ${direction === "ltr" ? "mph" : "ميل/ساعة"}`;

      const humidity = `${weatherRes.data.current.humidity.toLocaleString(locale)}%`;
      const pressure =
        pressureUnit === "Millibars"
          ? `${weatherRes.data.current.pressure_mb.toLocaleString(locale)} ${direction === "ltr" ? "mb" : "ملليبار"}`
          : `${weatherRes.data.current.pressure_in.toLocaleString(locale)} ${direction === "ltr" ? "inHg" : "بوصة زئبق"}`;

      const uv = weatherRes.data.current.uv.toLocaleString(locale);
      const vis =
        visibilityUnit === "Kilometers"
          ? `${weatherRes.data.current.vis_km.toLocaleString(locale)} ${direction === "ltr" ? "Km" : "كم"}`
          : `${weatherRes.data.current.vis_miles.toLocaleString(locale)} ${direction === "ltr" ? "mi" : "ميل"}`;
      const current_detials = {
        wind,
        humidity,
        pressure,
        uv,
        feelslike,
        vis,
      };

      // Astronomy
      const formatArabicTime = (timeStr) => {
        const [time, period] = timeStr.split(" "); // "05:32", "AM"

        let [hours, minutes] = time.split(":").map(Number);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        const date = new Date();
        date.setHours(hours, minutes);

        return date.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: timeFormat === "12-hour" ? true : false,
        });
      };

      const sunrise = formatArabicTime(
        weatherRes.data.forecast.forecastday[0].astro.sunrise,
      );

      const sunset = formatArabicTime(
        weatherRes.data.forecast.forecastday[0].astro.sunset,
      );

      const moonrise = formatArabicTime(
        weatherRes.data.forecast.forecastday[0].astro.moonrise,
      );

      const moonset = formatArabicTime(
        weatherRes.data.forecast.forecastday[0].astro.moonset,
      );

      const moon_phase =
        weatherRes.data.forecast.forecastday[0].astro.moon_phase;

      const moon_illumination = `${weatherRes.data.forecast.forecastday[0].astro.moon_illumination.toLocaleString(locale)}%`;

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
        currentDate,
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

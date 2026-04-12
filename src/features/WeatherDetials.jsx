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

    const direction = getState().direction;
    const lang = direction === "rtl" ? "ar" : "en";
    const locale = `${lang}-EG`;

    try {
      const [weatherRes, geoRes] = await Promise.all([
        axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=94add4e12f5d432fa03145025260204&q=${coords.lat},${coords.lon}&days=7&lang=${lang}`,
          { signal },
        ),
        axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lon}&language=${lang}&key=AIzaSyA7mjeWIhlZJ-lexyNDNGlYSTHFoUrCs2g`,
          { signal },
        ),
      ]);

      console.log(weatherRes.data);
      console.log(geoRes.data);

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
          hour12: true,
        });

        // Weather condition icon (URL from API)
        const icon = day.condition.icon;

        // Round temperature to nearest integer
        const temp = `${Math.round(day.temp_c).toLocaleString(locale)}°`;

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
          hour12: true,
        });
      };

      const date = getDate(weatherRes.data.location.tz_id);

      const currentDate = weatherRes.data.current.last_updated;

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

        const getGradientDirection = (() =>
          direction === "ltr" ? "bg-gradient-to-br" : "bg-gradient-to-bl")();

        // 🔥 Weather Conditions Map (FULL COVERAGE)
        const conditions = [
          // ☀️ Clear / Sunny
          {
            match: ["sunny", "clear", "مشمس", "صافي"],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-amber-400 via-orange-400 to-yellow-500`,
                `${getGradientDirection} from-slate-900 via-indigo-950 to-black`,
              ),
              glow: dayNight("bg-yellow-300/30", "bg-indigo-500/30"),
            },
          },

          // ⛅ Partly Cloudy
          {
            match: ["partly cloudy", "غائم جزئياً"],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-sky-400 via-blue-400 to-yellow-300`,
                `${getGradientDirection} from-slate-800 via-gray-800 to-slate-900`,
              ),
              glow: dayNight("bg-yellow-300/25", "bg-gray-400/25"),
            },
          },

          // ☁️ Cloudy / Overcast
          {
            match: ["cloudy", "overcast", "غائم", "غائم كليًا"],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-gray-400 to-gray-600`,
                `${getGradientDirection} from-gray-800 to-gray-950`,
              ),
              glow: dayNight("bg-gray-300/25", "bg-gray-500/25"),
            },
          },

          // 🌫 Fog / Mist / Haze
          {
            match: [
              "mist",
              "fog",
              "freezing fog",
              "haze",
              "شبورة",
              "ضباب",
              "ضباب متجمد",
              "غشاوة",
            ],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-gray-300 to-gray-400`,
                `${getGradientDirection} from-gray-700 to-gray-900`,
              ),
              glow: dayNight("bg-gray-200/40", "bg-gray-400/25"),
            },
          },

          // 🌧 Rain (ALL TYPES)
          {
            match: [
              "rain",
              "drizzle",
              "shower",
              "patchy rain",
              "light rain",
              "moderate rain",
              "heavy rain",
              "زخات",
              "رذاذ",
              "أمطار",
              "امطار",
              "خفيفة",
              "متوسطة",
              "غزيرة",
            ],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-blue-500 via-blue-600 to-indigo-700`,
                `${getGradientDirection} from-slate-900 via-blue-950 to-black`,
              ),
              glow: dayNight("bg-blue-300/25", "bg-blue-500/25"),
            },
          },

          // ⛈ Thunderstorms
          {
            match: ["thunder", "storm", "رعد", "عاصفة رعدية"],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-gray-600 via-purple-700 to-gray-800`,
                `${getGradientDirection} from-black via-purple-950 to-slate-950`,
              ),
              glow: dayNight("bg-purple-400/25", "bg-purple-600/25"),
            },
          },

          // ❄️ Snow
          {
            match: ["snow", "blizzard", "ثلوج", "ثلج", "عاصفة ثلجية"],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-slate-300 via-gray-300 to-slate-400`,
                `${getGradientDirection} from-gray-600 to-gray-900`,
              ),
              glow: dayNight("bg-white/40", "bg-gray-400/25"),
            },
          },

          // 🧊 Ice / Freezing
          {
            match: ["ice", "freezing rain", "ice pellets", "جليد", "متجمدة"],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-cyan-300 via-blue-300 to-slate-400`,
                `${getGradientDirection} from-slate-700 via-blue-900 to-black`,
              ),
              glow: dayNight("bg-cyan-200/40", "bg-blue-400/25"),
            },
          },

          // 🌪 Wind / Dust / Sand
          {
            match: [
              "wind",
              "dust",
              "sand",
              "sandstorm",
              "dust storm",
              "blowing",
              "رياح",
              "رمال",
              "عاصفة ترابية",
              "عاصفة رملية",
              "غبار",
            ],
            ui: {
              bg: dayNight(
                `${getGradientDirection} from-amber-400 to-orange-500`,
                `${getGradientDirection} from-slate-800 to-gray-900`,
              ),
              glow: dayNight("bg-orange-300/25", "bg-orange-500/25"),
            },
          },
        ];

        // 🔍 Find Match
        for (const condition of conditions) {
          if (isMatch(condition.match)) {
            return condition.ui;
          }
        }

        // 🌈 Default
        return {
          bg: dayNight(
            `${getGradientDirection} from-sky-500 via-blue-500 to-indigo-600`,
            `${getGradientDirection} from-slate-900 via-indigo-950 to-black`,
          ),
          glow: dayNight("bg-blue-300/25", "bg-indigo-500/25"),
        };
      };

      const WeatherUI = getWeatherUI(
        weatherRes.data.current.condition.text,
        weatherRes.data.current.is_day,
      );

      // Feels Like Of Temperature
      const feelslike = `${Math.round(weatherRes.data.current.feelslike_c).toLocaleString(locale)}°`;

      // Current Detials
      const wind_kph = `${weatherRes.data.current.wind_kph.toLocaleString(locale)} ${direction === "ltr" ? "Km/h" : "كم/ساعة"}`;
      const humidity = `${weatherRes.data.current.humidity.toLocaleString(locale)}%`;
      const pressure_mb = `${weatherRes.data.current.pressure_mb.toLocaleString(locale)} ${direction === "ltr" ? "mb" : "ملليبار"}`;
      const uv = weatherRes.data.current.uv.toLocaleString(locale);
      const vis_km = `${weatherRes.data.current.vis_km.toLocaleString(locale)} ${direction === "ltr" ? "Km" : "كم"}`;
      const current_detials = {
        wind_kph,
        humidity,
        pressure_mb,
        uv,
        feelslike,
        vis_km,
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
          hour12: true,
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

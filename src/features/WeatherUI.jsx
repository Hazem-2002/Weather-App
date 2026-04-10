export const getWeatherUI = (desc, isDay) => {
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

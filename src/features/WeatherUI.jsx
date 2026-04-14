// const getWeatherUI = (desc, isDay) => {
      //   const weather = desc.toLowerCase();

      //   const isMatch = (keywords) => keywords.some((k) => weather.includes(k));

      //   const dayNight = (dayClasses, nightClasses) =>
      //     isDay ? dayClasses : nightClasses;

      //   const getGradientDirection = (() =>
      //     direction === "ltr" ? "bg-gradient-to-br" : "bg-gradient-to-bl")();

      //   // 🔥 Weather Conditions Map (FULL COVERAGE)
      //   const conditions = [
      //     // ☀️ Clear / Sunny
      //     {
      //       match: ["sunny", "clear", "مشمس", "صافي"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-amber-400 via-orange-400 to-yellow-500`,
      //           `${getGradientDirection} from-slate-900 via-indigo-950 to-black`,
      //         ),
      //         glow: dayNight("bg-yellow-300/30", "bg-indigo-500/30"),
      //       },
      //     },

      //     // ⛅ Partly Cloudy
      //     {
      //       match: ["partly cloudy", "غائم جزئياً"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-sky-400 via-blue-400 to-yellow-300`,
      //           `${getGradientDirection} from-slate-800 via-gray-800 to-slate-900`,
      //         ),
      //         glow: dayNight("bg-yellow-300/25", "bg-gray-400/25"),
      //       },
      //     },

      //     // ☁️ Cloudy / Overcast
      //     {
      //       match: ["cloudy", "overcast", "غائم", "غائم كليًا"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-gray-400 to-gray-600`,
      //           `${getGradientDirection} from-gray-800 to-gray-950`,
      //         ),
      //         glow: dayNight("bg-gray-300/25", "bg-gray-500/25"),
      //       },
      //     },

      //     // 🌫 Fog / Mist / Haze
      //     {
      //       match: [
      //         "mist",
      //         "fog",
      //         "freezing fog",
      //         "haze",
      //         "شبورة",
      //         "ضباب",
      //         "ضباب متجمد",
      //         "غشاوة",
      //       ],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-gray-300 to-gray-400`,
      //           `${getGradientDirection} from-gray-700 to-gray-900`,
      //         ),
      //         glow: dayNight("bg-gray-200/40", "bg-gray-400/25"),
      //       },
      //     },

      //     // 🌧 Rain (ALL TYPES)
      //     {
      //       match: [
      //         "rain",
      //         "drizzle",
      //         "shower",
      //         "patchy rain",
      //         "light rain",
      //         "moderate rain",
      //         "heavy rain",
      //         "زخات",
      //         "رذاذ",
      //         "أمطار",
      //         "امطار",
      //         "خفيفة",
      //         "متوسطة",
      //         "غزيرة",
      //       ],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-blue-500 via-blue-600 to-indigo-700`,
      //           `${getGradientDirection} from-slate-900 via-blue-950 to-black`,
      //         ),
      //         glow: dayNight("bg-blue-300/25", "bg-blue-500/25"),
      //       },
      //     },

      //     // ⛈ Thunderstorms
      //     {
      //       match: ["thunder", "storm", "رعد", "عاصفة رعدية"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-gray-600 via-purple-700 to-gray-800`,
      //           `${getGradientDirection} from-black via-purple-950 to-slate-950`,
      //         ),
      //         glow: dayNight("bg-purple-400/25", "bg-purple-600/25"),
      //       },
      //     },

      //     // ❄️ Snow
      //     {
      //       match: ["snow", "blizzard", "ثلوج", "ثلج", "عاصفة ثلجية"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-slate-300 via-gray-300 to-slate-400`,
      //           `${getGradientDirection} from-gray-600 to-gray-900`,
      //         ),
      //         glow: dayNight("bg-white/40", "bg-gray-400/25"),
      //       },
      //     },

      //     // 🧊 Ice / Freezing
      //     {
      //       match: ["ice", "freezing rain", "ice pellets", "جليد", "متجمدة"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-cyan-300 via-blue-300 to-slate-400`,
      //           `${getGradientDirection} from-slate-700 via-blue-900 to-black`,
      //         ),
      //         glow: dayNight("bg-cyan-200/40", "bg-blue-400/25"),
      //       },
      //     },

      //     // 🌪 Wind / Dust / Sand
      //     {
      //       match: [
      //         "wind",
      //         "dust",
      //         "sand",
      //         "sandstorm",
      //         "dust storm",
      //         "blowing",
      //         "رياح",
      //         "رمال",
      //         "عاصفة ترابية",
      //         "عاصفة رملية",
      //         "غبار",
      //       ],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-amber-400 to-orange-500`,
      //           `${getGradientDirection} from-slate-800 to-gray-900`,
      //         ),
      //         glow: dayNight("bg-orange-300/25", "bg-orange-500/25"),
      //       },
      //     },
      //   ];

      //   // 🔍 Find Match
      //   for (const condition of conditions) {
      //     if (isMatch(condition.match)) {
      //       return condition.ui;
      //     }
      //   }

      //   // 🌈 Default
      //   return {
      //     bg: dayNight(
      //       `${getGradientDirection} from-sky-500 via-blue-500 to-indigo-600`,
      //       `${getGradientDirection} from-slate-900 via-indigo-950 to-black`,
      //     ),
      //     glow: dayNight("bg-blue-300/25", "bg-indigo-500/25"),
      //   };
      // };

      
      // const getWeatherUI = (desc, isDay) => {
      //   const weather = desc.toLowerCase();

      //   const isMatch = (keywords) => keywords.some((k) => weather.includes(k));

      //   const dayNight = (dayClasses, nightClasses) =>
      //     isDay ? dayClasses : nightClasses;

      //   const getGradientDirection =
      //     direction === "ltr" ? "bg-gradient-to-br" : "bg-gradient-to-bl";

      //   // 🔥 Weather Conditions Map (LIGHT MODE - ENHANCED)
      //   const conditions = [
      //     // ☀️ Clear / Sunny
      //     {
      //       match: ["sunny", "clear", "مشمس", "صافي"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-amber-400 via-orange-400 to-yellow-500`,
      //           `${getGradientDirection} from-indigo-300 via-purple-300 to-slate-400`,
      //         ),
      //         glow: dayNight("bg-yellow-500/30", "bg-indigo-400/30"),
      //       },
      //     },

      //     // ⛅ Partly Cloudy
      //     {
      //       match: ["partly cloudy", "غائم جزئياً"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-sky-400 via-blue-400 to-yellow-300`,
      //           `${getGradientDirection} from-slate-300 via-gray-300 to-slate-400`,
      //         ),
      //         glow: dayNight("bg-yellow-400/30", "bg-gray-400/30"),
      //       },
      //     },

      //     // ☁️ Cloudy / Overcast
      //     {
      //       match: ["cloudy", "overcast", "غائم", "غائم كليًا"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-gray-400 to-gray-600`,
      //           `${getGradientDirection} from-gray-300 to-gray-500`,
      //         ),
      //         glow: dayNight("bg-gray-500/30", "bg-gray-400/30"),
      //       },
      //     },

      //     // 🌫 Fog / Mist / Haze
      //     {
      //       match: [
      //         "mist",
      //         "fog",
      //         "freezing fog",
      //         "haze",
      //         "شبورة",
      //         "ضباب",
      //         "ضباب متجمد",
      //         "غشاوة",
      //       ],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-gray-300 to-gray-400`,
      //           `${getGradientDirection} from-gray-200 to-gray-300`,
      //         ),
      //         glow: dayNight("bg-gray-400/30", "bg-gray-300/30"),
      //       },
      //     },

      //     // 🌧 Rain (ALL TYPES)
      //     {
      //       match: [
      //         "rain",
      //         "drizzle",
      //         "shower",
      //         "patchy rain",
      //         "light rain",
      //         "moderate rain",
      //         "heavy rain",
      //         "زخات",
      //         "رذاذ",
      //         "أمطار",
      //         "امطار",
      //         "خفيفة",
      //         "متوسطة",
      //         "غزيرة",
      //       ],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-blue-500 via-blue-600 to-indigo-600`,
      //           `${getGradientDirection} from-blue-300 via-blue-400 to-indigo-400`,
      //         ),
      //         glow: dayNight("bg-blue-500/30", "bg-blue-400/30"),
      //       },
      //     },

      //     // ⛈ Thunderstorms
      //     {
      //       match: ["thunder", "storm", "رعد", "عاصفة رعدية"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-gray-600 via-purple-600 to-gray-700`,
      //           `${getGradientDirection} from-gray-400 via-purple-300 to-gray-500`,
      //         ),
      //         glow: dayNight("bg-purple-500/30", "bg-purple-400/30"),
      //       },
      //     },

      //     // ❄️ Snow
      //     {
      //       match: ["snow", "blizzard", "ثلوج", "ثلج", "عاصفة ثلجية"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-slate-300 via-gray-300 to-slate-400`,
      //           `${getGradientDirection} from-gray-200 to-gray-300`,
      //         ),
      //         glow: dayNight("bg-white/60", "bg-gray-400/30"),
      //       },
      //     },

      //     // 🧊 Ice / Freezing
      //     {
      //       match: ["ice", "freezing rain", "ice pellets", "جليد", "متجمدة"],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-cyan-300 via-blue-300 to-slate-400`,
      //           `${getGradientDirection} from-cyan-200 via-blue-200 to-gray-300`,
      //         ),
      //         glow: dayNight("bg-cyan-300/40", "bg-blue-400/30"),
      //       },
      //     },

      //     // 🌪 Wind / Dust / Sand
      //     {
      //       match: [
      //         "wind",
      //         "dust",
      //         "sand",
      //         "sandstorm",
      //         "dust storm",
      //         "blowing",
      //         "رياح",
      //         "رمال",
      //         "عاصفة ترابية",
      //         "عاصفة رملية",
      //         "غبار",
      //       ],
      //       ui: {
      //         bg: dayNight(
      //           `${getGradientDirection} from-amber-400 to-orange-500`,
      //           `${getGradientDirection} from-gray-300 to-amber-300`,
      //         ),
      //         glow: dayNight("bg-orange-400/30", "bg-orange-300/30"),
      //       },
      //     },
      //   ];

      //   // 🔍 Find Match
      //   for (const condition of conditions) {
      //     if (isMatch(condition.match)) {
      //       return condition.ui;
      //     }
      //   }

      //   // 🌈 Default
      //   return {
      //     bg: dayNight(
      //       `${getGradientDirection} from-sky-400 via-blue-500 to-indigo-500`,
      //       `${getGradientDirection} from-slate-300 via-indigo-300 to-slate-400`,
      //     ),
      //     glow: dayNight("bg-blue-500/30", "bg-indigo-400/30"),
      //   };
      // };

export const getWeatherUI = (desc, isDay, direction) => {
  const weather = desc.toLowerCase();

  const isMatch = (keywords) => keywords.some((k) => weather.includes(k));

  const dayNight = (dayClasses, nightClasses) =>
    isDay ? dayClasses : nightClasses;

  const getGradientDirection =
    direction === "ltr" ? "bg-gradient-to-br" : "bg-gradient-to-bl";

  const conditions = [
    // ☀️ Sunny
    {
      match: ["sunny", "clear", "مشمس", "صافي"],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-amber-400 via-orange-400 to-yellow-500`,
          `${getGradientDirection} from-slate-800 via-indigo-900 to-slate-950`,
        ),
        glow: dayNight("bg-yellow-300/30", "bg-indigo-400/30"),
      },
    },

    // ⛅ Partly Cloudy
    {
      match: ["partly cloudy", "غائم جزئياً"],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-sky-400 via-blue-400 to-yellow-300`,
          `${getGradientDirection} from-slate-700 via-gray-700 to-slate-800`,
        ),
        glow: dayNight("bg-yellow-300/25", "bg-gray-400/30"),
      },
    },

    // ☁️ Cloudy
    {
      match: ["cloudy", "overcast", "غائم", "غائم كليًا"],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-gray-400 to-gray-600`,
          `${getGradientDirection} from-gray-700 to-gray-900`,
        ),
        glow: dayNight("bg-gray-300/25", "bg-gray-400/30"),
      },
    },

    // 🌫 Fog
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
          `${getGradientDirection} from-gray-600 to-gray-800`,
        ),
        glow: dayNight("bg-gray-200/40", "bg-gray-400/30"),
      },
    },

    // 🌧 Rain
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
      ],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-blue-500 via-blue-600 to-indigo-700`,
          `${getGradientDirection} from-slate-800 via-blue-900 to-slate-950`,
        ),
        glow: dayNight("bg-blue-300/25", "bg-blue-400/30"),
      },
    },

    // ⛈ Thunder
    {
      match: ["thunder", "storm", "رعد", "عاصفة رعدية"],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-gray-600 via-purple-700 to-gray-800`,
          `${getGradientDirection} from-slate-900 via-purple-900 to-slate-950`,
        ),
        glow: dayNight("bg-purple-400/25", "bg-purple-500/30"),
      },
    },

    // ❄️ Snow
    {
      match: ["snow", "blizzard", "ثلوج", "ثلج"],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-slate-300 via-gray-300 to-slate-400`,
          `${getGradientDirection} from-gray-600 to-gray-800`,
        ),
        glow: dayNight("bg-white/40", "bg-gray-400/30"),
      },
    },

    // 🧊 Ice
    {
      match: ["ice", "freezing rain", "جليد"],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-cyan-300 via-blue-300 to-slate-400`,
          `${getGradientDirection} from-slate-700 via-blue-800 to-slate-900`,
        ),
        glow: dayNight("bg-cyan-200/40", "bg-blue-400/30"),
      },
    },

    // 🌪 Dust
    {
      match: ["wind", "dust", "sand", "رياح", "رمال", "غبار"],
      ui: {
        bg: dayNight(
          `${getGradientDirection} from-amber-400 to-orange-500`,
          `${getGradientDirection} from-slate-700 to-gray-800`,
        ),
        glow: dayNight("bg-orange-300/25", "bg-orange-400/30"),
      },
    },
  ];

  for (const condition of conditions) {
    if (isMatch(condition.match)) {
      return condition.ui;
    }
  }

  return {
    bg: dayNight(
      `${getGradientDirection} from-sky-500 via-blue-500 to-indigo-600`,
      `${getGradientDirection} from-slate-800 via-indigo-900 to-slate-950`,
    ),
    glow: dayNight("bg-blue-300/25", "bg-indigo-400/30"),
  };
};

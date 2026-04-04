import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../features/WeatherDetials";

export default function Home() {
  const coords = useSelector((state) => state.city);
  const weather = useSelector((state) => state.weather);
  const weatherDispatch = useDispatch();
  const iconRef = useRef(null);
  const dayForecastHeight = useRef(null);
  const placeRef = useRef(null);
  const screenRef = useRef(null);
  const layoutRef = useRef(null);
  const [iconSize, setIconSize] = useState({ width: 0, height: 0 });
  const [showPlace, setShowPlace] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [daysForecastHeight, setDaysForecastHeight] = useState(0);
  const isXL = window.matchMedia("(min-width: 1280px)").matches;
  const isSm = window.matchMedia("(max-width: 640px)").matches;
  const isShortScreen = window.matchMedia("(max-height: 700px)").matches;

  useEffect(() => {
    if (iconRef.current) {
      setIconSize({
        width: iconRef.current.offsetWidth,
        height: iconRef.current.offsetHeight,
      });
    }
  }, [weather]);

  const GAP = 12; // gap-3
  const PADDING = 8; // p-1 (4px => top + 4px => bottom)

  const calcHeightByItems = (itemHeight, numberOfItems) => {
    if (!itemHeight || numberOfItems <= 0) return 0;

    return numberOfItems * itemHeight + (numberOfItems - 1) * GAP + PADDING;
  };

  const calcHeight = (numberOfItems) => {
    const el = layoutRef.current;
    if (!el || !dayForecastHeight.current) return 0;

    // temporarily unlock maxHeight
    const prevMaxHeight = el.style.maxHeight;
    el.style.maxHeight = "none";

    const itemHeight = dayForecastHeight.current.clientHeight;

    const finalHeight = calcHeightByItems(itemHeight, numberOfItems);

    // Return the old value
    el.style.maxHeight = prevMaxHeight;

    return finalHeight;
  };

  useEffect(() => {
    const handleResize = () => {
      const value = calcHeight(3);
      if (value) setDaysForecastHeight(value);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  const calcDynamicHeight = () => {
    const el = layoutRef.current;
    if (!el || !dayForecastHeight.current) return 0;

    // temporarily unlock maxHeight
    const prevMaxHeight = el.style.maxHeight;
    el.style.maxHeight = "none";

    const containerHeight = el.clientHeight;
    const itemHeight = dayForecastHeight.current.clientHeight;

    const availableHeight = containerHeight - PADDING;
    const itemFullHeight = itemHeight + GAP;

    const numberOfItems = Math.floor((availableHeight + GAP) / itemFullHeight);

    const finalHeight = calcHeightByItems(itemHeight, numberOfItems);

    // Return the old value
    el.style.maxHeight = prevMaxHeight;

    return finalHeight;
  };

  useEffect(() => {
    const handleResize = () => {
      const value = calcDynamicHeight();
      if (value) setMaxHeight(value);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  // Fetch Current Temperature
  useEffect(() => {
    const request = weatherDispatch(fetchWeather());

    return () => request.abort();
    // eslint-disable-next-line
  }, [coords]);

  useEffect(() => {
    if (!screenRef.current || !placeRef.current) return;

    const ratio = placeRef.current.offsetWidth / screenRef.current.offsetWidth;

    setShowPlace(ratio < 0.82);
  }, [weather]);

  return (
    <>
      <div className="flex flex-col gap-4 text-[var(--foreground)]">
        <div className="flex flex-col xl:flex-row justify-between gap-y-6 pb-6 xl:pb-0 pe-4 sm:pe-8 min-h-screen xl:h-screen">
          <div
            className={`shrink-0 grow-0 ${isShortScreen && isSm ? "h-[650px]" : "h-screen"} pt-10 sm:pt-28 pb-8 w-full xl:w-[67%] animate-in fade-in zoom-in duration-600`}
          >
            <div
              className={`flex flex-row justify-between gap-4 w-full h-full p-4 pt-10 sm:p-10 overflow-hidden rounded-4xl ${weather.WeatherUI.bg}`}
            >
              {/* ----------- Mobile ----------- */}
              <div
                className="flex sm:hidden flex-col items-center justify-center px-2 w-full overflow-hidden"
                ref={screenRef}
              >
                <div className="flex flex-col items-center grow justify-center gap-1">
                  <div className="flex flex-row gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin-icon lucide-map-pin animate-bounce text-white/70"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <h4 className="text-3xl font-bold w-fit">{weather.city}</h4>
                  </div>
                  {showPlace ? (
                    <p
                      className="text-white/60 font-semibold text-center text-base"
                      ref={placeRef}
                    >
                      {weather.placeAddress}
                    </p>
                  ) : (
                    <div className="flex flex-col mb-4">
                      <p
                        className="text-white/60 font-semibold text-center text-base"
                        ref={placeRef}
                      >
                        {weather.placeAddress.split(/,\s|،\s/)[0]}
                      </p>
                      <p
                        className="text-white/60 font-semibold text-center text-base"
                        ref={placeRef}
                      >
                        {weather.placeAddress.split(/,\s|،\s/)[1]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center relative grow w-full mt-1 mb-4">
                  <div
                    className={`absolute ${weather.WeatherUI.glow} rounded-full animate-pulse blur-[18px]`}
                    style={{
                      width: iconSize.width,
                      height: iconSize.height,
                      top: 0,
                      right: 0,
                    }}
                  ></div>
                  {weather.icon && (
                    <img
                      src={`${weather.icon}`}
                      alt="Weather State"
                      ref={iconRef}
                      className="h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col items-center justify-start gap-5 grow">
                  <p
                    className={`font-bold capitalize text-center ${weather.desc.split(" ").length < 3 ? "text-2xl" : weather.desc.split(" ").length < 4 ? "text-xl" : "text-base"}`}
                  >
                    {weather.desc}
                  </p>
                  <h2 className="text-[4rem] font-black leading-none my-2 drop-shadow-md">{`${weather.temp}°`}</h2>
                  <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-xs font-semibold capitalize shadow-md">
                    {`feels like: ${weather.feelslike}°`}
                  </p>

                  <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-xs font-semibold shadow-md">
                    {weather.date}
                  </p>

                  <div className="flex flex-row gap-6 w-fit">
                    <div className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-md">
                      <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up text-white w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
                          aria-hidden="true"
                        >
                          <path d="m5 12 7-7 7 7"></path>
                          <path d="M12 19V5"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[8px] md:text-[10px] uppercase font-bold opacity-60">
                          High
                        </span>
                        <span className="text-base md:text-lg font-bold">{`${weather.days_detials[0].max_temp}°`}</span>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-md">
                      <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-down text-white w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14"></path>
                          <path d="m19 12-7 7-7-7"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[8px] md:text-[10px] uppercase font-bold opacity-60">
                          Low
                        </span>
                        <span className="text-base md:text-lg font-bold">{`${weather.days_detials[0].min_temp}°`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------- END ----------- */}

              {/* ----------- Large Screen ----------- */}
              <div className="hidden sm:flex flex-row gap-1 justify-between flex-grow">
                <div className="flex flex-col justify-center gap-6 grow max-w-[60%] overflow-hidden animate-in delay-200 slide-in-from-left duration-400">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-3 group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin-icon lucide-map-pin group-hover:animate-bounce text-white/60 transition duration-100 group-hover:text-white/70"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <h4 className="text-5xl font-bold w-fit">
                        {weather.city}
                      </h4>
                    </div>
                    <p className="text-white/60 font-semibold text-lg">
                      {weather.placeAddress}
                    </p>
                  </div>

                  <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-sm font-semibold transition-all hover:bg-white/17">
                    {weather.date}
                  </p>

                  <div className="flex flex-row gap-6 w-fit">
                    <div className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/17">
                      <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up text-white"
                          aria-hidden="true"
                        >
                          <path d="m5 12 7-7 7 7"></path>
                          <path d="M12 19V5"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase font-bold opacity-60">
                          High
                        </span>
                        <span className="text-lg font-bold">{`${weather.days_detials[0].max_temp}°`}</span>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/17">
                      <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-down text-white"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14"></path>
                          <path d="m19 12-7 7-7-7"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase font-bold opacity-60">
                          Low
                        </span>
                        <span className="text-lg font-bold">{`${weather.days_detials[0].min_temp}°`}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 grow max-w-[40%] animate-in delay-200 slide-in-from-right duration-400">
                  <div className="flex justify-end flex-grow relative group h-[40%]">
                    <div
                      className={`absolute ${weather.WeatherUI.glow} rounded-full animate-pulse blur-[38px] group-hover:blur-[30px] `}
                      style={{
                        width: iconSize.width * 1.15,
                        height: iconSize.height * 1.15,
                        top: -iconSize.height * 0.075,
                        right: -iconSize.width * 0.075,
                      }}
                    ></div>
                    {weather.icon && (
                      <img
                        src={`${weather.icon}`}
                        alt="Weather State"
                        ref={iconRef}
                        className="h-full object-cover transition duration-300 rotate-0 group-hover:rotate-10"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between items-end h-[60%] shrink-0">
                    <p
                      className={`font-bold capitalize ${weather.desc.split(" ").length > 2 ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl"}`}
                    >
                      {weather.desc}
                    </p>
                    <h2 className="text-[7rem] lg:text-[8rem] font-black leading-none my-2 drop-shadow-md">{`${weather.temp}°`}</h2>
                    <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-sm lg:text-base font-semibold capitalize hover:bg-white/17">
                      {`feels like: ${weather.feelslike}°`}
                    </p>
                  </div>
                </div>
              </div>
              {/* ----------- END ----------- */}
            </div>
          </div>
          <div className="w-full h-fit xl:h-full xl:w-[29%] shrink-0 grow-0 overflow-hidden p-2 xl:pt-28 xl:pb-8 animate-in delay-200 animate-in fade-in zoom-in duration-800">
            <div
              className="w-full max-h-full flex flex-col gap-3 pb-4 px-6 rounded-4xl overflow-hidden"
              style={{
                boxShadow:
                  "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
              }}
            >
              <div
                className="flex flex-row items-center gap-2 px-3 py-6 shadow-md shadow-border shrink-0"
                style={{
                  boxShadow:
                    "0 5px 6px -4px color-mix(in srgb, var(--primary) 15%, transparent)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-range text-muted-foreground"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M3 10h18" />
                  <path d="M8 2v4" />
                  <path d="M17 14h-6" />
                  <path d="M13 18H7" />
                  <path d="M7 14h.01" />
                  <path d="M17 18h.01" />
                </svg>

                <h2 className="text-lg font-bold">{`${weather.days_detials.length}-Day Forecast`}</h2>
              </div>

              <div
                className="flex flex-col gap-3 grow hide-scrollbar overflow-auto p-1 min-h-0"
                ref={layoutRef}
                style={{
                  maxHeight: !isXL
                    ? `${daysForecastHeight}px`
                    : `${maxHeight}px`,
                }}
              >
                {weather.days_detials.map((day, index) => (
                  <div
                    key={index}
                    ref={dayForecastHeight}
                    className="grid grid-cols-[1fr_1fr_1.7fr] sm:grid-cols-3 xl:grid-cols-[1fr_1fr_1.7fr] justify-between items-center py-3 px-4 shadow-xs shadow-border rounded-3xl transition hover:bg-muted/50"
                  >
                    <h2 className="block sm:hidden xl:block text-base font-semibold leading-none">
                      {day.dayName?.slice(0, 3)}
                    </h2>

                    <h2 className="hidden sm:block xl:hidden text-base font-semibold leading-none">
                      {day.dayName}
                    </h2>

                    <div className="flex justify-center">
                      <img src={day.icon} alt="icon" className="h-full" />
                    </div>

                    <div className="flex flex-row justify-end gap-4 sm:gap-5 xl:gap-4 text-base">
                      <h2 className="font-bold text-foreground">
                        {`${day.max_temp}°`}
                      </h2>

                      <h2 className="font-bold text-muted-foreground">
                        {`${day.min_temp}°`}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

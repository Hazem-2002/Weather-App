import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../features/WeatherDetials";

export default function Home() {
  const coords = useSelector((state) => state.city);
  const weather = useSelector((state) => state.weather);
  const weatherDispatch = useDispatch();
  const iconRef = useRef(null);

  const [iconSize, setIconSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (iconRef.current) {
      setIconSize({
        width: iconRef.current.getBoundingClientRect().width,
        height: iconRef.current.getBoundingClientRect().height,
      });
    }
  }, [weather]);

  // Fetch Current Temperature
  useEffect(() => {
    const request = weatherDispatch(fetchWeather());

    return () => request.abort();
    // eslint-disable-next-line
  }, [coords]);

  return (
    <>
      <div className="flex flex-col gap-4 text-[var(--foreground)]">
        <div className="flex flex-row gap-12 pt-28 pb-8 pe-8 h-screen">
          <div
            className={`flex flex-row justify-between gap-4 flex-grow p-10 overflow-hidden rounded-4xl animate-in fade-in zoom-in duration-600 ${weather.WeatherUI.bg}`}
          >
            <div className="flex flex-row gap-1 justify-between flex-grow">
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
                    <h4 className="text-5xl font-bold">{weather.city}</h4>
                  </div>
                  <p className="text-white/60 font-semibold text-lg">
                    {weather.placeAddress}
                  </p>
                </div>

                <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-sm font-semibold transition-all hover:bg-white/15">
                  {weather.date}
                </p>

                <div className="flex flex-row gap-6 w-fit">
                  <div className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/15">
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
                      <span className="text-lg font-bold">{`${weather.max_temp}°`}</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/15">
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
                      <span className="text-lg font-bold">{`${weather.min_temp}°`}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 grow max-w-[40%] animate-in delay-200 slide-in-from-right duration-400">
                <div className="flex justify-end flex-grow relative group h-[40%]">
                  <div
                    className={`absolute ${weather.WeatherUI.glow} rounded-full animate-pulse blur-[70px] group-hover:blur-[60px] `}
                    style={{
                      width: iconSize.width * 1.15,
                      height: iconSize.height * 1.15,
                      top: -iconSize.height * 0.075,
                      right: -iconSize.width * 0.075,
                    }}
                  ></div>
                  {weather.icon && (
                    <img
                      src={weather.icon}
                      alt="Weather State"
                      ref={iconRef}
                      className="h-full object-cover transition duration-500 rotate-0 group-hover:rotate-10"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between items-end h-[60%] shrink-0">
                  <p
                    className={`font-bold capitalize ${weather.desc.split(" ").length > 2 ? "text-2xl" : "text-3xl"}`}
                  >
                    {weather.desc}
                  </p>
                  <h2 className="text-[8rem] font-black leading-none my-2 drop-shadow-md">{`${weather.temp}°`}</h2>
                  <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-base font-semibold capitalize hover:bg-white/15">
                    {`feels like: ${weather.feelslike}°`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[295px] shrink-0"></div>
        </div>
      </div>
    </>
  );
}

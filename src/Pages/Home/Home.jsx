import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../../features/WeatherDetials";
import DaysForecast from "./Components/DaysForecast";
import WeatherOverview from "./Components/WeatherOverview";
import HourlyForecast from "./Components/HourlyForecast";
import CurrentDetials from "./Components/CurrentDetials";

export default function Home() {
  const coords = useSelector((state) => state.city);
  const weather = useSelector((state) => state.weather);
  const weatherDispatch = useDispatch();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const isSm = window.matchMedia("(max-width: 640px)").matches;
  const isShortScreen = window.matchMedia("(max-height: 700px)").matches;

  // Fetch Current Temperature
  useEffect(() => {
    const request = weatherDispatch(fetchWeather());

    return () => request.abort();
    // eslint-disable-next-line
  }, [coords]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex flex-col gap-16 text-[var(--foreground)] pe-4 sm:pe-8 overflow-hidden"
      key={weather.city}
    >
      <main className="flex flex-col xl:flex-row justify-between gap-y-6 pb-6 xl:pb-0 min-h-screen xl:h-screen shrink-0">
        <div
          className={`shrink-0 grow-0 ${isShortScreen && isSm ? "h-[650px]" : windowHeight < 535 || window.matchMedia("(max-height: 525px)").matches ? "h-[580px]" : "h-screen"} pt-10 sm:pt-28 pb-8 w-full xl:w-[67%] animate-in fade-in zoom-in animate-duration-1000`}
        >
          <WeatherOverview />
        </div>
        <div className="w-full h-fit xl:h-full xl:w-[29%] shrink-0 grow-0 overflow-hidden p-2 xl:pt-28 xl:pb-8">
          <DaysForecast />
        </div>
      </main>
      <section className="-mt-8 px-4 max-w-full overflow-hidden">
        <HourlyForecast />
      </section>
      <section className="mb-8">
        <CurrentDetials />
      </section>
    </div>
  );
}

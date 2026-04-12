import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DaysForecast from "./Components/DaysForecast";
import WeatherOverview from "./Components/WeatherOverview";
import HourlyForecast from "./Components/HourlyForecast";
import CurrentDetials from "./Components/CurrentDetails";
import Astronomy from "./Components/Astronomy";

export default function Home() {
  const weather = useSelector((state) => state.weather);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const isSm = window.matchMedia("(max-width: 640px)").matches;
  const isShortScreen = window.matchMedia("(max-height: 700px)").matches;

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
          className={`shrink-0 grow-0 ${isShortScreen && isSm ? "h-[650px]" : windowHeight < 535 || window.matchMedia("(max-height: 525px)").matches ? "h-[600px]" : "h-screen"} pt-10 sm:pt-28 pb-8 w-full xl:w-[67%] animate-in fade-in zoom-in animate-duration-500`}
        >
          <WeatherOverview />
        </div>
        <div className="w-full h-fit xl:h-full xl:w-[29%] shrink-0 grow-0 overflow-hidden p-2 xl:pt-28 xl:pb-8">
          <DaysForecast />
        </div>
      </main>
      <section className="-mt-8">
        <HourlyForecast Home="1" />
      </section>
      <section>
        <CurrentDetials />
      </section>
      <section>
        <Astronomy Home="1" />
      </section>
    </div>
  );
}

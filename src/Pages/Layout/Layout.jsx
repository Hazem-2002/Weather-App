import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../features/WeatherDetials";
import { useEffect } from "react";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

export default function Layout() {
  const coords = useSelector((state) => state.city);
  const weatherDispatch = useDispatch();

  // Fetch Current && Forecast Weather
  useEffect(() => {
    const request = weatherDispatch(fetchWeather());
    return () => request.abort();
    // eslint-disable-next-line
  }, [coords]);

  return (
    <div className="select-non">
      <Navbar />
      <div className="flex flex-row gap-4 sm:gap-8 bg-background">
        <div className="w-0 md:w-22 lg:w-64 h-0 md:h-full lg:w-64 flex-shrink-0 bg-green-500">
          <Sidebar />
        </div>
        <div className="flex-grow min-h-screen bg-background pb-15 md:pb-0 max-w-screen overflow-hidden">
          <Outlet />
          {/* Footer */}
          <div className="ms-2 me-6 sm:me-10 mt-12 mb-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

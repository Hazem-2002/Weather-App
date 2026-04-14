import React from "react";
import HistoryCards from "./Components/historyCards";
import { useState, useEffect } from "react";
import DatePicker from "./Components/DatePicker";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { fetchHistory } from "../../features/HistorySlice";
import { useSelector, useDispatch } from "react-redux";
import HourlyForecast from "../Home/Components/HourlyForecast";
import Astronomy from "../Home/Components/Astronomy";
import { useTranslation } from "react-i18next";

function History() {
  const weather = useSelector((state) => state.weather);
  const history = useSelector((state) => state.history);
  const direction = useSelector((state) => state.language.direction);
  const { t, i18n } = useTranslation();
  const historyDispatch = useDispatch();

  // Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const currentDate = new Date(weather.currentDate);
    currentDate.setDate(currentDate.getDate() - 1);

    const dateString = formatDate(currentDate);
    historyDispatch(fetchHistory(dateString));
    // eslint-disable-next-line
  }, [weather.city]);

  useEffect(() => {
    i18n.changeLanguage(direction === "ltr" ? "en" : "ar");
  }, [i18n, direction]);

  return (
    <div className="flex flex-col gap-12 pt-26 pe-4 sm:pt-32 sm:pe-8">
      {/* Title && History Cards */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-3 items-center">
          <div className="flex justify-center items-center size-10 rounded-2xl transition bg-muted hover:bg-muted/80">
            <IconButton onClick={handleClick}>
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
                className="lucide lucide-calendar-days-icon lucide-calendar-days text-primary/90"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              disableScrollLock
              anchorOrigin={{
                vertical: "bottom",
                horizontal: direction === "ltr" ? "left" : "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: direction === "ltr" ? "left" : "right",
              }}
              slotProps={{
                paper: {
                  sx: {
                    marginTop: "15px",
                    backgroundColor: "transparent",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 0 14px rgb(var(--primary-rgb)/.3)",
                  },
                },
              }}
            >
              <DatePicker />
            </Popover>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 capitalize">
              {t("Weather_History")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
              {t("Select_a_day_to_view_weather_details")}
            </p>
          </div>
        </div>
        <HistoryCards />
      </div>

      {history.temp ? (
        <div
          className="flex flex-col gap-6 sm:gap-8 animate-in fade-in zoom-in animate-duration-500"
          key={history.date}
        >
          {/* Date && City */}
          {history.fullDate && (
            <div className="flex flex-col ms-2">
              <h2 className="text-lg sm:text-xl text-foreground/90 font-bold">
                {history.fullDate}
              </h2>
              <div className="flex gap-2 items-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin-icon lucide-map-pin animate-bounce"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-sm sm:text-base font-semibold">
                  {history.address}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col xl:flex-row gap-8 p-2 overflow-hidden">
            {/* Weather Overview */}
            <div
              className="flex flex-col w-full xl:w-[34%] rounded-2xl shrink-0 overflow-hidden"
              style={{
                boxShadow: "0 0 4px rgb(var(--primary-rgb)/0.5)",
              }}
            >
              {/* Title => "Detials" */}
              <div
                className="flex flex-row px-6 py-8 items-center gap-2 text-foreground/85"
                style={{
                  boxShadow: "0 0 4px rgb(var(--primary-rgb)/0.5)",
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
                  className="lucide lucide-calendar-icon lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                <p className="text-xl font-semibold ">{t("Detials")}</p>
              </div>

              <div className="px-8">
                <div className="flex flex-col">
                  {/* Temperature && Icon */}
                  <div className="flex flex-row justify-between sm:justify-around xl:justify-between items-stretch py-10">
                    {/* Temperature */}
                    <div className="flex flex-col items-start sm:items-center xl:items-start w-[126px]">
                      <h2 className="text-5xl font-bold text-foreground/90 w-fit">
                        {history.temp}
                      </h2>
                      <p className="font-semibold text-muted-foreground/90 w-fit">
                        {history.desc}
                      </p>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-end sm:justify-center xl:justify-end w-[126px]">
                      <img src={history.icon} alt="icon" className="h-full" />
                    </div>
                  </div>

                  <hr className="shadow shadow-primary/40 border-primary/22" />

                  {/* Min && Max Temperature */}
                  <div className="flex justify-start sm:justify-around xl:justify-start items-center py-7">
                    {/* Max Temperature */}
                    <div className="flex flex-col gap-1 grow-2 sm:grow-0 xl:grow-2 w-fit sm:w-[126px] xl:w-fit items-start sm:items-center xl:items-start">
                      <p className="text-xs text-foreground/55 uppercase w-fit">
                        {t("max_temp")}
                      </p>
                      <p className="text-xl font-semibold text-orange-500 w-fit">
                        {history.maxtemp_c}
                      </p>
                    </div>

                    {/* Min Temperature */}
                    <div className="flex flex-col gap-1 grow-1 sm:grow-0 xl:grow-1 w-fit sm:w-[126px] xl:w-fit items-start sm:items-center xl:items-start">
                      <p className="text-xs text-foreground/55 uppercase w-fit">
                        {t("Min_temp")}
                      </p>
                      <p className="text-xl font-semibold text-blue-500 w-fit">
                        {history.mintemp_c}
                      </p>
                    </div>
                  </div>

                  <hr className="shadow shadow-primary/40 border-primary/22" />

                  {/* Other Detials e.g. [wind - humidity - rain - uv] */}
                  <div className="flex justify-between sm:justify-around xl:justify-between items-center py-6">
                    {/* Col 1 */}
                    <div className="flex flex-col gap-6 w-fit sm:w-[126px] xl:w-fit items-start sm:items-center xl:items-start">
                      {/* Wind Speed */}
                      <div className="flex flex-col gap-1 items-start sm:items-center xl:items-start">
                        <div className="flex flex-row items-center gap-2 text-foreground/50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-wind-icon lucide-wind"
                          >
                            <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                            <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                            <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
                          </svg>
                          <p className="text-xs uppercase w-fit">
                            {t("wind_speed")}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground/90">
                          {history.windSpeed}
                        </p>
                      </div>

                      {/* Chance of rain */}
                      <div className="flex flex-col gap-1 items-start sm:items-center xl:items-start">
                        <div className="flex flex-row items-center gap-2 text-foreground/50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-umbrella-icon lucide-umbrella"
                          >
                            <path d="M12 13v7a2 2 0 0 0 4 0" />
                            <path d="M12 2v2" />
                            <path d="M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z" />
                          </svg>
                          <p className="text-xs uppercase">
                            {t("chance_of_rain")}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground/90">
                          {history.daily_chance_of_rain}
                        </p>
                      </div>
                    </div>
                    {/* Col 1 */}

                    {/* Col 2 */}
                    <div className="flex flex-col gap-6 w-fit sm:w-[126px] xl:w-fit items-start sm:items-center xl:items-start">
                      {/* Avg Humidity */}
                      <div className="flex flex-col gap-1 items-start sm:items-center xl:items-start">
                        <div className="flex flex-row items-center gap-2 text-foreground/50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-droplets-icon lucide-droplets"
                          >
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
                          </svg>
                          <p className="text-xs uppercase w-fit">
                            {t("Avg_Humidity")}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground/90">
                          {history.avghumidity}
                        </p>
                      </div>

                      {/* UV Index */}
                      <div className="flex flex-col gap-1 items-start sm:items-center xl:items-start">
                        <div className="flex flex-row items-center gap-2 text-foreground/50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sun-icon lucide-sun"
                          >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" />
                            <path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" />
                            <path d="m19.07 4.93-1.41 1.41" />
                          </svg>
                          <p className="text-xs uppercase">{t("UV_Index")}</p>
                        </div>
                        <p className="font-semibold text-foreground/90">
                          {history.uv}
                        </p>
                      </div>
                    </div>
                    {/* Col 2 */}
                  </div>
                  {/* Other Detials e.g. [wind - humidity - rain - uv] */}
                </div>
              </div>
            </div>
            {/* Weather Overview */}

            <div className="flex flex-col gap-8 justify-between w-full xl:w-[66%]">
              <HourlyForecast Home="0" />
              <Astronomy Home="0" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 bg-muted/50 border border-muted/80 items-center justify-center p-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar-days-icon lucide-calendar-days text-primary/90"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
          </svg>
          <p className="text-lg text-foreground/80">
            No history data available for this location.
          </p>
        </div>
      )}
    </div>
  );
}

export default React.memo(History);

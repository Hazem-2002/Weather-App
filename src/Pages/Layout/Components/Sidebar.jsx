import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const direction = useSelector((state) => state.language.direction);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(direction === "ltr" ? "en" : "ar");
  }, [i18n, direction]);

  const navLinkStyle = ({ isActive }) =>
    `px-2.5 py-2 md:px-4 md:py-2 rounded-2xl font-semibold transition duration-200 ${
      isActive
        ? "text-primary-foreground bg-primary"
        : "text-foreground/70 hover:text-foreground hover:bg-muted/70 group"
    }`;

  return (
    <div
      className="fixed z-40 bottom-4 inset-x-0 flex justify-center md:justify-start md:top-0 md:bottom-0 md:w-fit md:shadow-lg shadow-[rgb(var(--primary-rgb)/0.2)]">
      <aside className="flex flex-col justify-between md:h-screen w-[55%] sm:w-[70%] md:w-22 lg:w-64 bg-background/40 border border-primary/20 md:border-0 text-foreground p-2 md:p-4 md:pt-28 md:pb-8 rounded-full md:rounded-none">
        <nav className="flex flex-row md:flex-col gap-3 justify-around md:justify-start">
          <NavLink to="/" className={navLinkStyle}>
            <div className="flex flex-row gap-2 py-0.5">
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
                className="lucide lucide-house-icon lucide-house group-hover:scale-110 transition duration-200"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span className="hidden lg:inline">{t("Home")}</span>
            </div>
          </NavLink>

          <NavLink to="history" className={navLinkStyle}>
            <div className="flex flex-row gap-2 py-0.5">
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
                className="lucide lucide-history-icon lucide-history group-hover:scale-110 transition duration-200"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
              <span className="hidden lg:inline">{t("History")}</span>
            </div>
          </NavLink>

          <NavLink to="settings" className={navLinkStyle}>
            <div className="flex flex-row gap-2 py-0.5">
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
                className="lucide lucide-settings-icon lucide-settings group-hover:scale-110 transition duration-200"
              >
                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="hidden lg:inline">{t("Settings")}</span>
            </div>
          </NavLink>
        </nav>

        <div className="hidden lg:inline-block bg-primary/5 p-4 rounded-3xl border border-primary/15">
          <div className="flex flex-col gap-6">
            <h4 className="text-xs uppercase text-muted-foreground font-bold">
              {t("weather_insights")}
            </h4>
            <div className="flex flex-col gap-2 text-foreground/80 text-xs font-bold ">
              <div className="flex flex-row gap-2 items-center">
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
                  className="lucide lucide-thermometer-icon lucide-thermometer text-orange-400"
                >
                  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                </svg>
                <p>
                  {t("Forecast_Accuracy")}
                  <span>{`${(95.5).toLocaleString(`${direction === "ltr" ? "en" : "ar"}-EG`)}%`}</span>
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
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
                  className="lucide lucide-cloud-drizzle-icon lucide-cloud-drizzle text-blue-400"
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M8 19v1" />
                  <path d="M8 14v1" />
                  <path d="M16 19v1" />
                  <path d="M16 14v1" />
                  <path d="M12 21v1" />
                  <path d="M12 16v1" />
                </svg>
                <p>{t("Real_time_Weather_Forecast")}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
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
                  className="lucide lucide-globe-icon lucide-globe text-blue-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <p>{t("Global_Weather_Data")}</p>
              </div>
              <hr className="border-t-primary/15" />
              <p className="text-muted-foreground">
                <span>{t("Data_by")}</span>{" "}
                <span className="text-foreground/90">WeatherAPI.com</span>
              </p>
              <p className="text-muted-foreground -mt-1.5">
                © 2026 <span className="text-foreground/90">Hazem Mahmoud</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

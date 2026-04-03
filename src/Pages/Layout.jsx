import { Outlet } from "react-router-dom";
import AutoCompleteComponent from "../AutoCompleteComponent";
import { NavLink } from "react-router-dom";

export default function Layout() {
  const navLinkStyle = ({ isActive }) =>
    `px-2.5 py-2 md:px-4 md:py-2 rounded-2xl font-semibold transition duration-200 ${
      isActive
        ? "text-primary-foreground bg-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/70 group"
    }`;

  return (
    <>
      <nav className="w-screen fixed top-0 z-50">
        <div className="flex flex-row justify-center w-full h-full relative pt-7 pb-6">
          <div className="flex justify-center items-center gap-2 absolute top-1/2 -translate-y-1/2 left-6 lg:left-8">
            <div className="size-10 flex justify-center items-center rounded-full bg-primary invisible md:visible">
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
                className="lucide lucide-cloud-sun w-6 h-6 text-primary-foreground"
                aria-label="Weatherly"
              >
                <path d="M12 2v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="M20 12h2"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path>
                <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path>
              </svg>
            </div>
            <h1 className="font-bold text-xl text-foreground hidden lg:block">
              Weatherly
            </h1>
          </div>
          <div className="w-[80vw] sm:w-[65vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw]">
            <AutoCompleteComponent />
          </div>
        </div>
      </nav>

      <div className="flex flex-row gap-8 bg-background">
        <div className="w-0 md:w-22 lg:w-64 h-0 md:h-full lg:w-64 flex-shrink-0">
          <aside className="flex flex-col justify-between md:h-screen w-[50%] sm:w-[70%] md:w-22 lg:w-64 bg-background/40 border border-primary/20 md:border-0 text-foreground p-2 md:p-4 md:pt-28 md:pb-8 rounded-full md:rounded-none fixed z-40 bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 md:top-0">
            <nav className="flex flex-row md:flex-col gap-5 justify-around md:justify-start">
              <NavLink to="/" className={navLinkStyle}>
                <div className="flex flex-row gap-2">
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
                  <span className="hidden lg:inline">Home</span>
                </div>
              </NavLink>

              <NavLink to="history" className={navLinkStyle}>
                <div className="flex flex-row gap-2">
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
                  <span className="hidden lg:inline">History</span>
                </div>
              </NavLink>

              <NavLink to="settings" className={navLinkStyle}>
                <div className="flex flex-row gap-2">
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
                  <span className="hidden lg:inline">Settings</span>
                </div>
              </NavLink>
            </nav>

            <div className="hidden lg:inline-block bg-primary/5 p-4 rounded-3xl border border-primary/15">
              <div className="flex flex-col gap-6">
                <h4 className="text-xs uppercase text-muted-foreground font-bold">
                  Weather Insights
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
                    <p>Forecast Accuracy: 95.5%</p>
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
                    <p>Real-time Weather Forecast</p>
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
                    <p>Global Weather Data</p>
                  </div>
                  <hr className="border-t-primary/15" />
                  <p className="text-muted-foreground">
                    Data by{" "}
                    <span className="text-foreground/90">WeatherAPI.com</span>
                  </p>
                  <p className="text-muted-foreground">
                    © 2026{" "}
                    <span className="text-foreground/90">Hazem Mahmoud</span>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex-grow min-h-screen bg-background pb-22 md:pb-0 max-w-screen overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
}

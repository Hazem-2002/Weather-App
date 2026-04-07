import { useSelector } from "react-redux";

export default function CurrentDetials() {
  const weather = useSelector((state) => state.weather);
  return (
    <>
      {weather?.current_detials?.wind_kph != null && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-3">
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
              className="lucide lucide-droplets-icon lucide-droplets"
            >
              <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
              <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
            </svg>
            <h2 className="text=lg font-semibold">Current Detials</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 grid-rows-[repeat(2,155px)] sm:grid-rows-[repeat(2,155px)] xl:grid-rows-[155px] gap-6 p-2">
            {/* Feels Like */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-white/6">
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
                  className="lucide lucide-thermometer-sun-icon lucide-thermometer-sun text-orange-400"
                >
                  <path d="M12 2v2" />
                  <path d="M12 8a4 4 0 0 0-1.645 7.647" />
                  <path d="M2 12h2" />
                  <path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m6.34 17.66-1.41 1.41" />
                </svg>
              </div>
              <h2 className="text-sm text-muted-foreground font-bold capitalize">
                Feels Like
              </h2>
              <p className="text-lg font-bold">
                {weather.current_detials.feelslike}
              </p>
            </div>

            {/* Wind */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-white/6">
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
                  className="lucide lucide-wind-icon lucide-wind text-blue-500"
                >
                  <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                  <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                  <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
                </svg>
              </div>
              <h2 className="text-sm text-muted-foreground font-bold capitalize">
                Wind
              </h2>
              <p className="text-lg font-bold">
                {weather.current_detials.wind_kph}
              </p>
            </div>

            {/* Humidity */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-white/6">
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
                  className="lucide lucide-droplets-icon lucide-droplets text-blue-400"
                >
                  <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                  <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
                </svg>
              </div>
              <h2 className="text-sm text-muted-foreground font-bold capitalize">
                Humidity
              </h2>
              <p className="text-lg font-bold">
                {weather.current_detials.humidity}
              </p>
            </div>

            {/* UV Index */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-white/6">
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
                  className="lucide lucide-sun-icon lucide-sun text-amber-400"
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
              </div>
              <h2 className="text-sm text-muted-foreground font-bold capitalize">
                UV Index
              </h2>
              <p className="text-lg font-bold">{weather.current_detials.uv}</p>
            </div>

            {/* Visibility */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-white/6">
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
                  className="lucide lucide-cloud-fog-icon lucide-cloud-fog text-cyan-400"
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M16 17H7" />
                  <path d="M17 21H9" />
                </svg>
              </div>
              <h2 className="text-sm text-muted-foreground font-bold capitalize">
                Visibility
              </h2>
              <p className="text-lg font-bold">
                {weather.current_detials.vis_km}
              </p>
            </div>

            {/* Pressure */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-white/6">
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
                  className="lucide lucide-gauge-icon lucide-gauge text-purple-500"
                >
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
              </div>
              <h2 className="text-sm text-muted-foreground font-bold capitalize">
                Pressure
              </h2>
              <p className="text-lg font-bold">
                {weather.current_detials.pressure_mb}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

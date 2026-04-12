import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Astronomy({ Home }) {
  const { t, i18n } = useTranslation();
  const direction = useSelector((state) => state.direction);
  const weather = useSelector((state) =>
    Home == 1 ? state.weather : state.history,
  );

  useEffect(() => {
    i18n.changeLanguage(direction === "ltr" ? "en" : "ar");
  }, [i18n, direction]);

  return (
    <>
      {weather?.astronomy?.sunrise != null && (
        <div className="flex flex-col gap-6 animate-in animate-delay-100 fade-in zoom-in animate-duration-1000">
          <div className="flex flex-row gap-3 text-foreground/90">
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
              className="lucide lucide-telescope-icon lucide-telescope"
            >
              <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
              <path d="m13.56 11.747 4.332-.924" />
              <path d="m16 21-3.105-6.21" />
              <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
              <path d="m6.158 8.633 1.114 4.456" />
              <path d="m8 21 3.105-6.21" />
              <circle cx="12" cy="13" r="2" />
            </svg>
            <h2 className="text=lg font-semibold">{t("Astronomy")}</h2>
          </div>
          <div
            className={`grid ${Home == 0 ? "grid-cols-2 sm:grid-cols-3 grid-rows-[repeat(3,140px)] sm:grid-rows-[repeat(2,140px)]" : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 grid-rows-[repeat(2,140px)] sm:grid-rows-[repeat(2,140px)] xl:grid-rows-[140px]"} gap-6 p-2 text-foreground/70`}
          >
            {/* Sunrise */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px rgb(var(--primary-rgb)/0.27)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-amber-500/10">
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
                  className="lucide lucide-sunrise-icon lucide-sunrise text-amber-500"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m8 6 4-4 4 4" />
                  <path d="M16 18a4 4 0 0 0-8 0" />
                </svg>
              </div>
              <h2 className="text-xs text-muted-foreground font-bold uppercase">
                {t("Sunrise")}
              </h2>
              <p className="text-sm font-bold text-foreground/80">{weather.astronomy.sunrise}</p>
            </div>
            {/* Sunset */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px rgb(var(--primary-rgb)/0.27)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-orange-500/10">
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
                  className="lucide lucide-sunset-icon lucide-sunset text-orange-500"
                >
                  <path d="M12 10V2" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m16 6-4 4-4-4" />
                  <path d="M16 18a4 4 0 0 0-8 0" />
                </svg>
              </div>
              <h2 className="text-xs text-muted-foreground font-bold uppercase">
                {t("Sunset")}
              </h2>
              <p className="text-sm font-bold text-foreground/80">{weather.astronomy.sunset}</p>
            </div>
            {/* Moonrise */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px rgb(var(--primary-rgb)/0.27)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-blue-500/10">
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
                  className="lucide lucide-moon-icon lucide-moon text-blue-300"
                >
                  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                </svg>
              </div>
              <h2 className="text-xs text-muted-foreground font-bold uppercase">
                {t("Moonrise")}
              </h2>
              <p className="text-sm font-bold text-foreground/80">{weather.astronomy.moonrise}</p>
            </div>
            {/* Moonset */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px rgb(var(--primary-rgb)/0.27)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-indigo-500/10">
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
                  className="lucide lucide-moon-icon lucide-moon rotate-180 text-indigo-400"
                >
                  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                </svg>
              </div>
              <h2 className="text-xs text-muted-foreground font-bold uppercase">
                {t("Moonset")}
              </h2>
              <p className="text-sm font-bold text-foreground/80">{weather.astronomy.moonset}</p>
            </div>
            {/* Moon Phase */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px rgb(var(--primary-rgb)/0.27)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-purple-500/10">
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
                  className="lucide lucide-orbit-icon lucide-orbit text-purple-400"
                >
                  <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
                  <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="19" r="2" />
                </svg>
              </div>
              <h2 className="text-xs text-muted-foreground font-bold uppercase">
                {t("Moon_phase")}
              </h2>
              <p className="text-sm font-bold text-center text-foreground/80">
                {t(`${weather.astronomy.moon_phase.replace(" ","_")}`)}
              </p>
            </div>
            {/* Moon Illumination */}
            <div
              className="flex flex-col items-center justify-center gap-2 bg-card/80 rounded-4xl p-4 transition duration-100 hover:bg-primary/8"
              style={{
                boxShadow:
                  "0 0 4px rgb(var(--primary-rgb)/0.27)",
              }}
            >
              <div className="size-11 flex items-center justify-center rounded-full bg-yellow-500/10">
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
                  className="lucide lucide-sparkles-icon lucide-sparkles text-yellow-400"
                >
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  <path d="M20 2v4" />
                  <path d="M22 4h-4" />
                  <circle cx="4" cy="20" r="2" />
                </svg>
              </div>
              <h2 className="text-xs text-muted-foreground font-bold uppercase">
                {t("Illumination")}
              </h2>
              <p className="text-sm font-bold text-foreground/80">
                {weather.astronomy.moon_illumination}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function HourlyForecast({ Home }) {
  const { t, i18n } = useTranslation();
  const weather = useSelector((state) =>
    Home == 0 ? state.history : state.weather,
  );
  const direction = useSelector((state) => state.language.direction);
  const theme = useSelector((state) => state.theme.actualTheme);
  const containerRef = useRef(null);
  const scrollContainer = useRef(null);
  const itemRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const lang = direction === "rtl" ? "ar" : "en";
  const locale = `${lang}-EG`;

  const GAP = 24; // Space between items (gap-6)
  const PADDING = 48; // Horizontal padding of container (left + right = p-6)

  // Calculate total width based on number of items
  // Formula:
  // total width = (items width) + (gaps between them) + (container padding)
  const calcWidthByItems = (itemWidth, numberOfItems) => {
    // Prevent invalid calculations
    if (!itemWidth || numberOfItems <= 0) return 0;

    return numberOfItems * itemWidth + (numberOfItems - 1) * GAP + PADDING;
  };

  // Calculate dynamic container width based on available space
  const calcDynamicWidth = () => {
    const el = containerRef.current;

    // Ensure required elements exist
    if (!el || !itemRef.current) return 0;

    // Use parent width (actual available space for the container)
    const parentWidth = el.parentElement.clientWidth;

    // Use offsetWidth to include borders in measurement
    const itemWidth = itemRef.current.offsetWidth;

    // Available horizontal space inside container (excluding padding)
    const availableWidth = parentWidth - PADDING;

    // Full width of one item including the gap next to it
    const itemFullWidth = itemWidth + GAP;

    // Calculate how many items can fit
    // Ensure at least one item is always rendered
    const numberOfItems = Math.max(
      1,
      Math.floor((availableWidth + GAP) / itemFullWidth),
    );

    // Calculate final container width based on fitted items
    const finalWidth = calcWidthByItems(itemWidth, numberOfItems);

    return finalWidth;
  };

  // Handle initial render + resize behavior
  useEffect(() => {
    // Ensure refs are ready
    if (!containerRef.current || !itemRef.current) return;

    const resizeContainerWidth = () => {
      const value = calcDynamicWidth();
      if (value) setContainerWidth(value);
    };

    // Run once on mount
    resizeContainerWidth();

    // Recalculate on window resize
    window.addEventListener("resize", resizeContainerWidth);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", resizeContainerWidth);

    // eslint-disable-next-line
  }, [weather]);

  // Custom horizontal scroll: move exactly one item per wheel step
  useEffect(() => {
    const el = scrollContainer.current;
    const itemEl = itemRef.current;

    // Ensure required elements exist
    if (!el || !itemEl) return;

    const handleWheel = (e) => {
      // Disable default vertical scrolling
      e.preventDefault();

      // Determine scroll direction
      // deltaY > 0 → scroll right
      // deltaY < 0 → scroll left
      const direction = e.deltaY > 0 ? 1 : -1;

      // Get accurate item width (avoids rounding issues)
      const itemWidth = itemEl.getBoundingClientRect().width;

      // Full scroll distance (item width + gap)
      const scrollAmount = itemWidth + GAP;

      // Scroll exactly one item per step
      el.scrollLeft += direction * scrollAmount;
    };

    // Attach wheel event (passive: false required for preventDefault)
    el.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup on unmount
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    i18n.changeLanguage(direction === "ltr" ? "en" : "ar");
  }, [i18n, direction]);

  const date = new Date(weather.currentDate);
  date.setMinutes(0);
  const currentTime = date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const tooltipSlotProps = {
    popper: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -4],
          },
        },
      ],
      sx: {
        "&.MuiPopper-root .MuiTooltip-tooltip": {
          color: "rgb(var(--foreground-rgb))",
          fontWeight: "bold",
          background: "rgb(var(--background-rgb))",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          willChange: "transform",
          fontSize: "11px",
          "& .MuiTooltip-arrow": {
            color: "rgb(var(--background-rgb))",
          },
        },
      },
    },
  };

  return (
    <>
      {(weather.hourly_forecast?.length || 0) > 2 && (
        <div className="flex flex-col gap-6">
          <div
            className={`flex flex-row items-center gap-3 text-foreground/90 ${Home == 1 && "animate-in animate-delay-100 fade-in zoom-in animate-duration-1000"}`}
          >
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
              className="lucide lucide-clock-icon lucide-clock"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <h2 className="text=lg font-semibold">{t("Hourly_Forecast")}</h2>
          </div>
          <div
            className={`p-6 rounded-4xl ${Home == 1 ? "self-center" : "self-center sm:self-start"} ${containerWidth ? "mx-auto" : ""} mx-2 mb-2`}
            ref={containerRef}
            style={{
              width: containerWidth ? `${containerWidth}px` : "100%",
              boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.3)",
            }}
          >
            <div
              className="flex gap-6 overflow-x-auto overflow-y-hidden hide-scrollbar w-full h-full"
              ref={scrollContainer}
            >
              {weather.hourly_forecast.map((hour, index) => (
                <div
                  key={hour.time + index}
                  ref={index === 0 ? itemRef : null}
                  className={`w-28 flex flex-col px-6 py-4 gap-2 shrink-0 items-center ${Home == 1 ? (hour.time == currentTime ? weather.WeatherUI.bg : theme === "dark" ? "bg-primary/6 hover:bg-primary/8" : "bg-primary/3 hover:bg-primary/5") : theme === "dark" ? "bg-primary/6 hover:bg-primary/8" : "bg-primary/3 hover:bg-primary/5"} border-2 border-border/40 rounded-3xl group animate-in animate-delay-100 fade-in zoom-in animate-duration-1000`}
                >
                  <p
                    className={`text-base font-bold ${direction === "ltr" ? "text-xs" : "text-sm"} ${Home == 1 ? (hour.time == currentTime ? "text-white/90" : "text-foreground/60") : "text-foreground/50"} w-fit`}
                  >
                    {hour.time}
                  </p>

                  <Tooltip
                    title={hour.desc}
                    placement="top"
                    arrow
                    slotProps={tooltipSlotProps}
                  >
                    <div className="flex justify-center items-center size-14 p-2 rounded-full bg-foreground/2 transition duration-200 group-hover:bg-foreground/3">
                      <img
                        src={hour.icon}
                        alt="Icon"
                        className="h-full group-hover:rotate-10 transition duration-300"
                      />
                    </div>
                  </Tooltip>

                  <h2
                    className={`text-xl font-bold ${Home == 1 ? (hour.time == currentTime ? "text-white" : "text-foreground") : "text-foreground"} w-fit`}
                  >
                    {hour.temp}
                  </h2>

                  <Tooltip
                    title={
                      <p
                        className={`uppercase text-[${direction === "rtl" ? "11px" : "10px"}]`}
                      >
                        {t("chance_of_rain")}
                      </p>
                    }
                    arrow
                    placement="top"
                    slotProps={tooltipSlotProps}
                  >
                    <div
                      className={`flex justify-center items-center px-2 py-1 rounded-2xl ${Home == 1 ? (hour.time == currentTime ? "bg-white/20 text-white/80" : "bg-blue-500/20 text-blue-700") : "bg-blue-500/20 text-blue-700"}`}
                    >
                      <h2 className="text-xs font-bold w-fit leading-none">
                        {hour.chance_of_rain}
                      </h2>
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

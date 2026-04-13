import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Placeholder from "./Placeholder";

export default function DaysForecast() {
  const weather = useSelector((state) => state.weather);
  const direction = useSelector((state) => state.language.direction);
  const theme = useSelector(state => state.theme.actualTheme)
  const layoutRef = useRef(null);
  const dayForecastHeight = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const [daysForecastHeight, setDaysForecastHeight] = useState(0);

  const GAP = 12; // Space between items (gap-3)
  const PADDING = 8; // Vertical padding of container (top + bottom = 4px + 4px)

  // Calculate total height based on number of items
  // Formula:
  // total height = (items height) + (gaps between them) + (container padding)
  const calcHeightByItems = (itemHeight, numberOfItems) => {
    // Guard clause to avoid invalid calculations
    if (!itemHeight || numberOfItems <= 0) return 0;

    return numberOfItems * itemHeight + (numberOfItems - 1) * GAP + PADDING;
  };

  // Calculate container height for a fixed number of items (used in small screens)
  const calcHeight = (numberOfItems) => {
    const el = layoutRef.current;

    // Ensure refs are available
    if (!el || !dayForecastHeight.current) return 0;

    // Temporarily remove maxHeight to measure real content height
    const prevMaxHeight = el.style.maxHeight;
    el.style.maxHeight = "none";

    // Measure single item height
    const itemHeight = dayForecastHeight.current.clientHeight;

    // Compute final height based on required number of items
    const finalHeight = calcHeightByItems(itemHeight, numberOfItems);

    // Restore previous maxHeight
    el.style.maxHeight = prevMaxHeight;

    return finalHeight;
  };

  // Handle resizing behavior for small screens
  useEffect(() => {
    // Ensure DOM elements exist before attaching listener
    if (!layoutRef.current || !dayForecastHeight.current) return;

    const SMScreenDaysForecast = () => {
      const value = calcHeight(3); // Show exactly 3 items
      if (value) setDaysForecastHeight(value);
    };

    // Initial calculation
    SMScreenDaysForecast();

    // Recalculate on window resize
    window.addEventListener("resize", SMScreenDaysForecast);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", SMScreenDaysForecast);

    // eslint-disable-next-line
  }, [weather]);

  // Calculate dynamic height based on available container space (large screens)
  const calcDynamicHeight = () => {
    const el = layoutRef.current;

    // Ensure refs are available
    if (!el || !dayForecastHeight.current) return 0;

    // Temporarily remove maxHeight to measure full container
    const prevMaxHeight = el.style.maxHeight;
    el.style.maxHeight = "none";

    // Measure container and item
    const containerHeight = el.clientHeight;
    const itemHeight = dayForecastHeight.current.clientHeight;

    // Available height inside container (excluding padding)
    const availableHeight = containerHeight - PADDING;

    // Full height of one item including gap
    const itemFullHeight = itemHeight + GAP;

    // Calculate how many full items fit inside container
    const numberOfItems = Math.max(
      1,
      Math.floor((availableHeight + GAP) / itemFullHeight),
    );

    // Calculate final height based on number of fitted items
    const finalHeight = calcHeightByItems(itemHeight, numberOfItems);

    // Restore original maxHeight
    el.style.maxHeight = prevMaxHeight;

    return finalHeight;
  };

  // Handle resizing behavior for large screens
  useEffect(() => {
    if (!layoutRef.current || !dayForecastHeight.current) return;

    const XLScreenDaysForecast = () => {
      const value = calcDynamicHeight();
      if (value) setMaxHeight(value);
    };

    // Initial calculation
    XLScreenDaysForecast();

    // Recalculate on resize
    window.addEventListener("resize", XLScreenDaysForecast);

    // Cleanup
    return () => window.removeEventListener("resize", XLScreenDaysForecast);

    // eslint-disable-next-line
  }, [weather]);

  // Custom scroll behavior: move exactly one item per scroll step
  useEffect(() => {
    const el = layoutRef.current;

    // Ensure container exists
    if (!el) return;

    const handleWheel = (e) => {
      // Disable default pixel-based scrolling
      e.preventDefault();

      const item = dayForecastHeight.current;

      // Ensure item exists
      if (!item) return;

      // Full height of one item (including gap)
      const itemHeight = item.clientHeight + GAP;

      // Determine scroll direction
      // deltaY > 0 → scroll down
      // deltaY < 0 → scroll up
      const direction = e.deltaY > 0 ? 1 : -1;

      // Scroll exactly one item per step (smooth animation)
      el.scrollBy({
        top: direction * itemHeight,
        behavior: "smooth",
      });
    };

    // Attach wheel listener with passive: false to allow preventDefault
    el.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup on unmount
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className={`flex flex-col gap-4 w-full ${!maxHeight || !dayForecastHeight ? "xl:h-full" : "xl:h-auto"} max-h-full pb-4 px-6 rounded-4xl overflow-hidden`}
      style={{
        boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.3)",
      }}
    >
      <div
        className="flex flex-row items-center gap-2 px-3 py-6 shadow-md shadow-border"
        style={{
          boxShadow: "0 5px 6px -4px rgb(var(--primary-rgb)/0.25)",
        }}
      >
        {weather.days_detials[0]?.icon ? (
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
            className="lucide lucide-calendar-range text-muted-foreground animate-in animate-delay-100 fade-in zoom-in animate-duration-1000"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M16 2v4" />
            <path d="M3 10h18" />
            <path d="M8 2v4" />
            <path d="M17 14h-6" />
            <path d="M13 18H7" />
            <path d="M7 14h.01" />
            <path d="M17 18h.01" />
          </svg>
        ) : (
          <Placeholder width="20px" height="20px" />
        )}
        {weather.days_detials[0]?.icon ? (
          <h2 className="text-lg font-bold animate-in fade-in zoom-in animate-duration-1000 animate-in animate-delay-100 fade-in zoom-in animate-duration-1000">{`${direction === "ltr" ? `${weather.days_detials.length}-Day Forecast` : `توقعات ${weather.days_detials.length.toLocaleString("ar-EG")} أيام`}`}</h2>
        ) : (
          <Placeholder width="134px" height="28px" />
        )}
      </div>

      <div
        className="flex flex-col gap-3 grow hide-scrollbar overflow-auto p-1 min-h-0"
        ref={layoutRef}
        style={{
          maxHeight: !window.matchMedia("(min-width: 1280px)").matches
            ? daysForecastHeight
              ? `${daysForecastHeight}px`
              : "auto"
            : maxHeight
              ? `${maxHeight}px`
              : "h-full",
        }}
      >
        {weather.days_detials[0]?.max_temp ? (
          weather.days_detials.map((day, index) => (
            <div
              key={index}
              ref={dayForecastHeight}
              className={`grid grid-cols-[1fr_1fr_1.4fr] sm:grid-cols-3 xl:grid-cols-[1fr_1fr_1.4fr] grid-rows-[60px] sm:grid-rows-[72px] xl:grid-rows-[60px] justify-between items-center py-2 px-4 rounded-3xl transition ${theme === "dark" ? "bg-primary/6 hover:bg-primary/8" : "bg-primary/2 hover:bg-primary/4"} animate-in animate-delay-100 fade-in zoom-in animate-duration-1000`}
              style={{
                boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.2)",
              }}
            >
              {index === 0 ? (
                <h2 className="text-base font-semibold leading-none">
                  {direction == "ltr" ? "Today" : "اليوم"}
                </h2>
              ) : (
                <>
                  <h2 className="block sm:hidden xl:block text-base font-semibold leading-none">
                    {direction === "ltr"
                      ? day.dayName?.slice(0, 3)
                      : day.dayName}
                  </h2>

                  <h2 className="hidden sm:block xl:hidden text-base font-semibold leading-none">
                    {day.dayName}
                  </h2>
                </>
              )}

              <div className="flex justify-center">
                <img src={day.icon} alt="icon" className="h-full" />
              </div>

              <div className="flex flex-row justify-end gap-4 sm:gap-5 xl:gap-4 text-base">
                <h2 className="font-bold text-foreground">{day.max_temp}</h2>

                <h2 className="font-bold text-muted-foreground">
                  {day.min_temp}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="flex flex-col gap-3 xl:hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <Placeholder
                  key={i}
                  width="100%"
                  minHeight="10px"
                  height="59px"
                />
              ))}
            </div>

            <div className="hidden xl:flex flex-col gap-3 h-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <Placeholder
                  key={i}
                  width="100%"
                  minHeight="10px"
                  flex="1 1 auto"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

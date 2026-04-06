import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Placeholder from "./Placeholder";

export default function DaysForecast() {
  const weather = useSelector((state) => state.weather);
  const layoutRef = useRef(null);
  const dayForecastHeight = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const [daysForecastHeight, setDaysForecastHeight] = useState(0);

  const GAP = 12; // gap-3
  const PADDING = 8; // p-1 (4px => top + 4px => bottom)

  // Calculate total height based on number of items
  // = (items height) + (gaps between them) + (container padding)
  const calcHeightByItems = (itemHeight, numberOfItems) => {
    // Safety check
    if (!itemHeight || numberOfItems <= 0) return 0;

    return numberOfItems * itemHeight + (numberOfItems - 1) * GAP + PADDING;
  };

  // Calculate container height in case of fixed Number of items (for small screens)
  const calcHeight = (numberOfItems) => {
    const el = layoutRef.current;

    // Make sure refs exist
    if (!el || !dayForecastHeight.current) return 0;

    // Temporarily remove maxHeight restriction to measure correctly
    const prevMaxHeight = el.style.maxHeight;
    el.style.maxHeight = "none";

    // Get single item height
    const itemHeight = dayForecastHeight.current.clientHeight;

    // Calculate final height for given number of items
    const finalHeight = calcHeightByItems(itemHeight, numberOfItems);

    // Restore previous maxHeight
    el.style.maxHeight = prevMaxHeight;

    return finalHeight;
  };

  // Handler for small screens (always show 3 items)
  const SMScreenDaysForecast = () => {
    const value = calcHeight(3);
    if (value) setDaysForecastHeight(value);
  };

  // Listen to window resize for small screens
  useEffect(() => {
    // Make sure refs are ready before adding listener
    if (!layoutRef.current || !dayForecastHeight.current) return;

    window.addEventListener("resize", SMScreenDaysForecast);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", SMScreenDaysForecast);
    // eslint-disable-next-line
  }, [weather]);

  // Calculate dynamic height (for large screens)
  const calcDynamicHeight = () => {
    const el = layoutRef.current;

    // Make sure refs exist
    if (!el || !dayForecastHeight.current) return 0;

    // Temporarily remove maxHeight restriction
    const prevMaxHeight = el.style.maxHeight;
    el.style.maxHeight = "none";

    // Get container height and item height
    const containerHeight = el.clientHeight;
    const itemHeight = dayForecastHeight.current.clientHeight;

    // Available space inside container after removing padding
    const availableHeight = containerHeight - PADDING;

    // Full height of one item including gap
    const itemFullHeight = itemHeight + GAP;

    // Calculate how many items can fit completely
    const numberOfItems = Math.floor((availableHeight + GAP) / itemFullHeight);

    // Calculate final height based on fitted items
    const finalHeight = calcHeightByItems(itemHeight, numberOfItems);

    // Restore previous maxHeight
    el.style.maxHeight = prevMaxHeight;

    return finalHeight;
  };

  // Handler for large screens (dynamic number of items)
  const XLScreenDaysForecast = () => {
    const value = calcDynamicHeight();
    if (value) setMaxHeight(value);
  };

  // Listen to window resize for large screens
  useEffect(() => {
    if (!layoutRef.current || !dayForecastHeight.current) return;

    window.addEventListener("resize", XLScreenDaysForecast);

    return () => window.removeEventListener("resize", XLScreenDaysForecast);
    // eslint-disable-next-line
  }, [weather]);

  // Each scroll step moves exactly one item (step-based instead of pixel-based)
  useEffect(() => {
    const el = layoutRef.current;

    // Make sure the container exists
    if (!el) return;

    // Handle mouse wheel scroll
    const handleWheel = (e) => {
      // Prevent default browser scrolling (pixel-based)
      e.preventDefault();

      const item = dayForecastHeight.current;

      // Make sure item ref exists
      if (!item) return;

      // Get full height of one item (including gap)
      const itemHeight = item.clientHeight + GAP;

      // Detect scroll direction:
      // deltaY > 0 → scroll down
      // deltaY < 0 → scroll up
      const direction = e.deltaY > 0 ? 1 : -1;

      // Perform manual scroll:
      // Move exactly one item per scroll step
      el.scrollBy({
        top: direction * itemHeight,
        behavior: "smooth",
      });
    };

    // Attach wheel event with passive: false
    // (required to allow preventDefault)
    el.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup: remove event on unmount
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className={`flex flex-col gap-4 w-full ${!maxHeight || !dayForecastHeight ? "xl:h-full" : "xl:h-auto"} max-h-full pb-4 px-6 rounded-4xl overflow-hidden`}
      style={{
        boxShadow:
          "0 0 4px color-mix(in srgb, var(--primary) 27%, transparent)",
      }}
    >
      <div
        className="flex flex-row items-center gap-2 px-3 py-6 shadow-md shadow-border"
        style={{
          boxShadow:
            "0 5px 6px -4px color-mix(in srgb, var(--primary) 15%, transparent)",
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
          <h2 className="text-lg font-bold animate-in fade-in zoom-in animate-duration-1000 animate-in animate-delay-100 fade-in zoom-in animate-duration-1000">{`${weather.days_detials.length}-Day Forecast`}</h2>
        ) : (
          <Placeholder width="134px" height="28px" />
        )}
      </div>

      <div
        className="flex flex-col gap-3 grow hide-scrollbar overflow-auto p-1 min-h-0"
        ref={layoutRef}
        onLoad={() => {
          if (window.matchMedia("(min-width: 1280px)").matches) {
            XLScreenDaysForecast();
          } else {
            SMScreenDaysForecast();
          }
        }}
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
              className="grid grid-cols-[1fr_1fr_1.7fr] sm:grid-cols-3 xl:grid-cols-[1fr_1fr_1.7fr] justify-between items-center py-2 px-4 shadow-xs shadow-border rounded-3xl transition hover:bg-muted/50 animate-in animate-delay-100 fade-in zoom-in animate-duration-1000"
            >
              <h2 className="block sm:hidden xl:block text-base font-semibold leading-none">
                {day.dayName?.slice(0, 3)}
              </h2>

              <h2 className="hidden sm:block xl:hidden text-base font-semibold leading-none">
                {day.dayName}
              </h2>

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

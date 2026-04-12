import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useMemo, useEffect } from "react";
import { fetchHistory } from "../../../features/HistorySlice";
import { editDate } from "../../../features/HistorySlice";

export default function HistoryCards() {
  const weather = useSelector((state) => state.weather);
  const history = useSelector((state) => state.history);
  const historyDispatch = useDispatch();
  const direction = useSelector((state) => state.direction);
  const lang = direction === "rtl" ? "ar" : "en";
  const locale = `${lang}-EG`;

  const numberOfItems = 30;

  // Layout Refs
  const itemRef = useRef(null); // Reference to a single item (used to measure width)
  const containerRef = useRef(null); // Reference to the container element

  // State
  const [containerWidth, setContainerWidth] = useState(0); // Final calculated width for container

  // Constants
  const GAP = 10; // Space between items (gap-2.5 ≈ 10px)
  const PADDING = 8; // Container padding (p-1 ≈ 8px total horizontal)

  // Calculate total width based on number of items
  const calcWidthByItems = (itemWidth, numberOfItems) => {
    // Prevent invalid calculations
    if (!itemWidth || numberOfItems <= 0) return 0;

    // Total width = (items * width) + (gaps between them) + padding
    return numberOfItems * itemWidth + (numberOfItems - 1) * GAP + PADDING;
  };

  // Calculate how many items fit inside the container
  const clacContainerWidth = () => {
    const el = containerRef.current;

    // Ensure DOM elements exist before calculation
    if (!el || !itemRef.current) return 0;

    const parentWidth = el.parentElement.clientWidth; // Width of parent container
    const itemWidth = itemRef.current.offsetWidth; // Width of a single item

    const availableWidth = parentWidth - PADDING; // Available space excluding padding
    const itemFullWidth = itemWidth + GAP; // Item width including gap

    // Calculate how many items can fit horizontally
    const numberOfItems = Math.max(
      1,
      Math.floor((availableWidth + GAP) / itemFullWidth),
    );

    // Calculate final container width based on items count
    const finalWidth = calcWidthByItems(itemWidth, numberOfItems);

    return finalWidth;
  };

  useEffect(() => {
    // Make sure refs are ready before running logic
    if (!containerRef.current || !itemRef.current) return;

    // Function to recalculate width on resize
    const resizeContainerWidth = () => {
      const value = clacContainerWidth();
      if (value) setContainerWidth(value);
    };

    // Initial calculation
    resizeContainerWidth();

    // Recalculate on window resize
    window.addEventListener("resize", resizeContainerWidth);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", resizeContainerWidth);

    // Re-run when weather changes (likely affects layout/content)
    // eslint-disable-next-line
  }, [weather]);

  // Memoized array of past days based on itemsNumber and weather.date
  const days = useMemo(() => {
    if (!weather.date) return [];

    // Convert string to Date object (represents "today")
    const today = new Date(weather.currentDate);

    // Formatter to extract readable date parts (e.g. Tue, 21, Jul)
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: "short", // e.g. "Tue"
      day: "numeric", // e.g. "21"
      month: "short", // e.g. "Jul"
    });

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Create an array of days based on how many items we want to show
    return Array.from({ length: numberOfItems }, (_, i) => {
      // Clone today's date to avoid mutating the original
      const date = new Date(yesterday);

      // Go back "i" days (0 = today, 1 = yesterday, etc.)
      date.setDate(yesterday.getDate() - i);

      // Extract formatted parts (weekday, day, month)
      const parts = Object.fromEntries(
        formatter.formatToParts(date).map(({ type, value }) => [type, value]),
      );

      const getArabicDays = (num) => {
        if (num === 1) return "يوم";
        if (num >= 3 && num <= 10) return "أيام";
        return "يوم"; // 11+
      };
      const daysAgo = i + 1;

      // Return structured object for each day
      return {
        weekday: parts.weekday, // e.g. "Tue"
        day: parts.day, // e.g. "21"
        month: parts.month, // e.g. "Jul"

        // Human-readable label
        label:
          i === 0
            ? direction === "ltr"
              ? "YESTERDAY"
              : "أمس"
            : direction === "ltr"
              ? `${daysAgo} DAYS AGO`
              : daysAgo === 2
                ? "منذ يومين"
                : `منذ ${daysAgo} ${getArabicDays(daysAgo)}`,
      };
    });
  }, [weather, direction, locale]); // Re-run only when these values change

  // Custom horizontal scroll: move exactly one item per wheel step
  useEffect(() => {
    const el = containerRef.current;
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

  const formatDate = (date) => {
    date = new Date(date);
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className="flex gap-2.5 w-full overflow-x-auto overflow-y-hidden hide-scrollbar py-2 px-1 self-center sm:self-start"
      ref={containerRef}
      style={{ width: containerWidth ? `${containerWidth}px` : "auto" }}
    >
      {days.length > 1 &&
        days.map((day, i) => {
          const baseDate = new Date(weather.currentDate);
          baseDate.setDate(baseDate.getDate() - i);
          const dateString = formatDate(baseDate);
          const isCurrentDay = dateString === history.date;

          return (
            <div
              key={day.day}
              ref={i === 0 ? itemRef : null}
              className={`flex flex-col items-center justify-between h-32 w-23 p-3 rounded-2xl shrink-0 transition ${isCurrentDay ? "bg-muted/70" : "bg-muted/30 hover:bg-muted/50"}`}
              style={{
                boxShadow: isCurrentDay
                  ? "0 0 8px rgb(var(--primary-rgb)/0.7)"
                  : "0 0 4px rgb(var(--primary-rgb)/0.35)",
              }}
              onClick={() => {
                const date = new Date(weather.currentDate);
                date.setDate(date.getDate() - i);
                const dateString = formatDate(date);
                historyDispatch(editDate(dateString));
                historyDispatch(fetchHistory(dateString));
              }}
            >
              <p className="text-[15px] font-semibold text-muted-foreground uppercase">
                {day.weekday}
              </p>
              <p className="text-2xl font-bold text-foreground/90">{day.day}</p>
              <p className="text-sm font-black text-muted-foreground">
                {day.month}
              </p>
              <p
                className={`${direction === "ltr" ? "text-[10px]" : "text-[11px]"} text-muted-foreground/65`}
              >
                {day.label}
              </p>
            </div>
          );
        })}
    </div>
  );
}

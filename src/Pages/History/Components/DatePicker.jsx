import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../../features/HistorySlice";
import { editDate } from "../../../features/HistorySlice";
import "dayjs/locale/ar";

function DatePicker() {
  const date = useSelector((state) => state.history.date);
  const direction = useSelector((state) => state.language.direction);
  dayjs.locale(direction === "rtl" ? "ar" : "en");
  const historyDispatch = useDispatch();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={direction === "rtl" ? "ar" : "en"}
    >
      <StaticDatePicker
        disableFuture
        disableHighlightToday
        minDate={dayjs("2010-01-01")}
        maxDate={dayjs()}
        value={dayjs(date)}
        onChange={(val) => {
          if (!val) return;
          const formatted = val.format("YYYY-MM-DD");
          historyDispatch(editDate(formatted));
          historyDispatch(fetchHistory(formatted));
        }}
        sx={{
          /* ================= ROOT ================= */
          width: "fit-content",
          height: "315px",
          borderRadius: "20px",
          background: "var(--background)",
          color: "rgb(var(--foreground-rgb)/0.8)",
          boxShadow: "0 0 8px rgb(var(--primary-rgb)/0.5)",

          /* ================= HEADER ================= */

          "& .MuiPickersCalendarHeader-root": {
            margin: "0",
            padding: "30px 24px",
            color: "var(--foreground) !important",
            boxShadow: "0 0px 8px rgb(var(--primary-rgb)/0.5)",
            flexShrink: 0,
          },

          /* ================= NAVIGATION (ARROWS) ================= */
          "& .MuiSvgIcon-root": {
            color: "#aaa !important",
          },

          "& .MuiIconButton-root:hover": {
            backgroundColor: "rgba(255,255,255,0.08) !important",
          },

          "& .MuiIconButton-root.Mui-disabled .MuiSvgIcon-root": {
            color: "rgb(var(--muted-foreground-rgb)/0.7) !important",
          },

          /* ================= YEAR VIEW ================= */

          "& .MuiYearCalendar-root": {
            height: "245px",
            marginTop: "5px",
            overflowY: "auto",

            scrollbarWidth: "none",
            msOverflowStyle: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          "& .MuiYearCalendar-button.Mui-selected": {
            background: "rgb(var(--primary-rgb)/0.8) !important",
            color: "var(--primary-foreground) !important",
            fontWeight: "semibold",
          },

          /* ================= DAYS HEADER ================= */
          "& .MuiDayCalendar-header": {
            paddingTop: "10px",
          },

          "& .MuiDayCalendar-weekDayLabel": {
            fontWeight: "bold",
            color: "rgb(var(--foreground-rgb)/0.6) !important",
          },

          /* ================= MONTH CONTAINER ================= */
          "& .MuiDayCalendar-monthContainer": {
            height: "200px !important",
            overflow: "auto !important",

            scrollbarWidth: "none",
            msOverflowStyle: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          /* ================= DAY CELL ================= */
          "& .MuiPickersDay-root": {
            borderRadius: "10px !important",
            transition: "all 0.2s ease !important",
            color: "rgb(var(--foreground-rgb)/0.9) !important",
          },

          "& .MuiPickersDay-root:hover": {
            backgroundColor: "rgba(255,255,255,0.08) !important",
          },

          "& .MuiPickersDay-root.Mui-disabled": {
            borderRadius: "10px !important",
            transition: "all 0.2s ease !important",
            color: "rgb(var(--muted-foreground-rgb)/0.7) !important",
          },

          /* ================= SELECTED STATES ================= */
          "& .MuiPickersDay-root.Mui-selected": {
            background: "rgb(var(--primary-rgb)/0.8) !important",
            color: "var(--primary-foreground) !important",
          },

          "& .MuiPickersDay-root.Mui-selected:hover": {
            background: "rgb(var(--primary-rgb)/0.8) !important",
            color: "var(--primary-foreground) !important",
          },

          "& .MuiPickersArrowSwitcher-root svg": {
            transform: direction === "rtl" ? "rotate(180deg)" : "none",
          },
        }}
        slots={{
          toolbar: null,
        }}
        slotProps={{
          actionBar: {
            actions: [],
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default React.memo(DatePicker);

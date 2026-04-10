import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../../features/HistorySlice";

export default function DatePicker() {
  const date = useSelector((state) => state.history.date);
  const historyDispatch = useDispatch();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        disableFuture
        disableHighlightToday
        minDate={dayjs("2010-01-01")}
        maxDate={dayjs()}
        value={dayjs(date)}
        onChange={(val) => {
          if (!val) return;
          const formatted = val.format("YYYY-MM-DD");
          historyDispatch(fetchHistory(formatted));
        }}
        sx={{
          /* ================= ROOT ================= */
          width: "fit-content",
          height: "315px",
          borderRadius: "20px",
          background: "var(--background)",
          color: "color-mix(in srgb, var(--foreground) 80%, transparent)",
          boxShadow:
            "0 0 8px color-mix(in srgb, var(--primary) 50%, transparent)",

          /* ================= HEADER ================= */
          "& .MuiPickersCalendarHeader-root": {
            margin: "0",
            padding: "30px 24px",
            color: "var(--foreground) !important",
            boxShadow:
              "0 0px 8px color-mix(in srgb, var(--primary) 50%, transparent)",
          },

          /* ================= NAVIGATION (ARROWS) ================= */
          "& .MuiSvgIcon-root": {
            color: "#aaa !important",
          },

          "& .MuiIconButton-root:hover": {
            backgroundColor: "rgba(255,255,255,0.08) !important",
          },

          "& .MuiIconButton-root.Mui-disabled .MuiSvgIcon-root": {
            color:
              "color-mix(in srgb, var(--muted-foreground) 70%, transparent) !important",
          },

          /* ================= YEAR VIEW ================= */
          "& .MuiYearCalendar-root.mui-ltr-su1ucx-MuiYearCalendar-root": {
            height: "245px",
            marginTop: "5px",
            overflow: "auto",
          },

          "& .MuiYearCalendar-root": {
            scrollbarWidth: "none",
            msOverflowStyle: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          "& .MuiYearCalendar-button.Mui-selected": {
            background:
              "color-mix(in srgb, var(--primary) 80%, transparent) !important",
            color: "var(--primary-foreground) !important",
            fontWeight: "semibold",
          },

          /* ================= DAYS HEADER ================= */
          "& .MuiDayCalendar-header": {
            paddingTop: "10px",
          },

          "& .MuiDayCalendar-weekDayLabel": {
            fontWeight: "bold",
            color:
              "color-mix(in srgb, var(--foreground) 60%, transparent) !important",
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
            color:
              "color-mix(in srgb, var(--foreground) 90%, transparent) !important",
          },

          "& .MuiPickersDay-root:hover": {
            backgroundColor: "rgba(255,255,255,0.08) !important",
          },

          "& .MuiPickersDay-root.Mui-disabled": {
            borderRadius: "10px !important",
            transition: "all 0.2s ease !important",
            color:
              "color-mix(in srgb, var(--muted-foreground) 70%, transparent) !important",
          },

          /* ================= SELECTED STATES ================= */
          "& .MuiPickersDay-root.Mui-selected": {
            background:
              "color-mix(in srgb, var(--primary) 80%, transparent) !important",
            color: "var(--primary-foreground) !important",
          },

          "& .MuiPickersDay-root.Mui-selected:hover": {
            background:
              "color-mix(in srgb, var(--primary) 80%, transparent) !important",
            color: "var(--primary-foreground) !important",
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

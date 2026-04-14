import { createSlice } from "@reduxjs/toolkit";

const storedUnit = localStorage.getItem("TimeFormat");

const initialState = storedUnit ? storedUnit : "12-hour";

export const TimeFormatSlice = createSlice({
  name: "TimeFormat",
  initialState,

  reducers: {
    changeTimeFormat: (state, action) => {
      const newState = action.payload;

      localStorage.setItem("TimeFormat", newState);

      return newState;
    },
  },
});

export const { changeTimeFormat } = TimeFormatSlice.actions;
export default TimeFormatSlice.reducer;

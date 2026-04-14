import { createSlice } from "@reduxjs/toolkit";

const storedUnit = localStorage.getItem("TemperatureUnit");

const initialState = storedUnit ? storedUnit : "Celsius";

export const TemperatureUnitSlice = createSlice({
  name: "TemperatureUnit",
  initialState,

  reducers: {
    changeTemperatureUnit: (state, action) => {
      const newState = action.payload;

      localStorage.setItem("TemperatureUnit", newState);

      return newState;
    },
  },
});

export const { changeTemperatureUnit } = TemperatureUnitSlice.actions;
export default TemperatureUnitSlice.reducer;

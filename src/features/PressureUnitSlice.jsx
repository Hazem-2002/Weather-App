import { createSlice } from "@reduxjs/toolkit";

const storedUnit = localStorage.getItem("PressureUnit");

const initialState = storedUnit ? storedUnit : "Millibars";

export const PressureUnitSlice = createSlice({
  name: "PressureUnit",
  initialState,

  reducers: {
    changePressureUnit: (state, action) => {
      const newState = action.payload;

      localStorage.setItem("PressureUnit", newState);

      return newState;
    },
  },
});

export const { changePressureUnit } = PressureUnitSlice.actions;
export default PressureUnitSlice.reducer;

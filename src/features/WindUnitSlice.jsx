import { createSlice } from "@reduxjs/toolkit";

const storedUnit = localStorage.getItem("WindUnit");

const initialState = storedUnit ? storedUnit : "Kph";

export const WindUnitSlice = createSlice({
  name: "WindUnit",
  initialState,

  reducers: {
    changeWindUnit: (state, action) => {
      const newState = action.payload;

      localStorage.setItem("WindUnit", newState);

      return newState;
    },
  },
});

export const { changeWindUnit } = WindUnitSlice.actions;
export default WindUnitSlice.reducer;

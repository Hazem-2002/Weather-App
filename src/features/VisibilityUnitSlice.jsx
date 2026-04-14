import { createSlice } from "@reduxjs/toolkit";

const storedUnit = localStorage.getItem("VisibilityUnit");

const initialState = storedUnit ? storedUnit : "Kilometers";

export const VisibilityUnitSlice = createSlice({
  name: "VisibilityUnit",
  initialState,

  reducers: {
    changeVisibilityUnit: (state, action) => {
      const newState = action.payload;

      localStorage.setItem("VisibilityUnit", newState);

      return newState;
    },
  },
});

export const { changeVisibilityUnit } = VisibilityUnitSlice.actions;
export default VisibilityUnitSlice.reducer;

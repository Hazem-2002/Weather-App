import { createSlice } from "@reduxjs/toolkit";

const storedCoords = localStorage.getItem("coords");

const initialState = storedCoords
  ? JSON.parse(storedCoords)
  : { lon: null, lat: null };

export const counterSlice = createSlice({
  name: "city",
  initialState,

  reducers: {
    changeCoords: (state, action) => {
      const newState = {
        lon: action.payload.lon,
        lat: action.payload.lat,
      };

      localStorage.setItem("coords", JSON.stringify(newState));

      return newState;
    },
  },
});

export const { changeCoords } = counterSlice.actions;
export default counterSlice.reducer;

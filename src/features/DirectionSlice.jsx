import { createSlice } from "@reduxjs/toolkit";

const storedDirection = localStorage.getItem("dir");

const initialState = storedDirection ? storedDirection : "rtl";

export const directionSlice = createSlice({
  name: "direction",
  initialState,

  reducers: {
    changeDirection: (state, action) => {
      const direction = action.payload;
      localStorage.setItem("dir", direction);

      return direction;
    },
  },
});

export const { changeDirection } = directionSlice.actions;
export default directionSlice.reducer;

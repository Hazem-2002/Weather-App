import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/City_Coords";

export default configureStore({
  reducer: {
    city: counterReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";

import generalsSlice from "./generals/slice";

export const store = configureStore({
  reducer: {
    generals: generalsSlice
  }
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadedFirstTime:false,
  loading:false,
  notifications:[],
  form: []
};

const generalsSlice = createSlice({
  name: "generals",
  initialState: initialState,
  reducers: {
    notification: (state, action) => {
      state.notifications.push(action.payload)
    },
    addToForm: (state, action) => {
      state.form.push(action.payload)
    }
  }
});

export const { notification, form } = generalsSlice.actions;
export default generalsSlice.reducer;
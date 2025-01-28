// src/redux/slices/screenWidthSlice.js

import { createSlice } from '@reduxjs/toolkit';

const settingDataSlice = createSlice({
  name: 'settingData',
  initialState: {
    screenWidth: window.innerWidth,
  },
  reducers: {
    setscreenwidth: (state, action) => {
      state.screenWidth = action.payload;
    },
  },
});

export const { setscreenwidth } = settingDataSlice.actions;

export default settingDataSlice.reducer;

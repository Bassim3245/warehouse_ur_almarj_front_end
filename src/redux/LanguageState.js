import { createSlice } from "@reduxjs/toolkit";

// Function to get RTL settings from localStorage or provide default values
const getrtlSettings = () => {
  const storedRTL = localStorage.getItem("rtl");
  if (storedRTL) {
    return JSON.parse(storedRTL);
  } else {
    return {
      anchor: "right", // Default anchor for non-rtl languages
      flexDirection: "row-reverse", // Default direction for non-rtl languages
      dir: "rtl",
    };
  }
};
export const languageSlice = createSlice({
  name: "language",
  initialState: {
    language: "en",
    rtl: getrtlSettings(), // Using the function to get rtl settings
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      if (action.payload === "ar") {
        state.rtl.anchor = "right";
        state.rtl.flexDirection = "row-reverse";
        state.rtl.dir = "rtl";
      }
      if (action.payload === "en") {
        state.rtl.anchor = "left";
        state.rtl.flexDirection = "row";
        state.rtl.dir = "ltr";
      }
      localStorage.setItem("rtl", JSON.stringify(state.rtl)); // Storing the updated RTL object in localStorage
    },
  },
});
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

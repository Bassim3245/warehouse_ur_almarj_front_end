import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalTheme: {
    mainColor: "#1e6a99",
    secondColor: "#E1342A",
  },
  maintheme: {
    mainColor: "#1e6a99",
    background: "#FAFAFA",
    paperColor: "#ffffff",
    primaryColor: "#707070",
    secondaryColor: "#349CDD",
    colorblack: "#000000",
    lightblack: "#333333",
    colorWhite: "#ffffff",
    extrBold: "#3D3D3D",
    extraLight: "#B3B8BD",
    normalblack: "#52575D",
    semilight: "#B3B8BD",
    iconColor: "#1e6a99",
    grid_clear_icon: "#C8D0D6",
    grid_clear_icon_text: "black",
    yellow: "#FFC107",
    light_purple: "#9C27B0",
    dark_purple: "#6A1B9A",
    light_green: "#4CAF50",
    dark_green: "#388E3C",
    light_red: "#F44336",
    dark_red: "#D32F2F",
    light_blue: "#2196F3",
    dark_blue: "#1976D2",
    light_orange: "#FF9800",
    dark_orange: "#F57C00",
    light_pink: "#E91E63",
    dark_pink: "#C2185B",
    light_brown: "#795548",
    dark_brown: "#5D4037",
    light_grey: "#607D8B",
    dark_grey: "#455A64",
    light_yellow:"#FFEB3B", 

  },
  logintheme: {
    platte_background_color: "#1e6a99",
    paperColor: "#ffffff",
    primaryColor: "#707070",
    secondaryColor: "#349CDD",
    colorblack: "#000000",
    lightblack: "#333333",
    colorWhite: "#ffffff",
    iconsColor: "#1e6a99",
  },
  sidemenutheme: {
    mainColor: "#1e6a99",
    paperColor: "#ffffff",
    primaryColor: "#707070",
    secondaryColor: "#1e6a99",
    backgroundColor: "#FAFAFA",
    colorblack: "#000000",
    colorWhite: "#ffffff",
    lightblack: "#333333",
    iconColor: "#C8D0D6 ",
    itmeshover: "#1e6a9929 ",
    textitemcolor: "#1e6a99",
    dropdwoncolor: "rgb(200,208,214)",
  },
  dashboardtheme: {
    background: "#1e6a99",
    paperColor: "#ffffff",
    primaryColor: "#707070",
    secondaryColor: "#51D9F0",
    colorblack: "#000000",
    lightblack: "#333333",
    colorWhite: "#ffffff",
    extrBold: "#3D3D3D",
    extraLight: "#B3B8BD",
    normalblack: "#52575D",
    semilight: "#B3B8BD",
    axisLableColor: "#43425D",
    chartOneSeriesOne: "#A4A1FB",
    chartOneSeriesTwo: "#56D9FE",
    chartOneSeriesThree: "#5FE3A1",
  },
  gridtheme: {
    openSearchIcon: "#1e6a99",
    mainColor: "#1e6a99",
    gridHeader: "#1e6a99",
    paperColor: "#ffffff",
    primaryColor: "#707070",
    secondaryColor: "#51D9F0",
    colorblack: "#000000",
    lightblack: "#333333",
    colorWhite: "#ffffff",
    extrBold: "#3D3D3D",
    extraLight: "#B3B8BD",
    normalblack: "#52575D",
    semilight: "#B3B8BD",
    tooltip_create: "#1e6a99",
    tooltip_create_text: "#fff",
    tooltip_export: "green",
    tooltip_export_text: "#fff",
    tooltip_import: "#02ab2f",
    tooltip_import_text: "#fff",
    tooltip_map: "#fcc705",
    tooltip_map_text: "#fff",
    tooltip_telegram: "#32affc",
    tooltip_telegram_text: "#fff",
  },
  appbar: {
    background: "#1e6a99",
    paperColor: "#ffffff",
    primaryColor: "#707070",
    secondaryColor: "#349CDD",
    colorblack: "#000000",
    lightblack: "#333333",
    colorWhite: "#ffffff",
    extrBold: "#3D3D3D",
    extraLight: "#B3B8BD",
    normalblack: "#52575D",
    semilight: "#B3B8BD",
    ColorPurple: "#4A148C",
  },
};
export const themesSlice = createSlice({
  name: "ThemeData",
  initialState: initialState,
  reducers: {
    setlogintheme: (state, action) => {
      state.logintheme = action.payload;
    },
    setSidemenutheme: (state, action) => {
      state.sidemenutheme = action.payload;
    },
    setMaintheme: (state, action) => {
      state.maintheme = action.payload;
    },
    setDashboardtheme: (state, action) => {
      state.dashboardtheme = action.payload;
    },
    setAppBarTheme: (state, action) => {
      state.appbar = action.payload;
    },
    setgridtheme: (state, action) => {
      state.gridtheme = action.payload;
    },
  },
});

export const {
  setlogintheme,
  setSidemenutheme,
  setAppBarTheme,
  setMaintheme,
  setgridtheme,
} = themesSlice.actions;

export default themesSlice.reducer;

import { Box, useTheme } from "@mui/material";
import ResponsiveAppBar from "./AppBar";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect } from "react";
import { setLanguage } from "../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./SlidBar";
import { getDesignTokens } from "./Thime";
import { getToken } from "../utils/handelCookie";
import CookieStatus from "../middleware/cookies";
import { getDataUserById } from "../redux/userSlice/authActions";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default function Root() {
  const token = getToken();
  const { dataUserById } = useSelector((state) => {
    return state?.user;
  });
  const dispatch = useDispatch();
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state.language;
  });
  // const [open, setOpen] = React.useState(token ? true : false);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [mode, setMode] = React.useState(
    Boolean(localStorage.getItem("currentMode"))
      ? localStorage.getItem("currentMode")
      : "light"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const theme2 = useTheme();
  React.useEffect(() => {
    dispatch(getDataUserById(token));
    dispatch(setLanguage());
  }, [dispatch, token]);
  return (
    <ThemeProvider theme={theme}>
      <CookieStatus />
      <Box sx={{ display: "flex", flexDirection: rtl?.flexDirection }}>
        <CssBaseline />
        <ResponsiveAppBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          setMode={setMode}
          dataUserById={dataUserById}
          rtl={rtl}
          theme={theme2}
        />
        <SideBar
          open={open}
          handleDrawerClose={handleDrawerClose}
          rtl={rtl}
          dataUserById={dataUserById}
          theme={theme2}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            maxWidth: "100%",
            overflowX: rtl.dir === "rtl" ? "auto" : "hidden", // Adjust overflowX based on token and rtl.dir
          }}
        >
          <DrawerHeader
          // @ts-ignore
          />
          <Outlet />
        </Box>
        <ToastContainer
          // containerId="container_toast_id"
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          transition={Slide}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </ThemeProvider>
  );
}

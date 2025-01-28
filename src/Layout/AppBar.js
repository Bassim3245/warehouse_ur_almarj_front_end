import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoleAndUserId } from "../redux/RoleSlice/rolAction";
import { GridMenuIcon } from "@mui/x-data-grid";
import { BottomSend } from "../utils/Content";

import { getToken } from "../utils/handelCookie";
import { toast } from "react-toastify";
import Pusher from "pusher-js";
import {
  getDataUserById,
  getDataUserWithWareHouseDataById,
} from "../redux/userSlice/authActions";
import DropDownMenu from "./DrobMenue";
import DrobMenueAuth from "./DrobMenueAuth";
import { setLanguage } from "../redux/LanguageState";
import "./style.css";
import AccountMenu from "./BookedData/DropDownMenu";
const drawerWidth = 300;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, rtl, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: rtl?.flexDirection === "row" ? drawerWidth : null,
    marginRight: rtl?.flexDirection === "row-reverse" ? drawerWidth : null,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Appbar = ({ open, handleDrawerOpen, setMode ,rtl,theme,dataUserById}) => {

  const { Permission } = useSelector((state) => state?.RolesData);
  let token = getToken();
  const [permissionData, setPermissionData] = useState([]);
  useEffect(() => {
    if (Permission?.permission_id) {
      try {
        const parsedData = JSON.parse(Permission.permission_id);
        setPermissionData(parsedData);
      } catch (error) {
        console.error("Error parsing permission_id:", error);
      }
    }
  }, [Permission]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [votes, setVotes] = useState(0);
  const location = useLocation();
  // Dispatch actions on component mount
  useEffect(() => {
    dispatch(getRoleAndUserId(token));
  }, [dispatch, token, location]);
  // Browser notification helper
  const showNotification = (title, body) => {
    if ("Notification" in window) {
      if (Notification?.permission === "granted") {
        new Notification(title, { body });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, { body });
          }
        });
      }
    } else {
      console.warn("This browser does not support notifications.");
    }
  };

  // Subscribe to Pusher events
  useEffect(() => {
    if (!dataUserById?.user_id || !dataUserById?.entity_id) {
      console.error("Missing user information.");
      return;
    }
    const pusher = new Pusher("981e65db6d4dc90983b4", {
      cluster: "us3",
      encrypted: true,
    });

    const channel = pusher.subscribe("poll");

    const voteHandler = (eventData) => {
      if (
        eventData?.user_id === dataUserById?.user_id ||
        eventData?.entity_id === dataUserById?.entity_id
      ) {
        setVotes((prevVotes) => prevVotes + 1);

        const notificationTitle = "تنبيه: إشعار جديد!";
        const notificationBody =
          eventData?.message || "You have received a new vote!";

        // Trigger browser notification
        showNotification(notificationTitle, notificationBody);

        // Show toast notification
        toast.success(eventData?.message || "Vote received", {
          position: "top-right",
          style: {
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    };

    channel.bind("vote", voteHandler);

    return () => {
      channel.unbind("vote", voteHandler);
      pusher.unsubscribe("poll");
    };
  }, [dataUserById]);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch((error) =>
        console.error("Notification permission request failed:", error)
      );
    }
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        rtl={rtl}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#121212" : "#ffffff",
        }}
      >
        {" "}
        {/* Added rtl prop */}
        <Toolbar sx={{ flexDirection: rtl?.flexDirection }}>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: rtl?.flexDirection === "row-reverse" ? 5 : null,
              marginRight: rtl?.flexDirection === "row" ? 5 : null, // Corrected indentation
              ...(open && { display: "none" }),
            }}
          >
            <GridMenuIcon />
          </IconButton>
          <Typography
            component="h1"
            sx={{
              fontSize: "20px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              color: theme.palette.mode === "dark" ? "#ffff" : "#121212",
              "@media (max-width: 600px)": {
                fontSize: "16px",
              },
              "& .css-fpudgs-MuiTypography-root": {
                height: "30px",
              },
            }}
          >
            {t("appBar.userName", { name: dataUserById?.Entities_name })}
          </Typography>
          {/* <div className="displayNone">{!token && <Logo />}</div> */}
          <Box flexGrow={1} />
          {/* <div className="displayNone">
            {!token && (
              <LisItem rtl={rtl} dispatch={dispatch} navigate={navigate} />
            )}
          </div> */}
          <Box flexGrow={1} />
          <Stack direction={"row"}>
            {!token && (
              <BottomSend
                onClick={() => {
                  navigate("/login");
                }}
              >
                تسجيل دخول
              </BottomSend>
            )}
            {token ? (
              theme.palette.mode === "light" ? (
                <IconButton
                  // disabled
                  // color="inherit"
                  onClick={() => {
                    localStorage.setItem(
                      "currentMode",
                      theme.palette.mode === "dark" ? "light" : "dark"
                    );
                    setMode((prevMode) =>
                      prevMode === "light" ? "dark" : "light"
                    );
                  }}
                  // color="inherit"
                >
                  <LightModeOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton
                  // disabled
                  // color="inherit"
                  onClick={() => {
                    localStorage.setItem(
                      "currentMode",
                      theme.palette.mode === "dark" ? "light" : "dark"
                    );
                    setMode((prevMode) =>
                      prevMode === "light" ? "dark" : "light"
                    );
                  }}
                  // color="inherit"
                >
                  <DarkModeOutlinedIcon />
                </IconButton>
              )
            ) : null}
            {token && (
              <>
                {/* <AccountMenu votes={votes} info={info} /> */}
                {/* <ApproveBooked votes={votes} info={dataUserById} /> */}
                <AccountMenu
                  votes={votes}
                  info={dataUserById}
                  setVotes={setVotes}
                />
              </>
            )}
            {!token && (
              <div className="showMenuList">
                <DropDownMenu navigate={navigate} />
              </div>
            )}
            {token && <DrobMenueAuth navigate={navigate} dispatch={dispatch} />}{" "}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Appbar;

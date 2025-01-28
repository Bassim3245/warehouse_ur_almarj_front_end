import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Login, Logout } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice/userSlice";
import { setLanguage } from "../redux/LanguageState";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoleAndUserId } from "../redux/RoleSlice/rolAction";
import { GridMenuIcon } from "@mui/x-data-grid";
import { BottomSend } from "../utils/Content";
import Pusher from "pusher-js";
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
const TopBar = ({ open, handleDrawerOpen, setMode, info }) => {
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state.language;
  });
  const { Permission, roles, loading } = useSelector(
    (state) => state?.RolesData
  );
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);

  const [token, setoken] = useState(localStorage?.getItem("token"));
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
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const handleDirectionArabic = () => {
    const language = "ar";
    i18n.changeLanguage("ar");
    localStorage.setItem("language", "ar");
    dispatch(setLanguage(language));
  };
  const handleDirectionEnglish = () => {
    const language = "en";
    i18n.changeLanguage("en");
    dispatch(setLanguage(language));
    localStorage.setItem("language", "en");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleProfile = () => {
    navigate("Profile");
  };
  const location = useLocation();
  useEffect(() => {
    const userId = info?.id;
    if (userId) {
      dispatch(getRoleAndUserId({ userId, token }));
    }
  }, [location]);
  useEffect(() => {
    if (!info?.user_id || !info?.entities_id) {
      console.error("Missing user information.");
      return;
    }
    const pusher = new Pusher("981e65db6d4dc90983b4", {
      cluster: "us3",
      encrypted: true,
    });
    const channel = pusher.subscribe("poll");
    const voteHandler = (eventData) => {
      console.log("departmenentittId:", eventData?.entities_id);
      if (
        eventData?.userId === info?._id ||
        info?.entities_id === eventData?.entities_id
      ) {
        setVotes((prevVotes) => prevVotes + 1);
        if (eventData?.message) {
          toast.success(eventData.message || "Vote received", {
            position: "top-right",
            style: {
              backgroundColor: "black",
              color: "white",
            },
          });
        }
      }
    };
    channel.bind("vote", voteHandler);
    return () => {
      channel.unbind("vote", voteHandler);
      pusher.unsubscribe("poll");
    };
  }, [info]);
  return (
    <AppBar
      position="fixed"
      open={open}
      rtl={rtl}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#121212" : maintheme.paperColor,
      }}
    >
      {" "}
      {/* Added rtl prop */}
      <Toolbar sx={{ flexDirection: rtl?.flexDirection }}>
        <IconButton
          color="inherit"
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
            "@media (max-width: 600px)": {
              fontSize: "16px",
            },
            "& .css-fpudgs-MuiTypography-root": {
              height: "30px",
            },
          }}
        >
          {t("appBar.userName", { name: info?.user_name })}
        </Typography>

        <Box flexGrow={1} />
        <Box flexGrow={1} />
        <Stack direction={"row"}>
          <BottomSend>أتصل بنا</BottomSend>
          <IconButton
            color="inherit"
            onClick={() => {
              navigate("/login");
            }}
          >
            <Login />
          </IconButton>
          {theme.palette.mode === "light" ? (
            <IconButton
              // disabled
              color="inherit"
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
              color="inherit"
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
          )}
          <IconButton
            color="inherit"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={HandleProfile}>
              <Person2OutlinedIcon
                fontSize="small"
                sx={{ marginRight: "10px" }}
              />
              {t("appBar.dropdown.profile")}
            </MenuItem>
            {/* start icon language */}
            {rtl.flexDirection === "row" ? (
              <MenuItem onClick={handleDirectionArabic}>
                <FontAwesomeIcon
                  icon={faLanguage}
                  style={{ marginRight: "10px" }}
                />
                {t("appBar.dropdown.languageArabic")}
              </MenuItem>
            ) : (
              <MenuItem onClick={handleDirectionEnglish}>
                <FontAwesomeIcon
                  icon={faLanguage}
                  style={{ marginRight: "10px" }}
                />
                {t("appBar.dropdown.languageEnglish")}
              </MenuItem>
            )}
            {/* end Icon language */}
            <MenuItem
              onClick={() => {
                dispatch(logout());
              }}
            >
              <Logout fontSize="small" sx={{ marginRight: "10px" }} />
              {t("appBar.dropdown.logout")}
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

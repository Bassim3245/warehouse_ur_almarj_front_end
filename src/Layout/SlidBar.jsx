import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  Tooltip,
  List,
  Divider,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  AccountBox,
  Archive,
  EventAvailable,
  EventAvailableTwoTone,
  GroupAdd,
  Home,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Leaderboard,
  LocalShipping,
  ManageAccounts,
  NotificationAdd,
  Settings,
  Warehouse,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getRoleAndUserId } from "../redux/RoleSlice/rolAction";
import { logoutUser } from "../redux/userSlice/authActions";
import { hasPermission } from "../utils/Function";
import { useTranslation } from "react-i18next";
import logo from "../assets/image/image.png";

const drawerWidth = 300;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const SideBar = ({
  open,
  handleDrawerClose,
  dataUserById,
  rtl,
  token,
  theme,
}) => {
  const [info, setInfo] = useState(() =>
    JSON.parse(localStorage?.getItem("user"))
  );
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [permissionData, setPermissionData] = useState([]);
  const location = useLocation(); // Use location hook to get the current pathname
  const { t } = useTranslation();
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
  useEffect(() => {
    if (dataUserById?.user_id) {
      const userId = dataUserById?.user_id;
      dispatch(getRoleAndUserId({ token, userId }));
    }
  }, [location, dispatch, dataUserById?.user_id, token]);
  const [openPage, setOpenPage] = useState(false);
  const Route1 = [
    {
      category: "main",
      items: [
        {
          text: t(" الصفحة الرئيسية"),
          icon: <Home sx={{ transition: "transform 0.2s" }} />,
          path: "/",
          checkPermission: roles?.main_page?._id,
        },
        {
          text: t("التقارير"),
          icon: <Leaderboard sx={{ transition: "transform 0.2s" }} />,
          path: "/Reports",
          checkPermission: roles?.general_reports?._id,
        },

        {
          text: t("المخازن"),
          icon: <Warehouse sx={{ transition: "transform 0.2s" }} />,
          path: "Warehouses",
          checkPermission: roles?.show_all_data_warehouse?._id,
        },
      ],
    },
    {
      category: "operations",
      items: [
        {
          text: t("الشحنات"),
          icon: <LocalShipping sx={{ transition: "transform 0.2s" }} />,
          path: "Shipments",
          checkPermission: roles?.show_all_data_shipment?._id,
        },
        // {
        //   text: t("التقارير النقلية"),
        //   icon: <AutorenewSharp sx={{ transition: "transform 0.2s" }} />,
        //   // icon: <Dashboard sx={{ transition: "transform 0.2s" }} />,
        //   path: "DashboardWarehouse",
        //   checkPermission: roles?.management_Nonfiction?._id,
        // },
      ],
    },
    {
      category: "settings",
      items: [
        {
          text: t("اعدادات المخزن العامة"),
          icon: <Settings sx={{ transition: "transform 0.2s" }} />,
          path: "general-Setting",
          checkPermission: roles?.store_general_setting?._id,
        },
        {
          text: t("layout.MangeUser"),
          icon: <GroupAdd sx={{ transition: "transform 0.2s" }} />,
          path: "UserManagementAllUsers",
          checkPermission: roles?.management_Users?._id,
        },
        {
          text: t("layout.MangePermission"),
          icon: <ManageAccounts sx={{ transition: "transform 0.2s" }} />,
          path: "UserManagementFromEntities",
          checkPermission: roles?.management_user_from_entity?._id,
        },
      ],
    },
  ];

  const Route2 = [
    {
      category: "notifications",
      items: [
        {
          text: t("layout.Notification"),
          icon: <NotificationAdd sx={{ transition: "transform 0.2s" }} />,
          path: "Notification",
          checkPermission: roles?.management_Nonfiction?._id,
        },
      ],
    },
    {
      category: "information",
      items: [
        {
          text: t("layout.BasicInformation"),
          icon: <Settings sx={{ transition: "transform 0.2s" }} />,
          path: "MainInformation",
          checkPermission: roles?.setting_information?._id,
        },
        {
          text: t("layout.companyInformation"),
          icon: <AccountBox sx={{ transition: "transform 0.2s" }} />,
          path: "profile",
          checkPermission: roles?.show_profile?._id,
        },
      ],
    },
    {
      category: "logs",
      items: [
        // {
        //   text: t("layout.material movement"),
        //   icon: <Archive sx={{ transition: "transform 0.2s" }} />,
        //   path: "archive",
        //   checkPermission: roles?.show_archive?._id,
        // },
        {
          text: t("layout.log"),
          icon: <EventAvailableTwoTone sx={{ transition: "transform 0.2s" }} />,
          path: "AllLog",
          checkPermission: roles?.show_log?._id,
        },
        {
          text: t("layout.logEntity"),
          icon: <EventAvailable sx={{ transition: "transform 0.2s" }} />,
          path: "logEntity",
          checkPermission: roles?.show_log_entity?._id,
        },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" open={open} anchor={rtl?.anchor}>
      <DrawerHeader>
        <IconButton
          sx={{
            color: "#1e6a99",
            cursor: "pointer",
            backgroundColor: "#ebebeba0",
            borderRadius: "50%",
            border: "1px solid #1e6a99",
          }}
          onClick={handleDrawerClose}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <div className="right-section pt-3">
          <div className="logo-circle">
            <img
              src={logo}
              alt="Logo"
              className="main-logo"
              style={{
                width: open ? "100px" : "50px", // Adjust width based on `open`
                height: "100px", // Fixed height
              }}
            />
          </div>
        </div>
        {open && (
          <Typography
            sx={{
              textAlign: "center",
              mb: "10px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {rtl?.dir === "ltr" ? (
              <>
                The <span style={{ color: "orange" }}>General Secretariat</span>{" "}
                <br />
                of the Council of Ministers
              </>
            ) : (
              <>
                <span style={{ color: "orange" }}> منتجات أور</span> <br />
              </>
            )}
          </Typography>
        )}
      </Box>
      <Typography
        align="center"
        sx={{
          fontSize: open ? 17 : 0,
          transition: "0.25s",
          fontWeight: "normal",
        }}
      >
        {dataUserById?.user_name}
      </Typography>
      <Divider />
      <List dir={rtl.dir}>
        {Route1?.map((category) => (
          <Box key={category.category}>
            {category.items.map((item) => {
              const hasAccess = hasPermission(
                item?.checkPermission,
                permissionData
              );
              return (
                hasAccess && (
                  <ListItem
                    key={item.path}
                    disablePadding
                    sx={{
                      display: "block",
                      animation: "fadeIn 0.5s ease-in-out",
                      "@keyframes fadeIn": {
                        "0%": {
                          opacity: 0,
                          transform: "translateX(-20px)",
                        },
                        "100%": {
                          opacity: 1,
                          transform: "translateX(0)",
                        },
                      },
                    }}
                    dir={rtl.dir}
                  >
                    <Tooltip title={open ? null : item?.text} placement="left">
                      <ListItemButton
                        onClick={() => navigate(item?.path)}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          dir: rtl?.dir,
                          marginLeft: "10px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          transition: "all 0.3s ease",
                          bgcolor:
                            location.pathname === `/${item.path}` ||
                            location.pathname === item.path
                              ? theme.palette.mode === "dark"
                                ? grey[800]
                                : grey[300]
                              : null,
                          "&:hover": {
                            bgcolor:
                              location.pathname === `${item.path}` ||
                              location.pathname === item.path
                                ? theme.palette.mode === "dark"
                                  ? grey[700]
                                  : grey[400]
                                : theme.palette.action.hover,
                            "& .MuiListItemIcon-root": {
                              transform: "scale(1.1)",
                              color: maintheme?.mainColor,
                            },
                          },
                        }}
                        selected={location.pathname === `${item.path}`}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            textAlign: "center",
                            fontSize: "20px",
                            color:
                              theme.palette.mode === "dark"
                                ? ""
                                : maintheme?.mainColor,
                            transition: "transform 0.2s ease",
                          }}
                        >
                          {item?.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{
                            opacity: open ? 1 : 0,
                            textAlign: rtl.dir === "rtl" ? "start" : "",
                            marginRight: rtl.dir === "rtl" ? "10px" : "",
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                )
              );
            })}
            <Divider sx={{ my: 1 }} />
          </Box>
        ))}
      </List>
      <List dir={rtl?.dir}>
        <ListItem disablePadding sx={{ display: "block" }} dir={rtl.dir}>
          <Tooltip title={open ? null : `${t("More")}`} placement="left">
            <ListItemButton
              onClick={() => setOpenPage(!openPage)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                marginLeft: "10px",
                marginRight: "10px",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                  "& .MuiListItemIcon-root": {
                    transform: "scale(1.1)",
                    color: maintheme?.mainColor,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  transition: "transform 0.2s ease",
                }}
              >
                {openPage ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </ListItemIcon>
              <ListItemText
                primary={t("More")}
                sx={{
                  opacity: open ? 1 : 0,
                  textAlign: rtl?.dir === "rtl" ? "start" : "",
                  marginRight: rtl?.dir === "rtl" ? "10px" : "",
                  transition: "opacity 0.3s ease",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
      {openPage && (
        <List
          dir={rtl?.dir}
          sx={{
            animation: "slideDown 0.3s ease-out",
            "@keyframes slideDown": {
              "0%": {
                opacity: 0,
                transform: "translateY(-10px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {Route2.map((category) => (
            <Box key={category.category}>
              {category.items.map((item) => {
                const hasAccess = hasPermission(
                  item?.checkPermission,
                  permissionData
                );
                return (
                  hasAccess && (
                    <ListItem
                      key={item.path}
                      disablePadding
                      sx={{
                        display: "block",
                        animation: "fadeIn 0.5s ease-in-out",
                        "@keyframes fadeIn": {
                          "0%": {
                            opacity: 0,
                            transform: "translateX(-20px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateX(0)",
                          },
                        },
                      }}
                      dir={rtl.dir}
                    >
                      <Tooltip
                        title={open ? null : item?.text}
                        placement="left"
                      >
                        <ListItemButton
                          onClick={() => {
                            navigate(item?.path);
                            setOpenPage(false);
                          }}
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            dir: rtl?.dir,
                            marginLeft: "10px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            transition: "all 0.3s ease",
                            bgcolor:
                              location.pathname === `/${item.path}` ||
                              location.pathname === item.path
                                ? theme.palette.mode === "dark"
                                  ? grey[800]
                                  : grey[300]
                                : null,
                            "&:hover": {
                              bgcolor:
                                location.pathname === `${item.path}` ||
                                location.pathname === item.path
                                  ? theme.palette.mode === "dark"
                                    ? grey[700]
                                    : grey[400]
                                  : theme.palette.action.hover,
                              "& .MuiListItemIcon-root": {
                                transform: "scale(1.1)",
                                color: maintheme?.mainColor,
                              },
                            },
                          }}
                          selected={location.pathname === `${item.path}`}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              textAlign: "center",
                              fontSize: "20px",
                              color:
                                theme.palette.mode === "dark"
                                  ? ""
                                  : maintheme?.mainColor,
                              transition: "transform 0.2s ease",
                            }}
                          >
                            {item?.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.text}
                            sx={{
                              opacity: open ? 1 : 0,
                              textAlign: rtl.dir === "rtl" ? "start" : "",
                              marginRight: rtl.dir === "rtl" ? "10px" : "",
                              transition: "opacity 0.3s ease",
                            }}
                          />
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  )
                );
              })}
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
        </List>
      )}
      <Button
        sx={{
          mb: "10px",
          marginLeft: "10px",
          marginRight: "10px",
          backgroundColor: "#E1342A",
          color: "white",
        }}
        onClick={() => {
          const userId = info?.user_id;
          dispatch(logoutUser(userId));
        }}
      >
        <ExitToAppIcon />
      </Button>
    </Drawer>
  );
};

export default SideBar;

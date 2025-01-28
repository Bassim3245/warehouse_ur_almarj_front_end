import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Badge } from "@mui/material";
import { ExpandMore, NotificationsActive } from "@mui/icons-material";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { getToken } from "../../utils/handelCookie";
import NotificationCard from "../../components/CustomNotifictionCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { useEffect } from "react";
import { BottomSend } from "../../utils/Content";
import { useNavigate } from "react-router-dom";
export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [notification, setNotification] = React.useState([]);
  const [displayCount] = React.useState(7); // Number of notifications to display
  const navigate = useNavigate();
  const token = getToken();
  const dispatch = useDispatch();
  const { dataUserById } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch,token]);
  const fetchDataBooked = async () => {
    if (!dataUserById?.entity_id) return;
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getNotification/${dataUserById.entity_id}`,
        { headers: { authorization: token } }
      );
      setNotification(response?.data?.response || []);
    } catch (error) {
      console.error("Failed to fetch booked data:", error);
    }
  };
  useEffect(() => {
    fetchDataBooked();
  }, [ dataUserById?.entity_id, props?.votes]);
  const handleClick = (event) => {
    props?.setVotes(0);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const displayedNotifications = notification.slice(0, displayCount); // Limit to displayCount notifications
  const handleSeeMore = () => {
    navigate("Notification");
  };
  const handelNotification = async (item) => {
    try {
      const response = await axios.post(
        `${BackendUrl}/api/EditNotificationById`,
        { dataId: item?.notificationId },
        { headers: { authorization: getToken() } }
      );
      if (response) {
        navigate(`${item?.path}`);
      }
    } catch (error) {
      console.error("Failed to update notification:", error);
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="أشعارات">
          <div className={props?.votes ? "pulse" : ""}>
            <IconButton
              size="large"
              aria-label="show notifications"
              onClick={handleClick}
            >
              <Badge badgeContent={props?.votes} color="error">
                <NotificationsActive />
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              OverflowY: "auto",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {displayedNotifications?.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handelNotification(item)}
            sx={{ backgroundColor: item?.is_read ? "#f0f0f0" : "#fff" }}
          >
            <NotificationCard
              body={item?.message}
              title={item?.title}
              created_at={item?.created_at}
              path={item?.url}
              isRead={item.is_read}
              notificationId={item?.id}
            />
          </MenuItem>
        ))}
        {displayCount < notification.length && ( // Only show "See More" if there are more notifications
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <BottomSend sx={{ width: "50%" }} onClick={handleSeeMore}>
              <ExpandMore />
            </BottomSend>
          </Box>
        )}
      </Menu>
    </React.Fragment>
  );
}

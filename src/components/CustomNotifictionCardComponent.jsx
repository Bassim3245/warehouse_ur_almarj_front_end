import { IconButton, Typography, Box } from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { formatDateYearsMonth } from "../utils/Function";
import { Done } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { getToken } from "../utils/handelCookie";
import { BackendUrl } from "../redux/api/axios";
const NotificationCard = (props) => {
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const navigate = useNavigate();
  const handlePath = async () => {
    try {
      const response = await axios.post(
        `${BackendUrl}/api/EditNotificationById`,
        {dataId:props?.notificationId},
        { headers: { authorization: getToken() } }
      );
      if (response) {
        navigate(`${props?.path}`);
      }
    } catch (error) {
      console.error("Failed to update notification:", error);
    }
  };
  return (
    <Link onClick={() => handlePath()}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          width: props?.width ? props.width : "300px",
          borderBottom: "1px dashed lightgray",
          paddingBottom: 1, // Adds padding for better visual separation
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 1, // Adds space between title and body
          }}
          onclick={handlePath}
        >
          <Typography
            sx={{
              fontFamily: "Cairo-Medium",
              fontSize: "14px", // Corrected to '14px'
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              color: maintheme?.secondaryColor,
            }}
          >
            {props?.title || ""}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontFamily: "Cairo",
              direction: "rtl",
            }}
          >
            <small style={{ textAlign: "left" }}>
              {props?.created_at ? formatDateYearsMonth(props?.created_at) : ""}
            </small>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontFamily: "Cairo-Medium",
              fontSize: "12px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {props?.body || "لا يوجد إشعارات"}{" "}
            {/* Arabic text for "No notifications" */}
          </Typography>
          {props?.isRead ? (
            <IconButton
              onClick={handlePath}
              sx={{ width: "40px", height: "40px" }}
            >
              <Done style={{ color: "#126A99", fontSize: "20px" }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handlePath(props?.path)}
              sx={{ width: "40px", height: "40px" }}
            >
              <ReplyIcon style={{ color: "#126A99", fontSize: "20px" }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default NotificationCard;

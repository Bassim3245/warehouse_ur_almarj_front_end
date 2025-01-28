import * as React from "react";
import { Paper, Typography, IconButton, Box } from "@mui/material";
import { Delete, Done, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { getToken } from "../../utils/handelCookie";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { useEffect } from "react";
import { BottomClose, BottomSend } from "../../utils/Content";
import HeaderCenter from "../../components/HeaderCenterComponent";
import { CustomNoRowsOverlay, getTimeAgo } from "../../utils/Function";
import { useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
export default function Notification() {
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const [refresh, setRefresh] = React.useState(false);
  const [notification, setNotification] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(6); // Number of notifications to display
  const [loading,setLoading]=React.useState(false)
  const token = getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePath = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${BackendUrl}/api/EditNotificationById`,
        {dataId:data?.id},
        { headers: { authorization: token } }
      );
      if (response) {
        navigate(data?.url);
      }
    } catch (error) {
      console.error("Failed to update notification:", error);
    }finally{
      setLoading(false)
    }
  };
  const { dataUserById } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch, token]);

  const fetchDataBooked = async () => {
    setLoading(true)
    if (!dataUserById?.entity_id) return;
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getNotification/${dataUserById.entity_id}`,
        { headers: { authorization: token } }
      );
      setNotification(response?.data?.response || []);
    } catch (error) {
      console.error("Failed to fetch booked data:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDataBooked();
  }, [refresh, dataUserById?.entity_id]);

  const displayedNotifications = notification.slice(0, displayCount);

  const handleSeeMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  const handleDeleteItem = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${BackendUrl}/api/deleteNotificationById/${id}`,
        { headers: { authorization: token } }
      );
      if (response) {
        toast.success(response?.data?.message);
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false)
    }
  };

  const handelDeleteAll = async (isRead) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-3",
        cancelButton: "btn btn-danger",
        popup: "custom-swal-popup", // Add this line
      },
      buttonsStyling: false,
    });
    try {
      const result = await swalWithBootstrapButtons.fire({
        title: "هل انت متأكد من الحذف الاشعارات المقروئة ؟",
        text: "! لن تتمكن من التراجع عن الحذف ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "موافق",
        cancelButtonText: "لا , تراجع!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        // @ts-ignore
        const response = await axios({
          method: "get",
          url: `${BackendUrl}/api/deleteNotifications?isRead=${isRead}&&id=${dataUserById?.entity_id}`,
          headers: {
            authorization: token,
          },
        });
        if (response) {
          setRefresh((prv) => !prv);
        }
        swalWithBootstrapButtons.fire({
          title: "! تم الحذف ",
          text: "تم حذف القيد",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "تم التراجع",
          text: "",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {loading&&<Loader/>}
      <div className="mt-4">
        <HeaderCenter
          title={t("Notification.platform Notification")}
          typeHeader={"h4"}
        />

        <div className="container ">
          <div className="mb-3 d-flex gap-3" dir="rtl">
            <BottomSend onClick={() => handelDeleteAll(true)}>
              {t("Notification.Delete all read notifications")}
              <Delete />
            </BottomSend>
            <BottomClose onClick={() => handelDeleteAll(false)}>
              {t("Notification.Delete all unread notifications")}
              <Delete />
            </BottomClose>
          </div>
          {displayedNotifications.length > 0 ? (
            displayedNotifications?.map((item, index) => (
              <div key={index}>
                <Paper
                  sx={{
                    p: 1,
                    marginBottom: "10px",
                    backgroundColor: item?.is_read ? "#f0f0f0" : "#ffffff",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Cairo-Medium",
                          fontSize: "14px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          color: maintheme?.secondaryColor,
                        }}
                      >
                        {item?.title || ""}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontFamily: "Cairo", direction: "rtl" }}
                      >
                        <small>
                          {item?.created_at ? getTimeAgo(item?.created_at) : ""}
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
                        {item?.message || t("Notification.noNotifications")}
                      </Typography>
                      {item?.is_read ? (
                        <div className="d-flex">
                          <IconButton
                            onClick={() => handlePath(item)}
                            sx={{ width: "40px", height: "40px" }}
                          >
                            <Done
                              style={{ color: "#126A99", fontSize: "20px" }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteItem(item.id)}
                            sx={{ width: "40px", height: "40px" }}
                          >
                            <Delete
                              style={{ color: "#126A99", fontSize: "20px" }}
                            />
                          </IconButton>
                        </div>
                      ) : (
                        <IconButton
                          onClick={() => handlePath(item)}
                          sx={{ width: "40px", height: "40px" }}
                        >
                          <ReplyIcon
                            style={{ color: "#126A99", fontSize: "20px" }}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </div>
            ))
          ) : (
            <CustomNoRowsOverlay />
          )}
        </div>
      </div>
      {displayCount < notification?.length && (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <BottomSend sx={{ width: "50%" }} onClick={handleSeeMore}>
            <ExpandMore />
          </BottomSend>
        </Box>
      )}
    </React.Fragment>
  );
}

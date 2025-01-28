import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { ChatOutlined, Delete } from "@mui/icons-material";
import { getToken } from "../../utils/handelCookie";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import "../style.css";
import { CustomNoRowsOverlay, DeleteItem, getTimeAgo } from "../../utils/Function";
import ApproveComponent from "./ApproveComponent";
import MoreOption from "./MoreObtion";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserById } from "../../redux/userSlice/authActions";
import Loader from "../../components/Loader";
export default function ApproveBooked() {
  const token = getToken();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [openChat, setOpenChat] = useState(null); // Store the opened chat ID
  const [message, setMessage] = useState([]);
  const [dataBooked, setBooked] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const { dataUserById } = useSelector((state) => {
    return state?.user;
  });
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch]);
  const fetchDataBooked = async () => {
    setIsLoading(true)
    if (!dataUserById?.entity_id) return;
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataBookedFalse/${dataUserById.entity_id}`,
        { headers: { authorization: token } }
      );
      setBooked(response?.data?.response || []);
    } catch (error) {
      console.error("Failed to fetch booked data:", error);
    }finally{
      setIsLoading(false)
    }
  };
  const fetchMessages = async (id) => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${BackendUrl}/api/getDataMessageById/${id}`,
        { headers: { authorization: token } }
      );
      setMessage(response?.data?.response || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }setIsLoading(false)
  };
  useEffect(() => {
    fetchDataBooked();
  }, [refresh, dataUserById?.entity_id]);
  const handleOpenChat = async (id) => {
    if (openChat === id) {
      setOpenChat(null); // Close chat if it's already open
    } else {
      setOpenChat(id); // Open the clicked chat
      await fetchMessages(id); // Fetch messages for the selected item
    }
  };
  const handleDeleteItem = async (id) => {
    await DeleteItem(
      id,
      () => setRefresh((prev) => !prev),
      null,
      token,
      "cancelRequest"
    );
  };
  return (
    <Box
      className="container"
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      {isLoading&&<Loader/>}
      <Box sx={{ padding: "16px", width: "100%" }}>
        {dataBooked?.length > 0 ? (
          dataBooked?.map((item) => (
            <React.Fragment key={item?.book_id}>
              <Paper sx={{ p: 1, marginBottom: "10px" }}>
                <Typography>{getTimeAgo(item?.created_book_at)}</Typography>

                <Typography dir="rtl">
                  {`${item?.user_name} من ${item?.Entities_name} طلب حجز ${item?.quantity} عناصر من مادة ${item?.name_material}`}
                </Typography>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <IconButton onClick={() => handleDeleteItem(item?.book_id)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => handleOpenChat(item?.book_id)}>
                      <ChatOutlined />
                    </IconButton>
                  </div>
                  <ApproveComponent
                    book_id={item?.book_id}
                    material_id={item?.material_id}
                    path={"ApproveBooked"}
                    setRefresh={setRefresh}
                    edit={false}
                  />
                </div>
              </Paper>
              {openChat === item?.book_id &&
                message.map((msg) => (
                  <Paper
                    key={msg?.message_id}
                    sx={{ p: 1, marginBottom: "10px" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <Typography>{msg?.message}</Typography>
                      <MoreOption
                        msgId={msg?.id}
                        messageDe={msg?.message}
                        setRefresh={setRefresh}
                        setOpenChat={setOpenChat}
                      />
                    </div>
                  </Paper>
                ))}
            </React.Fragment>
          ))
        ) : (
           <CustomNoRowsOverlay />
        )}
     
      </Box>
    </Box>
  );
}

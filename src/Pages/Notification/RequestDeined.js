import React, { useState, useEffect, useCallback } from "react";
import { Box, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomTextField from "../../components/CustomTextField";
import PopupForm from "../../components/PopupForm";
import axios from "axios";
import { toast } from "react-toastify";
import { BackendUrl } from "../../redux/api/axios";
import { getToken } from "../../utils/handelCookie";
import { setLanguage } from "../../redux/LanguageState";
import { BottomRoot, BottomSend } from "utils/Content";
import { Edit } from "@mui/icons-material";

export default function RequestDenied(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = getToken();
  // Set the language when the component mounts
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  // Set message when editing
  useEffect(() => {
    if (props?.messageEdit) {
      setMessage(props?.messageEdit);
    }
  }, [props?.messageEdit]);
  // Handle form submission for creating a new rejection
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!message.trim()) {
        toast.error(t("Please provide a reason for rejection."));
        return;
      }
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("message", message);
        formData.append("book_id", props?.book_id);
        const response = await axios.post(
          `${BackendUrl}/api/MessageDeniedRegister`,
          formData,
          {
            headers: {
              authorization: token ,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(response?.data?.message);
        setOpen(false); // Close the form after successful submission
        props?.setOpen(false); // Close the parent form
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        console.error("Error rejecting request:", errorMessage);
        toast.error(t("Booking failed. Please try again."));
      } finally {
        setLoading(false);
      }
    },
    [message, props?.book_id, token, t]
  );

  // Handle form submission for editing a rejection message
  const handleEdit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!message.trim()) {
        toast.error(t("Please provide a reason for rejection."));
        return;
      }
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("dataEdit", message);
        formData.append("dataId", props?.msgId);
        const response = await axios.post(
          `${BackendUrl}/api/editMessageDe`,
          formData,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(response.data.message);
        setOpen(false); // Close the form after successful submission
        props?.setOpen(false); // Close the parent form
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        console.error("Error editing message:", errorMessage);
        toast.error(t("Booking failed. Please try again."));
      } finally {
        setLoading(false);
      }
    },
    [message, props?.msgId, token, t]
  );

  // Close the form
  const handleClose = () => {
    setOpen(false);
    props?.setOpen(false);
  };

  // Render form content
  const renderFormContent = () => (
    <Box component="form" sx={{ margin: "10px" }} onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mb: 2,
          mt: 2,
        }}
        dir="rtl"
      >
        <CustomTextField
          label={t("السبب")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onClearClick={() => setMessage("")}
          customWidth="100%"
          hasMultipleLine={true}
          required
        />
      </Box>
    </Box>
  );

  // Render form actions
  const renderFormActions = () => (
    <>
      <BottomRoot onClick={handleClose}>{t("close")}</BottomRoot>
      {props?.edit ? (
        <BottomSend type="submit" onClick={handleEdit} disabled={loading}>
          {loading ? t("loading") : t("save")}
        </BottomSend>
      ) : (
        <BottomSend type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? t("loading") : t("save")}
        </BottomSend>
      )}
    </>
  );

  return (
    <div>
      {props?.edit ? (
        <MenuItem onClick={() => setOpen(true)}>
          <Edit />
          {t("تعديل")}
        </MenuItem>
      ) : (
        <BottomSend
          onClick={() => setOpen(true)}
          className="btn btn-primary btn-lg btn-block"
        >
          {t("مرفوض")}
        </BottomSend>
      )}

      <PopupForm
        title={t("! يرجى توضيح سبب الرفض")}
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
        width="50%"
        content={renderFormContent()}
        footer={renderFormActions()}
      />
    </div>
  );
}



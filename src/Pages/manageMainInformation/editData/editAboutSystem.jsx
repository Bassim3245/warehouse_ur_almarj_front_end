import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomTextField from "../../../components/CustomTextField";
import { BottomSend } from "../../../utils/Content";
import { setLanguage } from "../../../redux/LanguageState";
import PopupForm from "components/PopupForm";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
import { getToken } from "../../../utils/handelCookie";

export default function ModelEdit({ aboutSystem }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [dataEdit, setDataEdit] = useState("");
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (aboutSystem) {
      setTitle(aboutSystem?.title || "");
      setDataEdit(aboutSystem?.text || "");
    }
  }, [aboutSystem]);
  useEffect(() => {
    setFormData({ title, dataEdit ,dataId:aboutSystem?.id});
  }, [title, dataEdit]);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BackendUrl}/api/editAboutSystem`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization:getToken()
          },
        }
      );
      if (response.data) {
        toast.success(response.data.message);
        setOpen(false);
        handleClose();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || t("errorOccurred");
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);

  const renderFormContent = () => (
    <Box
      sx={{ margin: "10px" }}
      component="form"
      onSubmit={handleSubmitEdit}
    >
      <Box sx={{ mb: 2, mt: 2, display: "flex", gap: 1 }} dir="rtl">
        <CustomTextField
          label={t("title")}
          haswidth
          value={title}
          required
          customWidth="100%"
          hasMultipleLine={false}
          paddingHorizontal="0px"
          onChange={(e) => setTitle(e.target.value)}
          onClearClick={() => setTitle("")}
        />
        <CustomTextField
          label={t("text")}
          haswidth
          value={dataEdit}
          required
          customWidth="100%"
          hasMultipleLine
          paddingHorizontal="0px"
          onChange={(e) => setDataEdit(e.target.value)}
          onClearClick={() => setDataEdit("")}
        />
      </Box>
    </Box>
  );

  const renderFormActions = () => (
    <>
      <Button onClick={handleClose}>{t("close")}</Button>
      <Button onClick={handleSubmitEdit}>{t("saveChange")}</Button>
    </>
  );
  return (
    <div>
      <BottomSend onClick={handleClickOpen}>{t("edit")}</BottomSend>
      <PopupForm
        title={t("edit_information")}
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

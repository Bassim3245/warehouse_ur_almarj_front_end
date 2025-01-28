import React, { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomTextField from "../../../components/CustomTextField";
import CustomeSelectField from "../../../components/CustomeSelectField";
import { BottomSend } from "../../../utils/Content";
import { BackendUrl } from "../../../redux/api/axios";
import { setLanguage } from "../../../redux/LanguageState";
import { getToken } from "../../../utils/handelCookie";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function ModelEdit(props) {
  const { edit_id, edit_path, label, edit_select, edit_value, dataMainClass } =
    props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(edit_value || "");
  const [select, setSelect] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const token = getToken();
  useEffect(() => {
    if (dataMainClass?.length && edit_select) {
      const selectedMainClass = dataMainClass.find(
        (item) => item.mainClass_id === edit_select
      );
      if (selectedMainClass) setSelect(selectedMainClass);
    }
  }, [dataMainClass, edit_select]);
  useEffect(() => {
    const selectMainClassId = select?.mainClass_id;
    const updatedFormData = {
      ...(dataEdit && { dataEdit }),
      ...(selectMainClassId && { selectMainClassId }),
      ...(edit_id && { dataId: edit_id }),
    };
    setFormData(updatedFormData);
  }, [dataEdit, select]);
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      console.log("edit_id",edit_id);
      
      setLoading(true);
      const response = await axios.post(
        `${BackendUrl}/api/${edit_path}`,
        formData,
        {
          headers: {
            authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        toast.success(response.data.message);
        props?.setRefresh?.((prev) => !prev);
        setOpen(false);
        props?.setOpen1?.(false);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  return (
    <div>
      <BottomSend onClick={handleClickOpen}>{t("edit")}</BottomSend>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        TransitionProps={{ timeout: 600 }}
      >
        <DialogTitle>{t("edit_information")}</DialogTitle>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            margin: "10px",
          }}
          component="form"
          onSubmit={handleSubmitEdit}
        >
          <Box>
            {label === "UintMeasuring" && (
              <>
                <Box sx={{ mb: "15px" }}>
                  <CustomTextField
                    label={t("Stagnant.measuringUnit")}
                    haswidth
                    value={dataEdit}
                    customWidth="100%"
                    hasMultipleLine
                    paddingHorizontal="0px"
                    onChange={(e) => setDataEdit(e.target.value)}
                    onClearClick={() => setDataEdit("")}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>{t("close")}</Button>
          <Button onClick={handleSubmitEdit}>{t("save")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

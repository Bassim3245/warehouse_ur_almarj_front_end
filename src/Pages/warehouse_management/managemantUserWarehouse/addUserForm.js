import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  FormHelperText,
  IconButton,
  Grid,
} from "@mui/material";
import PopupForm from "../../../components/PopupForm";
import { BackendUrl } from "../../../redux/api/axios";
import SaveIcon from "@mui/icons-material/Save";
import { getToken } from "../../../utils/handelCookie";
const AddUserToWarehouse = ({
  editMode = false,
  warehouse = [],
  token,
  dataUserById,
  setRefreshButton,
  dataUser,
  factoryData,
  labData,
  userwarehouseData,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    user_id: "",
    warehouse_id: "",
    factory_id: "",
    laboratory_id: "",
    status: "active",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);  // check if the value changes
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  useEffect(() => {
    if (userwarehouseData && editMode) {
      setFormData({
        user_id: userwarehouseData.user_id || "",
        warehouse_id: userwarehouseData.warehouse_id || "",
        factory_id: userwarehouseData.factory_id || "",
        laboratory_id: userwarehouseData.laboratory_id || "",
        status: userwarehouseData.status || "active",
      });
    }
  }, [userwarehouseData, editMode]);
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["user_id", "warehouse_id", "factory_id", "laboratory_id"];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = t("fieldRequired", { field: t(field) });
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t("please Fix Errors"));
      return;
    }

    setLoading(true);
    try {
      const payload = {
        user_id: formData.user_id,
        warehouse_id: formData.warehouse_id, 
        factory_id: formData.factory_id, 
        laboratory_id: formData.laboratory_id, 
        status: formData.status, 
      };

      const endpoint = editMode
        ? `${BackendUrl}/api/userWarehouseEdit`
        : `${BackendUrl}/api/userWarehouseRegister`;

      const response = await axios.post(endpoint, payload, {
        headers: {
          authorization: `${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(t(editMode ? "userUpdatedSuccess" : "userAddedSuccess"));
      setRefreshButton((prev) => !prev);
      handleClose();
    } catch (error) {
      console.error("Error submitting user data:", error);
      toast.error(
        error.response?.data?.message ||
        t(editMode ? "error Updating User" : "error Adding User")
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      user_id: "",
      warehouse_id: "",
      factory_id: "",
      laboratory_id: "",
      status: "active",
    });
    setErrors({});
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const renderFormContent = () => (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.user_id}>
            <InputLabel>المستخدم</InputLabel>
            <Select
              name="user_id"
              value={formData.user_id}
              label="المستخدمين"
              onChange={handleChange}
            >
              {dataUser.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.user_name}
                </MenuItem>
              ))}
            </Select>
            {errors.user_id && <FormHelperText>{errors.user_id}</FormHelperText>}
          </FormControl>

        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.warehouse_id}>
            <InputLabel>المستودع</InputLabel>
            <Select
              name="warehouse_id"
              value={formData.warehouse_id}
              label="المستودع"
              onChange={handleChange}
            >
              {warehouse.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.warehouse_id && <FormHelperText>{errors.warehouse_id}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.factory_id}>
            <InputLabel>المصنع</InputLabel>
            <Select
              name="factory_id"
              value={formData.factory_id}
              label="المصنع"
              onChange={handleChange}
            >
              {factoryData.map((factory) => (
                <MenuItem key={factory.id} value={factory.id}>
                  {factory.Factories_name}
                </MenuItem>
              ))}
            </Select>
            {errors.factory_id && <FormHelperText>{errors.factory_id}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.laboratory_id}>
            <InputLabel>المعمل</InputLabel>
            <Select
              name="laboratory_id"
              value={formData.laboratory_id}
              label="المعمل"
              onChange={handleChange}
            >
              {labData.map((lab) => (
                <MenuItem key={lab.id} value={lab.id}>
                  {lab.Laboratory_name}
                </MenuItem>
              ))}
            </Select>
            {errors.laboratory_id && <FormHelperText>{errors.laboratory_id}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.status}>
            <InputLabel>الحالة</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="الحالة"
              onChange={handleChange}
            >
              <MenuItem value="نشط">نشط</MenuItem>
              <MenuItem value="غير نشط">غير نشط</MenuItem>
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFormActions = () => (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        {editMode ? t("saveChange") : t("save")}
      </Button>
      <Button onClick={handleClose} variant="outlined" disabled={loading}>
        {t("close")}
      </Button>
    </Box>
  );

  return (
    <div>
      {!editMode && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
         اضافة مستخدم 
        </Button>
      )}

      {editMode && (
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon /> تعديل
        </IconButton>
      )}

      <PopupForm
        title={editMode ? "تعديل بيانات المستخدم" : "اضافة مستخدم"}
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
        width="100%"
        maxWidth="sm"
        content={renderFormContent()}
        footer={renderFormActions()}
      />
    </div>
  );
};

export default AddUserToWarehouse;

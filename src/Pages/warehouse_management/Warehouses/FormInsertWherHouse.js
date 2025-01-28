import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import PopupForm from "../../../components/PopupForm";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";

export default function WarehouseModel({
  editMode,
  token,
  setRefreshButton,
  setEditMode,
  setSelectedWarehouse,
  selectedWarehouse,
  dataUserById,
  warehouse,
  labData,
  wareHouseData,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    manager: "",
    used: 0,
    status: "نشط",
    code: "",
    factory_id: "",
    laboratory_id: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchDataUserEntityId = useCallback(async () => {
    if (!dataUserById?.entity_id) return;
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataUserManageBIdEntityWithoutLimit/${dataUserById.entity_id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.data) {
        setDataUser(response?.data?.response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(t("errorFetchingUserData"));
    }
  }, [dataUserById?.entity_id, token, t]);
  useEffect(() => {
    fetchDataUserEntityId();
  }, [fetchDataUserEntityId]);
  useEffect(() => {
    if (editMode) {
      setFormData({
        name: wareHouseData?.name,
        location: wareHouseData?.location,
        capacity: wareHouseData?.capacity,
        status: wareHouseData?.status,
        used: wareHouseData?.used,
        code: wareHouseData?.code,
      });
    }
  }, [wareHouseData]);

  const handleSubmit = async () => {
    // Validate form fields
    const requiredFields = ["name", "location", "capacity"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `يرجى إدخال: ${missingFields
          .map((field) =>
            field === "name"
              ? "اسم المخزن"
              : field === "location"
              ? "الموقع"
              : field === "capacity"
              ? "السعة الكلية"
              : field === "user_id"
              ? "اسم المدير"
              : field
          )
          .join(", ")}`
      );
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        warehouse_id: wareHouseData?.id && wareHouseData?.id,
        user_id: dataUserById?.user_id,
        ministry_id: dataUserById?.minister_id,
        entity_id: dataUserById?.entity_id,
        capacity: Number(formData.capacity),
      };
      const endpoint = editMode
        ? `${BackendUrl}/api/warehouseEdit`
        : `${BackendUrl}/api/warehouseRegister`;
      const method = axios.post;
      const response = await method(endpoint, payload, {
        headers: {
          authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        toast.success(response.data.message);

        setRefreshButton((prev) => !prev);
        setOpen(false);
      }

      // Reset form and edit mode
      setFormData({
        name: "",
        location: "",
        capacity: "",
        usd: 0,
        status: "نشط",
        code: "",
      });
      setEditMode(false);
      setSelectedWarehouse(null);
    } catch (error) {
      console.error("Error submitting warehouse data:", error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const renderFormContent = () => (
    <Box sx={{}}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="اسم المخزن"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="code"
            label="كود المخزن"
            value={formData.code}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="location"
            label="الموقع"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="capacity"
            label="السعة الكلية"
            type="number"
            value={formData.capacity}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="used"
            label="السعة المستخدمة"
            type="number"
            value={formData.used}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>مدير المخزن</InputLabel>
            <Select
              name="manager"
              value={formData.manager}
              label="مدير المخزن"
              onChange={handleInputChange}
            >
              {dataUser?.map((user) => (
                <MenuItem key={user?.id} value={user?.id}>
                  {user?.user_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="status"
            label="الحالة"
            value={formData.status}
            onChange={handleInputChange}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="نشط">نشط</option>
            <option value="تحت الصيانة">تحت الصيانة</option>
            <option value="مغلق">مغلق</option>
          </TextField>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>المصنع</InputLabel>
            <Select
              name="factory_id"
              value={formData.factory_id}
              label="المصنع"
              onChange={handleInputChange}
            >
              {factoryData.map((factory) => (
                <MenuItem key={factory.id} value={factory.id}>
                  {factory.Factories_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>المعمل</InputLabel>
            <Select
              name="laboratory_id"
              value={formData.laboratory_id}
              label="المعمل"
              onChange={handleInputChange}
            >
              {labData.map((lab) => (
                <MenuItem key={lab.id} value={lab.id}>
                  {lab.Laboratory_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
    </Box>
  );

  const renderFormActions = () => (
    <>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ mr: 2 }}
        disabled={loading}
      >
        {loading ? "جاري الحفظ..." : "إضافة"}
      </Button>

      <Button onClick={handleClose} variant="outlined" disabled={loading}>
        {t("close")}
      </Button>
    </>
  );
  return (
    <div>
      {!editMode && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          إضافة مخزن
        </Button>
      )}

      {editMode && (
        <MenuItem onClick={() => handleOpen()}>
          <EditIcon /> تعديل
        </MenuItem>
      )}
      <PopupForm
        title={editMode ? "تعديل مخزن" : "إضافة مخزن جديد"}
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
        width="100%"
        content={renderFormContent()}
        footer={renderFormActions()}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import PopupForm from "../../../components/PopupForm";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
import { ModeEditOutlined } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
export default function InventoryModel(props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataMaterial, setDataMaterial] = useState({
    code: "",
    name: "",
    balance: "",
    minimum_stock_level: "",
    price: "",
    specification: "",
    origin: "",
    measuring_id: "",
    production_date: null,
    materialId: "",
  });
  const [formData, setFormData] = useState({
    quantity_incoming_outgoing: "",
    expiry_date: null,
    purchase_date: null,
    document_date: null,
    document_number: "",
    beneficiary: "",
    state_id: "",
    price: "",
  });
  useEffect(() => {
    if (props?.typeOption === "outgoing") {
      setFormData((prev) => ({ ...prev, document_type: "مستند صادر" }));
    } else {
      setFormData((prev) => ({ ...prev, document_type: "مستند وارد" }));
    }
  }, [props?.typeOption]);
  const handleCodeChange = async (e) => {
    const code = e.target.value;
    setDataMaterial((prev) => ({ ...prev, code }));
    if (code && props?.dataUserById) {
      const entity_id = props?.dataUserById.entity_id;
      try {
        setLoading(true);
        const searchParams = new URLSearchParams();
        searchParams.append("search_term", code.trim());
        searchParams.append("entity_id", entity_id);
        searchParams.append("warehouse_id", props?.warehouseId);
        const response = await axios.get(
          `${BackendUrl}/api/inventoryGetDataByCode?${searchParams.toString()}`,
          {
            headers: {
              authorization: props?.token,
            },
          }
        );
        if (response?.data) {
          setDataMaterial({
            code: response.data?.data?.cod_material || "",
            name: response.data?.data?.name_of_material || "",
            balance: response.data?.data?.balance || "",
            minimum_stock_level: response.data?.data?.minimum_stock_level || "",
            price: response.data?.data?.price || "",
            specification: response.data?.data?.specification || "",
            origin: response.data?.data?.origin || "",
            measuring_id: response.data?.data?.measuring_id || "",
            production_date: response.data?.data?.production_date || null,
            materialId: response.data?.data?.id || "",
          });
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("حدث خطأ أثناء البحث");
        }
        // Clear the material data on error
        setDataMaterial({
          code: code,
          name: "",
          balance: "",
          minimum_stock_level: "",
          price: "",
          specification: "",
          origin: "",
          measuring_id: "",
          production_date: null,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditFunction = (dateString, setDateState) => {
    try {
      const parsedDate = dayjs(dateString);
      if (!parsedDate.isValid()) {
        const formattedDate = dayjs(dateString, "YYYY/MM/DD");
        if (formattedDate.isValid()) {
          setDateState(formattedDate);
        } else {
          console.error("Failed to parse date:", dateString);
          setDateState(null);
        }
      } else {
        console.log("parsedDate", parsedDate);

        setDateState(parsedDate);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
      setDateState(null);
    }
  };
  useEffect(() => {
    if (props?.addInventory === "addInventory" && props?.storeData) {
      setDataMaterial({
        code: props?.storeData.cod_material || "",
        name: props?.storeData.name_of_material || "",
        balance: props?.storeData.balance || "",
        specification: props?.storeData.specification || "",
        origin: props?.storeData.origin || "",
        measuring_id: props?.storeData.measuring_id || "",
        production_date: props?.storeData.production_date || null,
        minimum_stock_level: props?.storeData.minimum_stock_level || "",
        materialId: props?.storeData.id || "",
      });
      if (props?.storeData.production_date) {
        handleEditFunction(props?.storeData.production_date, (date) =>
          setFormData((prev) => ({ ...prev, production_date: date }))
        );
      }
    }
  }, [props?.addInventory, props?.storeData]);

  useEffect(() => {
    if (props?.editMode) {
      handleEditFunction(props?.InventoryData.production_date, (date) =>
        setFormData((prev) => ({ ...prev, production_date: date }))
      );
      handleEditFunction(props?.InventoryData.expiry_date, (date) =>
        setFormData((prev) => ({ ...prev, expiry_date: date }))
      );
      handleEditFunction(props?.InventoryData.purchase_date, (date) =>
        setFormData((prev) => ({ ...prev, purchase_date: date }))
      );
      handleEditFunction(props?.InventoryData.document_date, (date) =>
        setFormData((prev) => ({ ...prev, document_date: date }))
      );
      setDataMaterial({
        code: props?.InventoryData.cod_material,
        name: props?.InventoryData.name_of_material,
        balance: props?.InventoryData.balance,
        specification: props?.InventoryData?.specification,
        state_id: props?.InventoryData.state_id,
        origin: props?.InventoryData.origin,
        measuring_id: props?.InventoryData.measuring_id,
        production_date: props?.InventoryData.production_date,
        minimum_stock_level: props?.InventoryData.minimum_stock_level,
      });
      setFormData({
        document_number: props?.InventoryData.document_number,
        quantity_incoming_outgoing:
          props?.InventoryData.quantity_incoming_outgoing,
        price: props?.InventoryData.price,
        expiry_date: props?.InventoryData.expiry_date,
        purchase_date: props?.InventoryData.purchase_date,
        document_date: props?.InventoryData.document_date,
        beneficiary: props?.InventoryData?.beneficiary,
        state_id: props?.InventoryData?.state_id,
      });
    }
  }, [props?.editMode, props?.InventoryData]);
  const handleDateChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ? value.format("YYYY-MM-DD") : null,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = props?.editMode
        ? `inventoryEdit?inventory_id=${props?.InventoryData?.inventory_id}&material_id=${props?.InventoryData?.material_id}`
        : "inventoryRegister";
      const response = await axios({
        method: props?.editMode ? "put" : "post",
        url: `${BackendUrl}/api/${url}`,
        headers: {
          Accept: "application/json",
          authorization: props?.token,
          "Content-Type": "application/json",
        },
        data: {
          formData,
          entity_id: props?.dataUserById?.entity_id,
          user_id: props?.dataUserById?.user_id,
          ministry_id: props?.dataUserById?.minister_id,
          warehouse_id: props?.warehouseId,
          lab_id: props?.dataUserLab?.lab_id,
          factory_id: props?.dataUserLab.factory_id,
          material_id: dataMaterial?.materialId && dataMaterial?.materialId,
        },
      });
      if (response) {
        toast.success(response?.data?.message);
        props?.setRefreshButton((prev) => !prev); // Trigger data refresh
        handleClose();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء حفظ البيانات"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const renderFormContent = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {props?.dataUserLab?.Laboratory_name}
      </Typography>
      {props?.storeData ? (
        <Typography variant="h6" gutterBottom>
          {props?.storeData?.name_of_material}
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom></Typography>
      )}
      {props?.InventoryData?.id}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* Fetched Information Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="code"
            label="رقم رمزي"
            value={dataMaterial.code}
            onChange={handleCodeChange}
            fullWidth
            required
            error={!!errors.code}
            helperText={errors.code}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="اسم المنتج"
            value={dataMaterial.name}
            fullWidth
            required
            disabled
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="balance"
            label="الرصيد"
            value={dataMaterial.balance}
            fullWidth
            required
            disabled
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required disabled>
            <InputLabel>الوحدة</InputLabel>
            <Select
              name="measuring_id"
              value={dataMaterial.measuring_id}
              label="الوحدة"
              InputProps={{
                readOnly: true,
              }}
            >
              {props?.dataUnitMeasuring.map((item) => (
                <MenuItem key={item?.unit_id} value={item?.unit_id}>
                  {item?.measuring_unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="specification"
            label="المواصفة الفنية"
            type="text"
            value={dataMaterial.specification}
            fullWidth
            multiline
            rows={4}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="origin"
            label="المنشأ"
            type="text"
            value={dataMaterial.origin}
            fullWidth
            disabled
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="minimum_stock_level"
            label="الحد الادنى للمخزون"
            type="number"
            value={dataMaterial.minimum_stock_level}
            fullWidth
            disabled
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  الحد الادنا كمن المخزون
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="price"
            label="السعر"
            type="number"
            value={formData.price}
            fullWidth
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">دينار</InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* User Input Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="document_number"
            label="رقم المستند"
            value={formData.document_number}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.document_number}
            helperText={errors.document_number}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>حالة المادة</InputLabel>
            <Select
              name="state_id"
              value={formData.state_id}
              onChange={handleInputChange}
              label="حالة المادة"
            >
              {props?.stateMaterial.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.state_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="beneficiary"
            label=" الجهة المستفيدة"
            value={formData.beneficiary}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.beneficiary}
            helperText={errors.beneficiary}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="quantity_incoming_outgoing"
            label="الكمية صادرة أو واردة"
            type="number"
            value={formData?.quantity_incoming_outgoing}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.quantity_incoming_outgoing}
            helperText={errors.quantity_incoming_outgoing}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            name="quantity_outgoing"
            label="الكمية صادر"
            type="number"
            value={formData.quantity_outgoing}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.quantity_outgoing}
            helperText={errors.quantity_outgoing}
          />
        </Grid> */}

        {/* Date Pickers Section */}
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DatePicker
                label="تاريخ المستند"
                onChange={(value) => handleDateChange("document_date", value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formData.document_date === "",
                    helperText:
                      formData.document_date === "" ? "هذا الحقل مطلوب" : "",
                  },
                }}
              />
              <DatePicker
                label="تاريخ الانتاج"
                onChange={(value) => handleDateChange("production_date", value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formData.production_date === "",
                    helperText:
                      formData.production_date === "" ? "هذا الحقل مطلوب" : "",
                  },
                }}
              />
              <DatePicker
                label="تاريخ نفاذ الصلاحية"
                onChange={(value) => handleDateChange("expiry_date", value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formData.expiry_date === "",
                    helperText:
                      formData.expiry_date === "" ? "هذا الحقل مطلوب" : "",
                  },
                }}
              />
              <DatePicker
                label="تاريخ شراء المادة"
                onChange={(value) => handleDateChange("purchase_date", value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formData.purchase_date === "",
                    helperText:
                      formData.purchase_date === "" ? "هذا الحقل مطلوب" : "",
                  },
                }}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFormActions = () => (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        startIcon={<SaveIcon />}
      >
        {props?.editMode ? t("saveChange") : t("save")}
      </Button>
      <Button onClick={handleClose} variant="outlined" disabled={loading}>
        {t("close")}
      </Button>
    </>
  );

  return (
    <div>
      {props?.addInventory === "addInventory" ? (
        <MenuItem onClick={handleOpen} disableRipple>
          <AddIcon sx={{ color: "", fontSize: "20px" }} />
          <span className="ms-2">أظافة الى الجرد</span>
        </MenuItem>
      ) : !props?.editMode ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ p: 1 }}
          onClick={handleOpen}
        >
          أستمارة الجرد أضافة مادة
        </Button>
      ) : (
        <MenuItem onClick={handleOpen} disableRipple>
          <ModeEditOutlined sx={{ color: "", fontSize: "20px" }} />
          <span className="ms-2">تعديل</span>
        </MenuItem>
      )}
      <PopupForm
        title={
          props?.editMode
            ? props?.typeOption === "outgoing"
              ? "أستمارة تعديل مستند صادر"
              : "أستمارة تعديل مستند وارد "
            : props?.typeOption === "outgoing"
            ? "أستمارة أضافة مستند صادر"
            : "أستمارة أضافة مستند وارد "
        }
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

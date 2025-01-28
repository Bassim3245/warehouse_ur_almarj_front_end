import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InventoryIcon from "@mui/icons-material/Inventory";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomNoRowsOverlay,
  DeleteItem,
  formatDateYearsMonth,
  renderMenuItem,
} from "../../utils/Function";
import { useTranslation } from "react-i18next";
import DropDownGrid from "../../components/CustomMennu";
import {
  DeleteOutlined,
  LocalPrintshopOutlined,
  OpenInNew,
} from "@mui/icons-material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllDataInventory } from "../../redux/Inventiry/InventoryAction";
import { getAllWarehouse } from "../../redux/wharHosueState/WareHouseAction";
import { toast } from "react-toastify";
import HandelExcelFile from "../warehouse_management/Inventory/excelForm/HandelExcell";
import { getDataStateName } from "../../redux/StateMartrialState/stateMatrialAction";
import { getDataMinistries } from "../../redux/MinistriesState/MinistresAction";
import { getDataEntities } from "../../redux/EntitiesState/EntitiesAction";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { setLanguage } from "../../redux/LanguageState";
import { BackendUrl } from "../../redux/api/axios";
import { getToken } from "../../utils/handelCookie";
import StoreFormModel from "./FormModel";
import InventoryModel from "../warehouse_management/Inventory/FormModel";
const StoreData = () => {
  const { Ministries } = useSelector((state) => {
    // @ts-ignore
    return state?.Ministries;
  });
  const { Entities } = useSelector((state) => {
    // @ts-ignore
    return state?.Entities;
  });
  const { dataUserById } = useSelector((state) => {
    return state?.user;
  });
  const { wareHouseData } = useSelector((state) => state?.wareHouse);
  const { rtl } = useSelector((state) => state?.language);
  const { stateMaterial } = useSelector((state) => state?.StateMaterial);
  // const { InventoryData } = useSelector((state) => {
  //   return state.Inventory;
  // });
  const { dataUserLab } = useSelector((state) => {
    return state?.dataHandelUserAction;
  });
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterWarehouse, setFilterWarehouse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataMainClass, setDataMainClass] = useState([]);
  const [dataSubClass, setDataSubClass] = useState([]);
  const [dataUnitMeasuring, setDataUnitMeasuring] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10);
  const [refreshButton, setRefreshButton] = useState(false);
  const [deleteItem, setDelete] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [paramsQuery] = useSearchParams();
  const token = getToken();
  // get data
  useEffect(() => {
    // @ts-ignore
    dispatch(getDataStateName());
    dispatch(getDataMinistries());
    dispatch(getDataEntities());
    dispatch(getRoleAndUserId(token));
    dispatch(getDataUserById(token));
    dispatch(setLanguage());
  }, [dispatch, token]);

  const [dataMaterials, setDataMaterials] = useState([]);
  // get Warehouse
  useEffect(() => {
    if (dataUserById) {
      const entity_id = dataUserById.entity_id;
      const minister_id = dataUserById.minister_id;
      if (entity_id && minister_id) {
        dispatch(getAllWarehouse({ minister_id, entity_id }));
      }
    }
  }, [dispatch, dataUserById, refreshButton]);
  //  serach data
  useEffect(() => {
    const fetchData = async () => {
      if (dataUserById) {
        const entity_id = dataUserById.entity_id;
        const minstry_id = dataUserById.minister_id;
        const factory_id = dataUserLab.factory_id;
        const lab_id = dataUserLab.lab_id;
        if (entity_id && minstry_id) {
          try {
            setLoading(true);
            const searchParams = new URLSearchParams();
            // Add all search parameters
            if (searchTerm.trim()) {
              // Search in material code, name, and specifications
              searchParams.append("search_term", searchTerm.trim());
            }
            if (filterStatus) {
              searchParams.append("state_id", filterStatus);
            }
            searchParams.append("entity_id", entity_id);
            searchParams.append("warehouse_id", paramsQuery.get("store_id"));
            searchParams.append("factory_id", factory_id);
            searchParams.append("lab_id", lab_id);
            searchParams.append("limit", limit);
            searchParams.append("page", page);
            const response = await axios.get(
              `${BackendUrl}/api/SearchStoreData?${searchParams.toString()}`,
              {
                headers: {
                  authorization: getToken(),
                },
              }
            );
            if (response?.data) {
              setDataMaterials(response.data.response || []);
              setTotalPages(response?.data?.pagination?.totalPages || 0);
              setTotalItems(response?.data?.pagination?.totalItems || 0);
            }
          } catch (error) {
            setDataMaterials([]);
            setTotalPages(0);
            setTotalItems(0);
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error("حدث خطأ أثناء البحث");
            }
          } finally {
            setLoading(false);
          }
        }
      }
    };
    // Add a small delay to prevent too many API calls while typing
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    dataUserById,
    page,
    limit,
    searchTerm,
    filterCategory,
    filterWarehouse,
    filterStatus,
    refreshButton,
    deleteItem,
    anchorEl
  ]);
  const handelSearch = () => {
    setPage(0);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const fetchUnitMeasuringData = axios.get(
          `${BackendUrl}/api/getAllDataUnits`,
          { headers: { authorization: token } }
        );
        const fetchDataMainClass = axios.get(
          `${BackendUrl}/api/getDataMainClass`,
          { headers: { authorization: token } }
        );
        const [unitMeasuringResponse, mainClassResponse] =
          await Promise.allSettled([
            fetchUnitMeasuringData,
            fetchDataMainClass,
          ]);
        // Set data or handle failures

        if (unitMeasuringResponse.status === "fulfilled") {
          setDataUnitMeasuring(
            unitMeasuringResponse.value?.data?.response || []
          );
        } else {
          console.error(
            "Failed to fetch unit measuring data:",
            unitMeasuringResponse.reason
          );
        }
        if (mainClassResponse.status === "fulfilled") {
          console.log("ggg", mainClassResponse.value?.data?.response);
          setDataMainClass(mainClassResponse.value?.data?.response || []);
        } else {
          console.error(
            "Failed to fetch main class data:",
            mainClassResponse.reason
          );
          // Handle case where stagnant materials data isn't fetched correctly
          setDataMainClass([]);
          setTotalPages(0);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [refreshButton, page, limit, token]);
  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };
  useEffect(() => {
    if (dataUserById && dataUserLab) {
      const entity_id = dataUserById.entity_id;
      const minstry_id = dataUserById.minister_id;
      const factory_id = dataUserLab.factory_id;
      const lab_id = dataUserLab.lab_id;
      if (
        entity_id &&
        minstry_id &&
        dataUserLab.lab_id &&
        dataUserLab?.factory_id
      ) {
        dispatch(
          getAllDataInventory({ minstry_id, entity_id, lab_id, factory_id })
        );
      }
    }
  }, [dispatch, dataUserById]);

  const openMovement = (id) => {
    navigate(`/material-movement?material_id=${id}`);
  };
  const rows =
    dataMaterials?.map((item, index) => ({
      index: index + 1,
      ...item,
    })) || [];
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <InventoryIcon sx={{ fontSize: 35 }} />
          إدارة المخزون
        </Typography>
        <div className="d-flex gap-2">
          <Button
            variant="contained"
            color="primary"
            onClick={handelSearch}
            disabled={loading}
            startIcon={<SearchIcon />}
          >
            {loading ? "جاري الحفظ..." : "بحث"}
          </Button>
          <StoreFormModel
            handleClose={handleClose}
            editMode={false}
            stateMaterial={stateMaterial}
            Ministries={Ministries}
            Entities={Entities}
            dataMainClass={dataMainClass}
            dataUnitMeasuring={dataUnitMeasuring}
            dataProduct={dataProduct}
            open={open}
            token={token}
            setRefreshButton={setRefreshButton}
            dataUserById={dataUserById}
            wareHouseData={wareHouseData}
            warehouseId={paramsQuery?.get("store_id")}
            dataUserLab={dataUserLab}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            disabled={loading}
            onClick={() => {
              navigate(
                `/Inventory/print-Inventory?store_id=${paramsQuery.get(
                  "store_id"
                )}`
              );
            }}
            startIcon={<LocalPrintshopOutlined />}
          >
            {loading ? "جاري الحفظ..." : "طباعة التقرير"}
          </Button>
          <HandelExcelFile
            handleClose={handleClose}
            stateMaterial={stateMaterial}
            Ministries={Ministries}
            Entities={Entities}
            dataMainClass={dataMainClass}
            dataUnitMeasuring={dataUnitMeasuring}
            dataProduct={dataProduct}
            open={open}
            token={token}
            setRefreshButton={setRefreshButton}
            dataUserById={dataUserById}
            wareHouseData={wareHouseData}
            warehouseId={paramsQuery.get("store_id")}
            dataUserLab={dataUserLab}
          />
        </div>
      </Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="بحث بالاسم أو المواصفات الفنية أو بستخدام الرقم الرمزي..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>حالة المادة</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="حالة المادة"
            >
              <MenuItem value="">الكل</MenuItem>
              {stateMaterial?.map((status) => (
                <MenuItem key={status?.id} value={status?.id}>
                  {status?.state_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box dir={rtl?.dir} sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="inventory table">
              <TableHead
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    {t("الرقم الرمزي")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    {t("أسم المادة")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    {t(" المواصفات الفنية")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    {t("الرصيد")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    {t("تاريخ الانتاج")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    {t("Action")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows?.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="center">{row?.cod_material}</TableCell>
                      <TableCell align="center">
                        {row?.name_of_material}
                      </TableCell>
                      <TableCell align="center">{row?.specification}</TableCell>
                      <TableCell align="center">{row?.balance}</TableCell>
                      <TableCell>
                        {formatDateYearsMonth(row?.production_date)}
                      </TableCell>
                      <TableCell align="center">
                        <DropDownGrid>
                          <InventoryModel
                            handleClose={handleClose}
                            editMode={false}
                            addInventory={"addInventory"}
                            stateMaterial={stateMaterial}
                            Ministries={Ministries}
                            Entities={Entities}
                            dataMainClass={dataMainClass}
                            dataUnitMeasuring={dataUnitMeasuring}
                            dataProduct={dataProduct}
                            open={open}
                            token={token}
                            setRefreshButton={setRefreshButton}
                            dataUserById={dataUserById}
                            storeData={row}
                            wareHouseData={wareHouseData}
                            warehouseId={paramsQuery.get("store_id")}
                            dataUserLab={dataUserLab}
                          />
                          <Divider sx={{ my: 0.5 }} />
                          <StoreFormModel
                            handleClose={handleClose}
                            editMode={true}
                            addInventory={"addInventory"}
                            stateMaterial={stateMaterial}
                            Ministries={Ministries}
                            Entities={Entities}
                            dataMainClass={dataMainClass}
                            dataSubClass={dataSubClass}
                            dataUnitMeasuring={dataUnitMeasuring}
                            dataProduct={dataProduct}
                            open={open}
                            token={token}
                            setRefreshButton={setRefreshButton}
                            dataUserById={dataUserById}
                            storeData={row}
                            wareHouseData={wareHouseData}
                            warehouseId={paramsQuery.get("store_id")}
                            dataUserLab={dataUserLab}
                          />
                          <Divider sx={{ my: 0.5 }} />
                          {renderMenuItem(
                            "delete",
                            () =>
                              DeleteItem(
                                row.id,
                                setDelete,
                                setAnchorEl,
                                token,
                                "deleteStorDataById"
                              ),
                            DeleteOutlined,
                            "حذف"
                          )}
                          {renderMenuItem(
                            "informationProduct",
                            () => openMovement(row.id),
                            OpenInNew,
                            "حركات المادة"
                          )}
                        </DropDownGrid>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CustomNoRowsOverlay />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <TablePagination
              component="div"
              count={totalItems}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={limit}
              onRowsPerPageChange={(event) => {
                setLimit(parseInt(event.target.value, 10));
                setPage(0);
              }}
              labelRowsPerPage={t("عدد العناصر في الصفحة")}
              sx={{
                ".MuiTablePagination-toolbar": {
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                },
                ".MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-displayedRows":
                  {
                    margin: 0,
                  },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default StoreData;

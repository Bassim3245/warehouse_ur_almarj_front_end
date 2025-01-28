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
import { BackendUrl } from "../../../redux/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { getDataMinistries } from "../../../redux/MinistriesState/MinistresAction";
import { getDataEntities } from "../../../redux/EntitiesState/EntitiesAction";
import { getDataStateName } from "../../../redux/StateMartrialState/stateMatrialAction";
import { getToken } from "../../../utils/handelCookie";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import { getDataUserById } from "../../../redux/userSlice/authActions";
import {
  CustomNoRowsOverlay,
  DeleteItem,
  formatDateYearsMonth,
  renderMenuItem,
} from "../../../utils/Function";
import { useTranslation } from "react-i18next";
import DropDownGrid from "../../../components/CustomMennu";
import {
  DeleteOutlined,
  LocalPrintshopOutlined,
  OpenInNew,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllDataInventory } from "../../../redux/Inventiry/InventoryAction";
import { getAllWarehouse } from "../../../redux/wharHosueState/WareHouseAction";
import { toast } from "react-toastify";
import RefreshButtonData from "../../../components/RefreshButton";
import InventoryModel from "./FormModel";
import { typeDocument } from "../../../utils/arrayFuction";
const Inventory = () => {
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
  const [dataUnitMeasuring, setDataUnitMeasuring] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10);
  const [refreshButton, setRefreshButton] = useState(false);
  const [deleteItem, setDelete] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataMaterials, setDataMaterials] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = getToken();
  const [searchQuery] = useSearchParams();
  // get data
  useEffect(() => {
    // @ts-ignore
    dispatch(getDataStateName());
    dispatch(getDataMinistries());
    dispatch(getDataEntities());
    dispatch(getRoleAndUserId(token));
    dispatch(getDataUserById(token));
  }, [dispatch, token]);
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
            searchParams.append("warehouse_id", searchQuery?.get("store_id"));
            searchParams.append("limit", limit);
            searchParams.append("page", page);
            const response = await axios.get(
              `${BackendUrl}/api/SearchInventory?${searchParams.toString()}`,
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
        const [unitMeasuringResponse] = await Promise.allSettled([
          fetchUnitMeasuringData,
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
          // Handle case where stagnant materials data isn't fetched correctly
          setDataProduct([]);
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
          flexWrap: "wrap",
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
        <div className="d-flex gap-2 flex-wrap">
          <Button
            variant="contained"
            color="primary"
            onClick={handelSearch}
            disabled={loading}
            startIcon={<SearchIcon />}
          >
            {loading ? "جاري الحفظ..." : "بحث"}
          </Button>
          <InventoryModel
            handleClose={handleClose}
            editMode={false}
            stateMaterial={stateMaterial}
            Ministries={Ministries}
            Entities={Entities}
            dataUnitMeasuring={dataUnitMeasuring}
            dataProduct={dataProduct}
            open={open}
            token={token}
            setRefreshButton={setRefreshButton}
            dataUserById={dataUserById}
            wareHouseData={wareHouseData}
            warehouseId={searchQuery?.get("store_id")}
            typeOption={searchQuery?.get("typeOption")}
            dataUserLab={dataUserLab}
          />
          <RefreshButtonData
            refreshButton={refreshButton}
            setRefreshButton={setRefreshButton}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={() => {
              navigate(
                `/Inventory/print-Inventory?store_id=${searchQuery?.get(
                  "store_id"
                )}`
              );
            }}
            startIcon={<LocalPrintshopOutlined />}
          >
            {loading ? "جاري الحفظ..." : "طباعة التقرير"}
          </Button>
        </div>
      </Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="بحث برقم المستند..."
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
            <InputLabel>نوع المستند</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="نوع المستند"
            >
              <MenuItem value="">الكل</MenuItem>
              {typeDocument?.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
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
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("الرقم الرمزي")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("أسم المادة")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t(" الجهة المستفيدة")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("المواصفات الفنية")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("نوع المستند")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("الكمية الصادرةأو الواردة")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("الرصيد")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("تاريخ الشراء")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {t("تاريخ نفاذ الصلاحية")}
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
                      <TableCell align="center">{row?.beneficiary}</TableCell>
                      <TableCell align="center">{row?.specification}</TableCell>
                      <TableCell align="center">{row?.document_type}</TableCell>
                      <TableCell align="center">
                        {row?.quantity_incoming_outgoing}
                      </TableCell>
                      <TableCell align="center">{row?.balance}</TableCell>
                      <TableCell align="center">
                        {formatDateYearsMonth(row?.production_date)}
                      </TableCell>
                      <TableCell align="center">
                        {formatDateYearsMonth(row?.expiry_date)}
                      </TableCell>
                      <TableCell align="center">
                        <DropDownGrid>
                          <InventoryModel
                            handleClose={handleClose}
                            editMode={true}
                            stateMaterial={stateMaterial}
                            Ministries={Ministries}
                            Entities={Entities}
                            dataUnitMeasuring={dataUnitMeasuring}
                            dataProduct={dataProduct}
                            open={open}
                            token={token}
                            setRefreshButton={setRefreshButton}
                            dataUserById={dataUserById}
                            InventoryData={row}
                            wareHouseData={wareHouseData}
                            warehouseId={searchQuery?.get("store_id")}
                            dataUserLab={dataUserLab}
                          />
                          <Divider sx={{ my: 0.5 }} />
                          {renderMenuItem(
                            "delete",
                            () =>
                              DeleteItem(
                                row?.inventory_id,
                                setDelete,
                                setAnchorEl,
                                token,
                                "deleteInventoryById"
                              ),
                            DeleteOutlined,
                            "حذف"
                          )}
                          {renderMenuItem(
                            "informationProduct",
                            () => openMovement(row.material_id),
                            OpenInNew,
                            "حركات المادة"
                          )}
                        </DropDownGrid>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
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
export default Inventory;

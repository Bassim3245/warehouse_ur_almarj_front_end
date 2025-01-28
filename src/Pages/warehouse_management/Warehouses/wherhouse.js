import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  CircularProgress,
  Button,
} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import { getToken } from "../../../utils/handelCookie";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserById } from "../../../redux/userSlice/authActions";
import { getAllWarehouse } from "../../../redux/wharHosueState/WareHouseAction";
import { Link, useNavigate } from "react-router-dom";
import { AddCircleOutline, Output } from "@mui/icons-material";
const StorageManagement = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const dispatch = useDispatch();
  const { wareHouseData } = useSelector((state) => state.wareHouse);
  const { dataUserById } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await dispatch(getDataUserById(token));
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [dispatch, token, refresh]);
  useEffect(() => {
    const { entity_id } = dataUserById;
    dispatch(getAllWarehouse(entity_id));
  }, [dispatch, refresh]);
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          backgroundColor: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
            fontWeight: "bold",
          }}
        >
          <WarehouseIcon sx={{ fontSize: 35 }} />
          إدارة المخازن
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={() => setRefresh((prev) => !prev)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            },
          }}
        >
          تحديث
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            gap: 2,
          }}
        >
          <CircularProgress size={40} />
          <Typography variant="body1" color="text.secondary">
            جاري تحميل البيانات...
          </Typography>
        </Box>
      ) : wareHouseData.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <WarehouseIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
            لا توجد مخازن متاحة
          </Typography>
          <Typography variant="body2" color="text.secondary">
            لم يتم العثور على أي مخازن في النظام
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {wareHouseData?.map((warehouse) => (
            <Grid item xs={12} md={6} lg={4} key={warehouse?.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRadius: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.25)",
                  },
                }}
              >
                <Box sx={{ position: "relative", mb: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      pr: 8,
                    }}
                  >
                    {warehouse?.name}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor:
                        warehouse?.status === "ممتلئ"
                          ? "error.light"
                          : "success.light",
                      color: "white",
                      px: 2,
                      py: 0.5,
                      borderRadius: 16,
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {warehouse?.status}
                  </Box>
                </Box>

                <Box
                  dir={"rtl"}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {warehouse?.location}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  dir={"rtl"}
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  المدير: {warehouse?.user_name}
                </Typography>
                <Box sx={{ mb: 3 }}></Box>
                <Box
                  sx={{
                    mt: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`/StoreData?store_id=${warehouse?.id}`)
                    }
                    startIcon={<AddIcon />}
                    sx={{
                      gridColumn: "span 2",
                      borderRadius: 2,
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    أضافة مخزون
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Output />}
                    onClick={() =>
                      navigate(
                        `/Inventory?store_id=${warehouse?.id}&typeOption=outgoing`
                      )
                    }
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(63, 81, 181, 0.04)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    سحب مخزون
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleOutline />}
                    onClick={() =>
                      navigate(
                        `/Inventory?store_id=${warehouse?.id}&typeOption=incoming`
                      )
                    }
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(63, 81, 181, 0.04)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    أدخال مخزون
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<InventoryIcon />}
                    onClick={() =>
                      navigate(`/Inventory?store_id=${warehouse?.id}`)
                    }
                    sx={{
                      gridColumn: "span 2",
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(63, 81, 181, 0.04)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    جرد المادة
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StorageManagement;

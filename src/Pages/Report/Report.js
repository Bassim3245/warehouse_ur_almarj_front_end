import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import ReportModel from "./ReportModel";
import { getToken } from "../../utils/handelCookie";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { getAllWarehouse } from "../../redux/wharHosueState/WareHouseAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { toast } from "react-toastify";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
import { hasPermission } from "../../utils/Function";
import DashboardWarehouse from "../warehouse_management/Dashbord";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
}));
const inventoryData = [
  { name: "إلكترونيات", value: 300 },
  { name: "أثاث", value: 200 },
  { name: "مواد غذائية", value: 150 },
  { name: "ملابس", value: 250 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Reports = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [mainClassData, setMainClassData] = useState([]);
  const token = getToken();
  const [permissionData, setPermissionData] = useState([]);
  const dispatch = useDispatch();
  const { wareHouseData } = useSelector((state) => state.wareHouse);
  const { dataUserById } = useSelector((state) => state.user);
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const [setWareHouseData] = useState([]);
  useEffect(() => {
    const userId = dataUserById?.user_id;
    if (userId) {
      dispatch(getRoleAndUserId({ token, userId }));
    }
  }, [dispatch, dataUserById?.user_id, token]);
  useEffect(() => {
    if (Permission?.permission_id) {
      try {
        setPermissionData(JSON.parse(Permission.permission_id));
      } catch (error) {
        console.error("Error parsing permission_id:", error);
      }
    }
  }, [Permission]);
  useEffect(() => {
    const fetchDataByProjectId = async () => {
      try {
        setLoading(true);
        const [getDataMainClass] = await Promise.all([
          axios.get(`${BackendUrl}/api/getDataMainClass`, {
            headers: { authorization: token },
          }),
        ]);
        if (getDataMainClass) {
          setMainClassData(getDataMainClass?.data?.response);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataByProjectId();
  }, [dataUserById, token]);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDataUserById(token));
    };
    fetchData();
  }, [dispatch, token, refresh]);
  useEffect(() => {
    console.log("mainClassData", mainClassData);

    if (dataUserById) {
      const { entity_id } = dataUserById;
      dispatch(getAllWarehouse(entity_id));
    }
  }, [dataUserById, dispatch]);
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <ReportModel
          reportEntity="المخزون"
          entity_id={dataUserById?.entity_id}
          user_id={dataUserById?.user_id}
          wareHouseData={wareHouseData}
          permissionData={permissionData}
          loading={loading}
          mainClassData={mainClassData}
          roles={roles}
        />
        <Typography variant="h5" component="h2" gutterBottom>
          تقارير المخزون والمبيعات
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="time-range-label">الفترة الزمنية</InputLabel>
          <Select
            labelId="time-range-label"
            value={timeRange}
            label="الفترة الزمنية"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">أسبوع</MenuItem>
            <MenuItem value="month">شهر</MenuItem>
            <MenuItem value="quarter">ربع سنوي</MenuItem>
            <MenuItem value="year">سنة</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {hasPermission(roles?.allow_to_see_reports?._id, permissionData) && (
        <DashboardWarehouse />
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom align="right">
              توزيع المخزون حسب الفئة
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom align="right">
              استخدام المستودعات
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={warehouseUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="used"
                  name="المساحة المستخدمة"
                  fill="#8884d8"
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid> */}

        {/* <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom align="right">
              المبيعات والمشتريات الشهرية
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="المبيعات"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="purchases"
                  name="المشتريات"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid> */}
        {/* 
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom align="right">
              ملخص الأداء
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" align="center" color="primary">
                  85%
                </Typography>
                <Typography variant="body1" align="center">
                  كفاءة المخزون
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" align="center" color="secondary">
                  92%
                </Typography>
                <Typography variant="body1" align="center">
                  دقة التسليم
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" align="center" color="success.main">
                  78%
                </Typography>
                <Typography variant="body1" align="center">
                  استغلال المساحة
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" align="center" color="warning.main">
                  95%
                </Typography>
                <Typography variant="body1" align="center">
                  رضا العملاء
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid> */}
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3} sx={{ width: "100%" }}>
            <Typography variant="h6" gutterBottom align="right">
              التنبيهات والإشعارات
            </Typography>
            <Box sx={{ mt: 2, width: "100%" }}>
              <Typography
                variant="body1"
                color="error"
                sx={{ mb: 1 }}
                align="right"
              >
                5 منتجات وصلت للحد الأدنى للمخزون •
              </Typography>
              <Typography
                variant="body1"
                color="warning.main"
                sx={{ mb: 1 }}
                align="right"
              >
                3 شحنات متأخرة عن موعد التسليم •
              </Typography>
              <Typography
                variant="body1"
                color="info.main"
                sx={{ mb: 1 }}
                align="right"
              >
                8 طلبات جديدة تحتاج للمعالجة •
              </Typography>
              <Typography variant="body1" color="success.main" align="right">
                تم اكتمال 12 شحنة بنجاح اليوم •
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;

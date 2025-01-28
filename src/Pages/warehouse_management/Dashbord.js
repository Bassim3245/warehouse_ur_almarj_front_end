import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/handelCookie";
import { Factory, ManageAccounts } from "@mui/icons-material";
import { FcCollaboration } from "react-icons/fc";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}));
const DashboardWarehouse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();
  const { dataUserById } = useSelector((state) => {
    return state?.user;
  });
  useEffect(() => {
    // @ts-ignore
    dispatch(getDataUserById(token));
  }, [dispatch, token]);
  const [count, setCount] = React.useState({
    totalWarehouses: 0,
    totalUsers: 0,
  });
  const getDataCountForEntity = async (entity_id) => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataCountDataOfEntity?id=${entity_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response?.data) {
        setCount({
          totalWarehouses: response?.data?.total_count,
          totalUsers: response?.data?.totalCountUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dataUserById) {
      getDataCountForEntity(dataUserById.entity_id);
    }
  }, [dataUserById]);
  const menuItems = [
    {
      title: " المخازن",
      icon: <WarehouseIcon sx={{ fontSize: 40, color: "success.main" }} />,
      path: "/general-Setting",
      stat: `${count.totalWarehouses} المخازن`,
      description: "إدارة المخازن والمواقع",
    },
    {
      title: " المستخدمين الشركة ",
      icon: <ManageAccounts sx={{ fontSize: 40, color: "blue" }} />,
      path: "/UserManagementFromEntities",
      stat: `${count.totalUsers} مستخدم`,
      description: "إدارة المستخدمين والصلاحيات",
    },
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingBottom: "10px",
      }}
    >
      <Grid container spacing={4}>
        {menuItems?.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <StyledPaper elevation={3} onClick={() => navigate(item.path)}>
              {item.icon}
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2, color: "text.primary" }}
              >
                {item?.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ my: 2, color: "text.primary", fontWeight: "bold" }}
              >
                {item?.stat}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item?.description}
              </Typography>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardWarehouse;

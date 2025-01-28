import React, { useEffect, useState, useCallback } from "react";
import { GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import StyledDataGrid from "../../components/StyledDataGrid";
import { useParams } from "react-router";
import { ColorLink } from "../../utils/Content";
import { toast, ToastContainer } from "react-toastify";
import RefreshButtonData from "../../components/RefreshButton";
import Loader from "../../components/Loader";
import HeaderCenter from "../../components/HeaderCenterComponent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/handelCookie";
import { getDataUserById } from "../../redux/userSlice/authActions";

const SetPermissionFromEntities = (props) => {
  const { dataUserById } = useSelector((state) => {
    return state.user;
  });
  const { id } = useParams();
  const GroupId = props?.GroupId || "";
  const token = getToken();
  const [permissionData, setPermissionData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [dataRoleAndPermission, setDataRoleAndPermission] = useState({});
  const [filteredData, setFilteredData] = useState(null);
  const [dataRoleUser, setDataRoleUser] = useState({});
  const [refreshButton, setRefreshButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { rtl } = useSelector((state) => state?.language);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch]);
  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "permissionName",
      headerName: t("permission"),
      width: 200,
      cellClassName: "name-column--cell",
    },
  ];
  const getRoleAndUserId = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndUserId/${id}`,
        {
          headers: { authorization: token },
        }
      );
      setDataRoleUser(response?.data);
    } catch (error) {
      console.error("Error fetching role and user ID:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  // function to get data permission
  const getDataPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BackendUrl}/api/getPermissionsById?id=${dataUserById?.user_id}`,
        {
          headers: { authorization: token },
        }
      );
      setPermissionData(response?.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dataUserById?.user_id]);

  const getDataPermissionAndRole = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndPermission/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setDataRoleAndPermission(response?.data?.response);
      setSelectionModel(
        JSON.parse(response?.data?.response?.permission_id || "[]")
      );
    } catch (error) {
      console.error("Error fetching role and permission data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);
  useEffect(() => {
    setIsLoading(true);
    getRoleAndUserId();
    getDataPermission();
    getDataPermissionAndRole();
    setIsLoading(false);
  }, [
    getRoleAndUserId,
    getDataPermission,
    getDataPermissionAndRole,
    refreshButton,
  ]);
  useEffect(() => {
    if (Array.isArray(permissionData)) {
      setFilteredData(permissionData.find((item) => item?._id === GroupId));
    }
  }, [permissionData, GroupId]);
  const rows = permissionData?.map((item, index) => ({
    id: index + 1,
    _id: item?.id,
    permissionName: item?.permission_name,
  }));
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  const handleSetDataPermission = async () => {
    try {
      setIsLoading(true);
      const roleIdPermission = dataRoleAndPermission?.permissions_group_id;
      const response = await axios.post(
        `${BackendUrl}/api/setPermissionAndRole`,
        { selectionModel, userId: id, roleIdPermission },
        {
          headers: { authorization: token },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to save permissions.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "20px", marginRight: "20px" }}>
      {isLoading && <Loader />}
      <ToastContainer />
      <div dir={rtl?.dir}>
        <HeaderCenter title={t("titlePermission")} typeHeader={"h4"} />
        <ColorLink onClick={handleSetDataPermission}>
          {t("saveChange")}
        </ColorLink>
      </div>
      <Box>
        <StyledDataGrid
          autoPageSize
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModelChange}
          gridTheme={{ mainColor: "rgb(55, 81, 126)" }}
          rowSelectionModel={selectionModel}
          slots={{ toolbar: GridToolbar }}
          getRowHeight={() => "auto"}
          columnVisibilityModel={{ _id: false }}
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
      <RefreshButtonData setRefreshButton={setRefreshButton} />
    </Box>
  );
};

export default SetPermissionFromEntities;

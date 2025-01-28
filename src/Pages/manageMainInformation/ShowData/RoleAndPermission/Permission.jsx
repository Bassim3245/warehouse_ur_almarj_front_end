import React, { useEffect, useState, useCallback } from "react";
import { GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BackendUrl } from "../../../../redux/api/axios";
import axios from "axios";
import StyledDataGrid from "../../../../components/StyledDataGrid";
import { useParams } from "react-router";
import { BottomRoot, ColorLink } from "../../../../utils/Content";
import { ButtonClearState } from "../../../../utils/Content";
import { toast, ToastContainer } from "react-toastify";
import RefreshButtonData from "../../../../components/RefreshButton";
import Loader from "../../../../components/Loader";
import HeaderCenter from "../../../../components/HeaderCenterComponent";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
import { getToken } from "../../../../utils/handelCookie";

const Permission = (props) => {
  const { id } = useParams();
  const GroupId = props?.GroupId || "";
  const [permissionData, setPermissionData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [dataRoleAndPermission, setDataRoleAndPermission] = useState({});
  const [dataRoleAndPermissionGroup, setDataRoleAndPermissionGroup] = useState(
    {}
  );
  const { rtl } = useSelector((state) => state?.language);
  const [filter, setFilteredData] = useState(null);
  const [setDataRoleUser] = useState({});
  const [refreshButton, setRefreshButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading,setLoading]=useState(false)
  const { t } = useTranslation();
  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "permissionName",
      headerName: "Permission",
      width: 200,
      cellClassName: "name-column--cell",
    },
  ];
  const getRoleAndUserId = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndUserId/${id}`,  {
          headers: {
            authorization: getToken(),
          },
        }
      );
      setDataRoleUser(response?.data);
    } catch (error) {
      console.error("Error fetching role and user ID:", error);
    }finally{
      setLoading(false)
    }
  }, [id]);
  const getDataPermission = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BackendUrl}/api/getAllPermissions`,  {
        headers: {
          authorization: getToken(),
        },
      });
      setPermissionData(response?.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }finally{
      setLoading(false)
    }
  }, []);
  const getDataPermissionAndRole = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndPermission/${id}`,
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      setDataRoleAndPermission(response?.data?.response);
      setSelectionModel(
        JSON.parse(response?.data?.response?.permission_id || "[]")
      );
    } catch (error) {
      console.error("Error fetching role and permission data:", error);
    }finally{
      setLoading(false)
    }
  }, [id, getToken]);

  const getDataPermissionAndRoleGroup = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndPermissionIduseGrouID/${GroupId}`,
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      setDataRoleAndPermissionGroup(response?.data?.response);
      setSelectionModel(
        JSON.parse(response?.data?.response?.permission_id || "[]")
      );
    } catch (error) {
      console.error("Error fetching group role and permission data:", error);
    }finally{
      setLoading(false)
    }
  }, [GroupId, getToken]);

  useEffect(() => {
    setIsLoading(true);
    getRoleAndUserId();
    getDataPermission();
    if (props?.label === "setPermissionToGroup") {
      getDataPermissionAndRoleGroup();
    } else {
      getDataPermissionAndRole();
    }

    setIsLoading(false);
  }, [
    getRoleAndUserId,
    getDataPermission,
    getDataPermissionAndRole,
    getDataPermissionAndRoleGroup,
    props?.label,
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
      setLoading(true)
      const roleIdPermission = dataRoleAndPermission?.permissions_group_id;
      const response = await axios.post(
        `${BackendUrl}/api/setPermissionAndRole`,
        { selectionModel, userId: id, roleIdPermission },
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to save permissions.");
    }finally{
      setLoading(false)
    }
  };
  const handleSetPermissionGroup = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-3",
        cancelButton: "btn btn-danger",
        popup: "custom-swal-popup", // Add this line
      },
      buttonsStyling: false,
    });
    try {
      
      const result = await swalWithBootstrapButtons.fire({
        title: "هل انت متأكد من التحديث  ؟",
        text: "! سوف يتم أعادة ضبط جمع المستخدمين الذين يملكون هاذا الصفة بما فيهم المستخدمين الذي تم منحههم صلاحيات اظافية ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "موافق",
        cancelButtonText: "لا , تراجع!",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        const roleIdPermissionGroup =
          dataRoleAndPermissionGroup?.group_id || null;
         await axios.post(
          `${BackendUrl}/api/setPermissionAndRoleToEachGroup`,
          { selectionModel, GroupId, roleIdPermissionGroup },
          {
              headers: {
                authorization: getToken(),
              },
          }
        );
        swalWithBootstrapButtons.fire({
          title: "! تم التحديث ",
          text: "تم تحديث  المجموعة",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "تم التراجع",
          text: "",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ marginLeft: "20px", marginRight: "20px" }}>
      {loading&&<Loader/>}
      <ToastContainer />
      <div dir={rtl?.dir}>
        <HeaderCenter
          title={
            props?.label === "setPermissionToGroup"
              ? t("titlePermissionGroup")
              : t("titlePermission")
          }
          typeHeader={"h4"}
        />
      </div>
      <div className="d-flex gap-4">
        <BottomRoot
          onClick={() => {
            window.history.back();
          }}
        >
          {" "}
          <ArrowBack />
          {t("layout.Back")}
        </BottomRoot>
        {props?.label === "setPermissionToGroup" ? (
          <ButtonClearState onClick={handleSetPermissionGroup}>
            {t("saveChange")}
          </ButtonClearState>
        ) : (
          <ColorLink onClick={handleSetDataPermission}>
            {t("saveChange")}
          </ColorLink>
        )}
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

export default Permission;

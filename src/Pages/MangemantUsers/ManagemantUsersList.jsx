import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  Brightness1,
  DeleteOutlined,
  EnhancedEncryption,
  Search,
} from "@mui/icons-material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Header from "../../components/HeaderComponent.jsx";
import GridTemplate from "../../components/GridTemplet.jsx";
import DropDownGrid from "../../components/CustomMennu.jsx";
import UserMangeForm from "./UserManageForm.jsx";
import Loader from "../../components/Loader.jsx";
import RefreshButtonData from "../../components/RefreshButton.jsx";
import { setLanguage } from "../../redux/LanguageState.js";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction.js";
import { getDataMinistries } from "../../redux/MinistriesState/MinistresAction.js";
import { getDataEntities } from "../../redux/EntitiesState/EntitiesAction.js";
import { getToken } from "../../utils/handelCookie.jsx";
import {
  renderMenuItem,
  DeleteItem,
  hasPermission,
} from "../../utils/Function.jsx";
import { BackendUrl } from "../../redux/api/axios.js";
import FilterDataUser from "./filterUser.js";
const ManagementUsers = ({
  dataUser,
  totalItems,
  setRefreshButton,
  setDelete,
  pathLink,
  totalPages,
  allUser,
  page,
  limit,
  setPage,
  setLimit,
  loading,
  title,
  info,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { rtl } = useSelector((state) => state?.language);
  const { Permission, roles } = useSelector((state) => state.RolesData);
  const { Ministries } = useSelector((state) => state.Ministries);
  const { Entities } = useSelector((state) => state.Entities);
  const token = getToken();
  const [activeStatuses, setActiveStatuses] = useState({});
  const [permissionData, setPermissionData] = useState([]);
  const [ministryFilter, setMinistryFilter] = useState([]);
  const [entityFilter, setEntityFilter] = useState([]);
  const [groupFilter, setGroupFilter] = useState([]);
  const [DataGovernorate, setGovernorate] = useState([]);
  const [DataJobTitle, setJobTitle] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [FilterDataUserSearch, setFilterDataUser] = useState([]);
  const [UsersDataRow, setUserDataRow] = useState([]);
  // Parse permission data
  useEffect(() => {
    if (Permission?.permission_id) {
      try {
        const parsedData = JSON.parse(Permission.permission_id);
        setPermissionData(parsedData);
      } catch (error) {
        console.error("Error parsing permission_id:", error);
      }
    }
  }, [Permission]);

  // Fetch user role and ID
  useEffect(() => {
    dispatch(getRoleAndUserId(token));
  }, [dispatch, token]);

  // Set default language
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  // Filter Ministries and Entities based on info

  // Fetch ministries and entities on initial render
  const fetchData = useCallback(async () => {
    try {
      const rolesResponse = await axios.get(`${BackendUrl}/api/getRole`, {
        headers: {
          authorization: token,
        },
      });
      setDataGroup(rolesResponse?.data?.response || []);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  }, [token]);

  const fetchDataGo = async () => {
    try {
      const response = await axios?.get(
        `${BackendUrl}/api/getDataGovernorate`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setGovernorate(response?.data?.response);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  const fetchDataJob = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/getDataJobTitle`, {
        headers: {
          authorization: token,
        },
      });
      setJobTitle(response?.data?.response);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  const fetchAllData = async () => {
    try {
      await Promise.all([fetchData(), fetchDataGo(), fetchDataJob()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const dataFilterMinistry = Ministries?.filter(
      (item) => item?.id === info?.minister_id
    );
    const dataFilterEntity = Entities?.filter(
      (item) => item?.entities_id === info?.entity_id
    );
    const dataFilterGroup = dataGroup?.filter(
      (item) => item?.id !== 1 && item?.id !== 2
    );
    setGroupFilter(dataFilterGroup);
    setMinistryFilter(dataFilterMinistry);
    setEntityFilter(dataFilterEntity);
  }, [Entities, Ministries, info?.minister_id, info?.entity_id]);
  useEffect(() => {
    fetchAllData();
    dispatch(getDataMinistries());
    dispatch(getDataEntities());
  }, [dispatch]);

  // Handle toggle of user activation status
  const handleToggle = async (params) => {
    const { row } = params;
    const currentActiveState = activeStatuses[row?.active_id] ?? row?.is_active; // Get current state
    const newActiveState = !currentActiveState; // Determine new state
    try {
      const response = await axios.post(
        `${BackendUrl}/api/ActiveAccount`,
        {
          user_id: row?.user_id,
          is_active: newActiveState, // Set new active state
          dataId: row?.active_id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response?.status === 200) {
        toast.success(response?.data?.message); // Notify success
        // Update the state based on the successful response
        setActiveStatuses((prevState) => ({
          ...prevState,
          [row?.active_id]: newActiveState, // Update to new state
        }));
      } else {
        toast.error("Failed to update status."); // Notify failure
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("An error occurred while updating status."); // Notify error
    }
  };
  // open search
  const handleAddDataModel = useCallback(() => {
    setOpen((prev) => !prev);
  }, [open]);
  // Table columns definition
  useEffect(() => {
    if (FilterDataUserSearch.length > 0) {
      setUserDataRow(FilterDataUserSearch);
    } else {
      setUserDataRow(dataUser);
    }
  }, [FilterDataUserSearch, dataUser]);
  const columns = [
    { field: "id", headerName: "ID", hideable: false },
    { field: "index", headerName: "#", width: 33 },
    {
      field: "ministries",
      headerName: t("userManager.Ministry name"),
      flex: 1,
    },
    {
      field: "Entities_name",
      headerName: t("userManager.Entity name"),
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1,
    },
    {
      field: "user_name",
      headerName: t("userManager.user name"),
      flex: 1,
    },
    {
      field: "governorate_name",
      headerName: t("userManager.Entity address"),
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1,
    },
    {
      field: "email",
      headerName: t("userManager.email"),
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: t("userManager.phon number"),
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1,
    },
    {
      field: "group_name",
      headerName: t("userManager.group name"),
      flex: 1,
    },
    {
      field: "is_active",
      headerName: t("userManager.account status"),
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        const isActive =
          activeStatuses[params?.row?.active_id] ?? params?.row?.is_active;
        return allUser ? (
          <Button onClick={() => handleToggle(params)}>
            {isActive ? (
              <div
                className="d-flex align-items-center justify-content-between"
                style={{
                  border: "1px solid green",
                  borderRadius: "100px",
                  width: "90px",
                  color: "green",
                }}
              >
                <Typography
                  sx={{
                    marginRight: rtl.dir === "ltr" ? "-10px" : "10px",
                    marginLeft: rtl.dir === "ltr" ? "10px" : "-10px",
                  }}
                >
                  {t("userManager.active")}
                </Typography>
                <Brightness1 color="success" />
              </div>
            ) : (
              <div
                className="d-flex align-items-center justify-content-between"
                style={{
                  border: "1px solid red",
                  borderRadius: "100px",
                  fontSize: "10px",
                }}
              >
                <Brightness1 color="error" />
                <Typography
                  sx={{
                    marginRight: rtl.dir === "ltr" ? "10px" : null,
                    marginLeft: rtl.dir === "ltr" ? "10px" : "10px",
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  {" "}
                  {t("userManager.inactive")}
                </Typography>
              </div>
            )}
          </Button>
        ) : (
          <span>____</span>
        );
      },
    },
    {
      field: "Action",
      headerName: t("userManager.Action"),
      headerAlign: "center",
      flex: 0.5,
      renderCell: (params) => (
        <DropDownGrid>
          {allUser && (
            <UserMangeForm
              editInfo={true}
              DataUsers={params?.row}
              Entities={Entities}
              Ministries={Ministries}
              DataGovernorate={DataGovernorate}
              DataJobTitle={DataJobTitle}
              dataGroup={dataGroup}
              setRefreshButton={setRefreshButton}
            />
          )}
          {renderMenuItem(
            "permission",
            () => AddPermission(params?.row?.user_id),
            EnhancedEncryption,
            t("userManager.permission management")
          )}
          <Divider sx={{ my: 0.5 }} />
          {allUser &&
            renderMenuItem(
              "delete",
              () =>
                DeleteItem(
                  params?.row?.user_id,
                  setDelete,
                  setAnchorEl,
                  token,
                  "deleteDataUserManage"
                ),
              DeleteOutlined,
              t("delete")
            )}
        </DropDownGrid>
      ),
    },
  ];

  // Add Permission
  const AddPermission = (user_id) => {
    navigate(`/${pathLink}/${user_id}`);
  };

  // Data rows
  const rows = UsersDataRow?.map((item, index) => ({
    index: index + 1,
    ...item,
  }));
  return (
    <>
      <div style={{ width: "100%" }}>
        {loading && <Loader />}
        <Box
          dir={rtl?.dir}
          sx={{ marginLeft: "20px", marginRight: "20px", minWidth: "999px" }}
        >
          <Header title={title} dir={rtl?.dir} />
          {allUser ? (
            <Box sx={{ mb: 2, display: "flex", gap: "5px" }}>
              <UserMangeForm
                editInfo={false}
                DataUsers={null}
                allUser={allUser}
                Entities={Entities}
                Ministries={Ministries}
                DataGovernorate={DataGovernorate}
                DataJobTitle={DataJobTitle}
                dataGroup={dataGroup}
                setRefreshButton={setRefreshButton}
              />
              {!open && (
                <Button variant="outlined" onClick={handleAddDataModel}>
                  <Search />
                  <span>{t("search")}</span>
                </Button>
              )}
              <FilterDataUser
                setOpen={setOpen}
                open={open}
                setFilterDataUser={setFilterDataUser}
                page={page}
                limit={limit}
                setLimit={setLimit}
                totalItems={totalItems}
                totalPages={totalPages}
                setRefreshButton={setRefreshButton}
              />
            </Box>
          ) : (
            // dataUser?.filter((user) => user?.group_name === "User")?.length !==
            //   3 &&
            // hasPermission(roles?.admin_insert_user?._id, permissionData) && (
            //   <Box sx={{ mb: 2 }}>
            //     <UserMangeForm
            //       editInfo={false}
            //       DataUsers={null}
            //       Entities={entityFilter}
            //       Ministries={ministryFilter}
            //       DataGovernorate={DataGovernorate}
            //       DataJobTitle={DataJobTitle}
            //       dataGroup={groupFilter}
            //       setRefreshButton={setRefreshButton}
            //     />
            //   </Box>
            // )
            <> {null}</>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <GridTemplate
              rows={rows}
              columns={columns}
              setPage={setPage}
              page={page}
              limit={limit}
              setLimit={setLimit}
              totalItems={totalItems}
              totalPages={totalPages}
              btn={<RefreshButtonData onClick={setRefreshButton} />}
            />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ManagementUsers;

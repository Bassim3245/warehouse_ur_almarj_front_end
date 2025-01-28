import React, { useCallback, useEffect, useState } from "react";
import ManagementUsers from "./ManagemantUsersList";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { getToken } from "../../utils/handelCookie";
import { useTranslation } from "react-i18next";
function UserManagementFromEntities() {
  const { roles } = useSelector((state) => state.RolesData);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false); // Changed to false for better handling
  const [dataUser, setDataUser] = useState([]);
  const [deleteItem, setDelete] = useState([]); // Updated to match expected type (Array)
  const [totalPages, setTotalPages] = useState(0); // Set initial value to 0 for consistency
  const [totalItems, setTotalItems] = useState(0); // Set initial value to 0 for consistency
  const token = getToken();
  const [refreshButton, setRefreshButton] = useState(false);
  const { t } = useTranslation();
  const { dataUserById } = useSelector((state) => {
    return state?.user;
  });
  const dispatch = useDispatch();
  const fetchDataByProjectId = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataUserManageByIdEntities?page=${page}&limit=${limit}&id=${dataUserById.entity_id}&checkPermissionUser=${roles?.management_user_from_entity?._id}`,
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      if (response.data) {
        setDataUser(response?.data?.response);
        setTotalPages(response?.data?.pagination?.totalPages);
        setTotalItems(response?.data?.pagination?.totalItems);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    limit,
    roles?.management_user_from_entity?._id,
    dataUserById,
    token,
  ]); // Added necessary dependencies

  useEffect(() => {
    fetchDataByProjectId();
  }, [fetchDataByProjectId, refreshButton, deleteItem, page, limit]); // Added fetchDataByProjectId to dependencies
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch, getToken]);
  return (
    <div>
      <ManagementUsers
        dataUser={dataUser}
        totalPages={totalPages}
        totalItems={totalItems}
        setDelete={setDelete}
        page={page}
        setPage={setPage} // Ensure setPage is passed for pagination
        limit={limit}
        setLimit={setLimit}
        allUser={false}
        setRefreshButton={setRefreshButton}
        pathLink={"SetPermissionFromEntities"}
        loading={loading} // Optionally pass loading state to child
        title={`${t("userManager.user management")} ${
          dataUserById?.Entities_name
        }`}
        info={dataUserById}
      />
    </div>
  );
}

export default UserManagementFromEntities;

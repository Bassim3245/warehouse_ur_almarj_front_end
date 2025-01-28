import React, { useCallback, useEffect, useState } from "react";
import ManagementUsers from "./ManagemantUsersList";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/handelCookie";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { useTranslation } from "react-i18next";
function UserManagementAllUsers() {
  const { dataUserById } = useSelector((state) => {
    return state.user;
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [deleteItem, setDelete] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const {t}=useTranslation()
  const token = getToken();
  const [refreshButton, setRefreshButton] = useState(false);
  const { roles } = useSelector((state) => state.RolesData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch]);
  const fetchDataByProjectId = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataUserManage?page=${page}&limit=${limit}&id=${dataUserById.entity_id}&checkPermissionUser=${roles?.management_Users?._id}`,
        {
          headers: {
            authorization: token,
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
    dataUserById.entity_id,
    roles?.Add_Data_Users?._id,
    token,
    refreshButton,
  ]);
  useEffect(() => {
    fetchDataByProjectId();
  }, [fetchDataByProjectId, refreshButton, deleteItem, page, limit]);
  return (
    <div>
      <ManagementUsers
        dataUser={dataUser}
        totalPages={totalPages}
        totalItems={totalItems}
        setRefreshButton={setRefreshButton}
        setDelete={setDelete}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        allUser={true}
        pathLink={"Permission"}
        loading={loading} // Optional to handle loading state
        title={t("userManager.Authorized personnel information management")}
        info={dataUserById}
      />
    </div>
  );
}

export default UserManagementAllUsers;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/LanguageState.js";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios.js";
import LogList from "./LogLis.jsx";
import { getDataUserById } from "../../redux/userSlice/authActions.js";
import { getToken } from "../../utils/handelCookie.jsx";
const LogById = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const [deleteItem, setDelete] = useState([]);
  const [refreshButton, setRefreshButton] = useState(false);
  const [dataLog, setDataLog] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [loading, setLoading] = useState(null);
  const { roles } = useSelector((state) => state.RolesData);
  const token = getToken();
  const { dataUserById } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch, token]);
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  useEffect(() => {
    const fetchDataByProjectId = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BackendUrl}/api/getLogByEntityId?page=${page}&limit=${limit}&entityId=${dataUserById?.entity_id}&checkPermissionUser=${roles?.show_log_entity?._id}}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.data) {
          setDataLog(response?.data?.logs);
          setTotalPages(response?.data?.pagination?.totalPages);
          setTotalItems(response?.data?.pagination?.totalItems);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataByProjectId();
  }, [dataUserById, deleteItem, refreshButton, page, limit]);

  return (
    <>
      <LogList
        dataLog={dataLog}
        totalItems={totalItems}
        totalPages={totalPages}
        loading={loading}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        setRefreshButton={setRefreshButton}
        title={`سجل  ${dataUserById?.Entities_name}`}
      />
    </>
  );
};

export default LogById;

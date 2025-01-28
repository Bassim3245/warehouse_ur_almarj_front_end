import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/HeaderComponent.jsx";
import { Box } from "@mui/material";
import { setLanguage } from "../../redux/LanguageState.js";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios.js";
import Loader from "../../components/Loader.jsx";
import { BottomClose, BottomSend } from "../../utils/Content.jsx";
import "../style.css";
import { getToken } from "../../utils/handelCookie.jsx";
import ArchiveRecipient from "./Archivericever.jsx";
import ArchiveSender from "./ArchiveSender.jsx";
import { getDataUserById } from "../../redux/userSlice/authActions.js";
const Archive = () => {
  // State management
  const [page, setPage] = useState(1); // Current page for pagination
  const [limit, setLimit] = useState(10); // Limit for items per page
  const { rtl } = useSelector((state) => state.language); // Language direction (RTL or LTR)
  const { dataUserById } = useSelector((state) => {
    return state.user;
  });
  let token = getToken(); // JWT token for authentication
  const dispatch = useDispatch();
  const [deleteItem, setDelete] = useState([]); // Tracks items to be deleted
  const [refreshButton, setRefreshButton] = useState(false); // To refresh data on click
  const [loading, setLoading] = useState(null); // Loading state for data fetching
  const [totalPages, setTotalPages] = useState(0); // Total number of pages from pagination
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [dataMaterials, setDataMaterials] = useState([]); // Data for sent materials
  const [dataMaterialsBuy, setDataMaterialsBuy] = useState([]); // Data for received materials
  const [filterData, setFilterData] = useState([]); // Filtered data for display
  const [filter, setFilter] = useState(false); // Determines if we're showing sent or received materials
  const { roles } = useSelector((state) => state.RolesData); // User roles from Redux
  const { t } = useTranslation(); // Translation function
  // Set language on component mount
  useEffect(() => {
    dispatch(getDataUserById(token));
    dispatch(setLanguage());
  }, [dispatch]);
  // Fetch data function
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true); // Start loading
      try {
        // API calls to fetch data for both sent and received materials
        const fetchDataByProjectId = axios.get(
          `${BackendUrl}/api/getDataStagnantMaterialsBookedPa?entities_id=${dataUserById?.entity_id}&page=${page}&limit=${limit}&checkPermissionUser=${roles?.view_data_obsolete?._id}`,
          { headers: { authorization: token } }
        );
        const fetchDataByMaterialBuy = axios.get(
          `${BackendUrl}/api/getDataStagnantMaterialsBookedPByEntityBookedOrBuyTheMaterial?entities_id=${dataUserById?.entity_id}&page=${page}&limit=${limit}&checkPermissionUser=${roles?.view_data_obsolete?._id}`,
          { headers: { authorization: token } }
        );
        // Wait for both requests to finish
        const [stagnantMaterialsResponse, fetchDataByMaterialBuyResponse] =
          await Promise?.allSettled([
            fetchDataByProjectId,
            fetchDataByMaterialBuy,
          ]);
        // Process response for received materials
        if (stagnantMaterialsResponse.status === "fulfilled") {
          const fetchedData =
            stagnantMaterialsResponse.value.data?.response || [];
          const filterData =
            stagnantMaterialsResponse.value.data?.otherData || [];
          setFilterData(filterData); // Set filter data
          setDataMaterials(fetchedData); // Set materials data
          setTotalPages(
            stagnantMaterialsResponse.value.data?.pagination?.totalPages || 0
          );
          setTotalItems(
            stagnantMaterialsResponse.value.data?.pagination?.totalItems || 0
          );
        } else {
          console.error(
            "Failed to fetch stagnant materials data:",
            stagnantMaterialsResponse?.reason
          );
        }
        // Process response for sent materials
        if (fetchDataByMaterialBuyResponse.status === "fulfilled") {
          const fetchedData =
            fetchDataByMaterialBuyResponse.value.data?.response || [];
          const filterData =
            fetchDataByMaterialBuyResponse.value.data?.otherData || [];
          setFilterData(filterData); // Set filter data
          setDataMaterialsBuy(fetchedData); // Set buy materials data
          setTotalPages(
            fetchDataByMaterialBuyResponse.value.data?.pagination?.totalPages ||
              0
          );
          setTotalItems(
            fetchDataByMaterialBuyResponse.value.data?.pagination?.totalItems ||
              0
          );
        } else {
          console.error(
            "Failed to fetch stagnant materials buy data:",
            fetchDataByMaterialBuyResponse?.reason
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAllData();
  }, [
    dataUserById,
    deleteItem,
    refreshButton,
    page,
    limit,
    token,
    roles?.view_data_obsolete?._id,
  ]);

  // Toggle between sent and received materials
  const handelOpenRecipient = () => setFilter(false);
  const handelOpenSender = () => setFilter(true);
  return (
    <>
      {loading && <Loader />} {/* Display loader when fetching data */}
      <Box
        dir={rtl?.dir}
        sx={{ marginLeft: "20px", marginRight: "20px", minWidth: "999px" }}
      >
        {!filter ? (
          <Header title={t("حركة المواد المرسلة ")} dir={rtl?.dir} />
        ) : (
          <Header title={t("حركة المواد المستلمة ")} dir={rtl?.dir} />
        )}

        <div className="d-flex flex-wrap w-100 gap-3 mb-3">
          <BottomSend onClick={handelOpenSender}>المواد المستلمة</BottomSend>
          <BottomClose onClick={handelOpenRecipient}>
            المواد المرسلة
          </BottomClose>
        </div>

        {/* Conditionally render ArchiveRecipient or ArchiveSender based on filter */}
        {filter ? (
          <ArchiveRecipient
            setLimit={setLimit}
            setPage={setPage}
            dataMaterials={dataMaterialsBuy}
            page={page}
            limit={limit}
            totalItems={totalItems}
            totalPages={totalPages}
            t={t}
            info={dataUserById}
          />
        ) : (
          <ArchiveSender
            setLimit={setLimit}
            setPage={setPage}
            dataMaterials={dataMaterials}
            t={t}
            page={page}
            limit={limit}
            totalItems={totalItems}
            totalPages={totalPages}
            info={dataUserById}
          />
        )}
      </Box>
    </>
  );
};

export default Archive;

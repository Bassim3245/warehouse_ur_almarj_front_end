import { useSelector } from "react-redux";
import Header from "../../components/HeaderComponent.jsx";
import { Box, Typography } from "@mui/material";
import GridTemplate from "../../components/GridTemplet.jsx";
import RefreshButtonData from "../../components/RefreshButton.jsx";
import { formatDate } from "../../utils/Function.jsx";
import Loader from "../../components/Loader.jsx";
const LogList = ({
  dataLog,
  totalItems,
  totalPages,
  loading,
  limit,
  page,
  setRefreshButton,
  setPage,
  setLimit,
  title,
}) => {
  const { rtl } = useSelector((state) => state?.language);
  const columns = [
    { field: "stagnant_id", headerName: "id", hideable: false },
    {
      field: "index",
      headerName: "#",
      width: 33,
      renderCell: (params) => params.index,
    },
    {
      field: "action",
      headerName: "نوع الحدث",
      width: 200,
    },
    {
      field: "log",
      headerName: "السجل",
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography> {params?.row?.text}</Typography>
            <span style={{ color: "#263238", fontWeight: "bold" }}>
              {" "}
              {formatDate(params?.row?.created_At)}
            </span>
          </div>
        );
      },
    },
  ];
  const rows = dataLog?.map((item, index) => ({
    index: index + 1,
    ...item,
  }));
  return (
    <div style={{ width: "100%" }}>
      {loading && <Loader />}
      <Box
        dir={rtl?.dir}
        sx={{ marginLeft: "20px", marginRight: "20px", minWidth: "999px" }}
      >
        <Header title={title} dir={rtl?.dir} typeHeader={null} />
        <Box sx={{ mt: "15px" }}>
          <GridTemplate
            rows={rows}
            columns={columns}
            setPage={setPage}
            page={page}
            limit={limit}
            setLimit={setLimit}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </Box>
      </Box>
      <RefreshButtonData setRefreshButton={setRefreshButton} />
    </div>
  );
};

export default LogList;

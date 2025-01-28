import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import GridTemplate from "../../../components/GridTemplet";
import {
  DeleteItem,
  formatDateYearsMonth,
  renderMenuItem,
} from "../../../utils/Function";
import DropDownGrid from "../../../components/CustomMennu";
import Header from "../../../components/HeaderComponent";
import WarehouseModel from "../Warehouses/FormInsertWherHouse";
import RefreshButtonData from "../../../components/RefreshButton";
const StroeData = ({
  dataUserById,
  wareHouseData,
  dataUser,
  token,
  rtl,
  theme,
  t,
  loading,
  setLoading,
  refreshKey,
  setRefreshKey,
  totalItems,
  totalPages,
  limit,
  page,
  deleteItem,
  setDelete,
  anchorEl,
  setAnchorEl,
  setLimit,
  setPage,
}) => {
  const columns = [
    { field: "id", headerName: "ID", hideable: false, width: 70 },
    {
      field: "index",
      headerName: "#",
      width: 33,
      renderCell: (params) => params.index,
    },
    {
      field: "name",
      headerName: t("أسم المخزن"),
      flex: 1,
      minWidth: "150px",
      maxWidth: "175px",
    },
    {
      field: "user_name",
      headerName: t("أسم المدير"),
      flex: 1.5,
      minWidth: "150px",
      maxWidth: "175px",
    },
    {
      field: "location",
      headerName: t("الموقع"),
      flex: 1.5,
      minWidth: "150px",
      maxWidth: "175px",
    },
    {
      field: "status",
      headerName: t("الحالة"),
      flex: 1.5,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params?.row?.status === "active"
                ? theme.palette.success.light
                : theme.palette.error.light,
            color:
              params?.row?.status === "active"
                ? theme.palette.success.dark
                : theme.palette.error.dark,
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          {t(params?.row?.status)}
        </Box>
      ),
    },
    {
      field: "created_at",
      headerName: t("تاريخ الادخال"),
      flex: 1,
      renderCell: (params) => (
        <p>{formatDateYearsMonth(params.row.created_at)}</p>
      ),
    },
    {
      field: "Action",
      headerName: t("Action"),
      headerAlign: "center",
      flex: 0.5,
      renderCell: (params) => (
        <DropDownGrid>
          {renderMenuItem(
            "delete",
            () =>
              DeleteItem(
                params?.row?.id,
                setDelete,
                setAnchorEl,
                token,
                "deleteWareHouseById"
              ),
            DeleteOutlined,
            "حذف"
          )}
          <WarehouseModel
            editMode={true}
            token={token}
            refreshButton={refreshKey}
            setRefreshButton={setRefreshKey}
            dataUserById={dataUserById}
            wareHouseData={params?.row}
            // selectedWarehouse={selectedWarehouse}
            // warehouse={warehouse}
          />
        </DropDownGrid>
      ),
    },
  ];
  const rows = wareHouseData?.map((item, index) => ({
    index: index + 1,
    ...item,
  }));
  return (
    <Box dir="rtl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 0, display: "flex", alignItems: "center", gap: 1 }}>
          <WarehouseModel
            dataUserById={dataUserById}
            token={token}
            setRefreshButton={setRefreshKey}
            dataUser={dataUser}
            editMode={false}
          />
          <RefreshButtonData
            refreshButton={refreshKey}
            setRefreshButton={setRefreshKey}
          />
        </Box>
        <Header title={t("أضافة المخازن")} typeHeader={"h5"} />
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box dir={rtl?.dir} sx={{ minWidth: "999px" }}>
          <GridTemplate
            rows={rows}
            columns={columns}
            setLimit={setLimit}
            setPage={setPage}
            page={page}
            limit={limit}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </Box>
      )}
    </Box>
  );
};

export default StroeData;

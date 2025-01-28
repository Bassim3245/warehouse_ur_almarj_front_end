import React, { useState } from "react";
import { Box, Typography, CircularProgress, useTheme, Divider } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import AddUserToWarehouse from "./addUserForm";
import GridTemplate from "../../../components/GridTemplet";
import {
  DeleteItem,
  formatDateYearsMonth,
  renderMenuItem,
} from "../../../utils/Function";
import DropDownGrid from "../../../components/CustomMennu";
import Header from "../../../components/HeaderComponent";
import AddUserForm from './addUserForm'
const UserTable = ({
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
  setPage,
  deleteItem,
  setDelete,
  anchorEl,
  setAnchorEl,
  setLimit,
  labData,
  factoryData,
  userwarehouseData,
  ...props
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
      field: "user_name",
      headerName: t("المستخدم"),
      flex: 1,
      minWidth: "150px",
      maxWidth: "175px",
    },
    {
      field: "warehouse_name",
      headerName: t("المستودع"),
      flex: 1.5,
      minWidth: "150px",
      maxWidth: "175px",
    },
    {
      field: "Factories_name",
      headerName: "المصنع",
      flex: 1.5,
      minWidth: "150px",
      maxWidth: "175px",

    },
    {
      field: "Laboratory_name",
      headerName: t("المعمل"),
      flex: 1.5,
    },
    {
      field: "Entities_name",
      headerName: t("الجهة المستفيدة"),
      flex: 1.5,
    },
    {
      field: "status",
      headerName: t("الحالة"),
      flex: 1.5,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params?.row?.status === "نشط"
                ? theme.palette.success.light
                : theme.palette.error.light,
            color:
              params?.row?.status === "نشط"
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
                "deleteUserData"
              ),
            DeleteOutlined,
            "حذف"
          )}
          <Divider sx={{ my: 0.5 }} />
          <AddUserForm
            editMode={true}
            warehouse={wareHouseData}
            token={token}
            dataUserById={dataUserById}
            dataUser={dataUser}
            factoryData={factoryData}
            labData={labData}
            userwarehouseData={params?.row}

          />
        </DropDownGrid>
      ),
    },
  ];

  const rows = userwarehouseData?.map((item, index) => ({
    index: index + 1,
    ...item,
  }));
  console.log('rows', rows)
  return (
    <Box dir="rtl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 0 }}>
          <AddUserToWarehouse
            editMode={false}
            warehouse={wareHouseData}
            token={token}
            dataUserById={dataUserById}
            dataUser={dataUser}
            factoryData={factoryData}
            labData={labData}
            userwarehouseData={userwarehouseData}
          />
        </Box>

        <Header title={t("أضافة المستخدمين للمستودعات")} typeHeader={"h5"} />
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

export default UserTable;

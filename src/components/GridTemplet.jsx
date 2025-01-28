// @ts-ignore
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import StyledDataGrid from "./StyledDataGrid";
import { CustomNoRowsOverlay } from "../utils/Function";
import CostumePagination from "./CostumPagination";
import { getRowClassName } from "../utils/Content";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
const GridTemplate = ({
  columns,
  rows,
  setRowsPerPage,
  setPage,
  setLimit,
  page,
  limit,
  totalItems,
  totalPages,
  // totalProject,
}) => {
  const maintheme = useSelector((state) => state?.ThemeData?.globalTheme);
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
    <>
      <ToastContainer
        containerId="container_toast_id"
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box sx={{ height: 520, width: "100%"}}>
        <Box
          sx={{
            boxShadow:
              " 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
          }}
        >
          <StyledDataGrid
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              // toolbar: GridToolbar,
            }}
            sx={{ "--DataGrid-overlayHeight": "300px" }}
            gridTheme={{
              mainColor: maintheme?.mainColor,
            }}
            onStateChange={(state) => {
              // console.log("State change: ", state);
            }}
            // theme={theme}
            getRowHeight={() => "auto"}
            rows={rows}
            columns={columns}
            columnVisibilityModel={{
              stagnant_id: false,
              id: false,
            }}
            // autosizeOptions={autosizeOptions}

            getRowId={(row) => row?.index}
            hideFooter={true} // This line hides the footer
            // pagination
            // autoPageSize
            getRowClassName={getRowClassName}
          />
          <CostumePagination
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            page={page}
            setLimit={setLimit}
            limit={limit}
            totalItems={totalItems}
            totalPages={totalPages}
            // totalProject={totalProject}
          />
        </Box>
      </Box>
    </>

    </ThemeProvider>
  );
};

export default GridTemplate;

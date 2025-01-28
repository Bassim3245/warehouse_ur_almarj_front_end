import { Pagination, Paper, TablePagination } from "@mui/material";
import React from "react";
function CostumePagination({
  setPage,
  limit,
  page,
  totalItems,
  totalPages,
  setLimit,
}) {
  const handleChangePage = (event, newPage) => {
    if(newPage){
      setPage(newPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(1); // Reset to first page when rows per page changes
  };
  
  return (
    <div>
      <Paper
        dir="ltr"
        sx={{
          flexGrow: 1,
          minWidth: "333px",
          p: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "3px dashed rgba(0, 0, 0, 0.15)",
        }}
      >
        <TablePagination
          component="div"
          count={totalItems} // Total number of items
          page={page - 1} // Adjust for zero-based indexing
          onPageChange={(event, newPage) => handleChangePage(event, newPage + 1)}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-displayedRows": {
              display: "none",
            },
            "& .MuiToolbar-root .MuiTablePagination-actions": {
              display: "none",
            },
            "& .MuiTablePagination-selectLabel": {
              display: "none",
            },
            "& .MuiInputBase-root.MuiTablePagination-select": {
              borderRadius: "4px",
              padding: "10px",
              boxShadow:
                "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            },
          }}
        />

        <Pagination
          count={totalPages} // Total number of pages
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Paper>
    </div>
  );
}


export default CostumePagination;

import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

// @ts-ignore
const StyledDataGrid = styled(DataGrid)(
  ({ theme, rowCount, containerHasDirection, direction, gridTheme }) => ({
    backgroundColor:
      theme?.palette?.mode === "dark" ? "#0C0C0959" : "#FEFDFDF7",
    width: "100%",
    height: "auto",
    border: "none !important",
    boxShadow: "0 0 7px -2px rbga(0,0,0,0.4) !important",
    "& .highlighted-row-ended": {
      backgroundColor: "#d4f4d4a0",
    },
    "& .highlighted-row-CompleteProject": {
      backgroundColor: "#00c853",
    },
    "& .highlighted-row-ended:hover": {
      backgroundColor: "#d4f4d4a0",
    },
    "& .highlighted-row-odd": {
      backgroundColor: "#f4ff0036",
    },
    "& .highlighted-row-odd:hover": {
      backgroundColor: "#f4ff0021",
    },
    "& .highlighted-row-expired": {
      backgroundColor: " rgba(255, 0, 0, 0.3)",
    },
    "& .highlighted-row-near-expiration": {
      backgroundColor: "rgba(255, 255, 0, 0.3)",
    },
    "& .highlighted-row-even": {
      backgroundColor:
        theme?.palette?.mode === "dark"
          ? "rgba(255, 255, 255, 0.12)"
          : "#dcf0f1",
    },
    "& .highlighted-row-even:hover": {
      backgroundColor: "#dcf0f1a0",
    },
    "& .highlighted-row-copy": {
      backgroundColor: "#dcf0f1",
    },
    "& .highlighted-row-copy:hover": {
      backgroundColor: "#dcf0f1a0",
    },
    "& .MuiDataGrid-root": {
      boxShadow: "0 0 7px -2px rbga(0,0,0,0.4) !important",
    },
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
      // borderBottom:'1.8px dashed lightgrey !important'
    },
    "& .MuiDataGrid-row:last-child .MuiDataGrid-cell": {
      border: "none !important",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
      position: "relative !important",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontFamily: "Cairo-Bold",
    },
    "& .MuiDataGrid-cellContent,& .MuiDataGrid-cellContent div,& .MuiDataGrid-cellContent span,& .MuiDataGrid-cellContent p":
      {
        fontFamily: "Cairo-Medium",
        textAlign: direction == "rtl" ? "right !important" : "left !important",
        wordWrap: "break-word !important",
        spaceWord: "break-word !important",
        whiteSpace: "break-spaces !important",
        // overflow: "auto",
        padding: "10px",
        textOverflow: "ellipsis",
        // @ts-ignore
        whiteSpace: "wrap",
        // lineBreak: "anywhere !important",
      },
    // @ts-ignore
    "& .MuiDataGrid-cell": {
      minHeight: "60px !important",
      border: "none !important",
      outline: "none !important",
    },
    "& .MuiDataGrid-cell:not(:has(.MuiBadge-root)),& .MuiDataGrid-cell div:not(:has(.MuiBadge-root)),& .MuiDataGrid-cell span:not(.MuiBadge-root),& .MuiDataGrid-cell p:not(:has(.MuiBadge-root))":
      {
        fontFamily: "Cairo-Medium",
        textAlign: direction == "rtl" ? "left !important" : "right !important",
        wordWrap: "break-word !important",
        spaceWord: "break-word !important",
        whiteSpace: "break-spaces !important",
        overflow: "hidden",
        textOverflow: "ellipsis",
        // lineBreak: 'anywhere !important',
        display: "flex !important",
        fontSize: "14px",
      },
    "& .MuiDataGrid-cell .MuiDataGrid-cell ": {
      fontFamily: "Cairo-Medium",
      textAlign: direction == "rtl" ? "right !important" : "left !important",
      wordWrap: "break-word !important",
      spaceWord: "break-word !important",
      whiteSpace: "wrap !important",
      textOverflow: "ellipsis",
      // lineBreak: 'anywhere !important',
      display: "flex !important",
    },

    "& .MuiDataGrid-columnHeaderTitleContainerContent,& .MuiDataGrid-columnHeaderTitleContainerContent div,& .MuiDataGrid-columnHeaderTitleContainerContent span,& .MuiDataGrid-columnHeaderTitleContainerContent p":
      {
        fontFamily: "Cairo-Medium",
        textAlign: direction == "rtl" ? "right !important" : "left !important",
        color: "#fff",
      },
    "& .cutomeRenderHeader": {
      //  top:'-4px !important',
      position: "relative !important",
      right: "0 !important",
      height: "150px !important",
    },
    "& .MuiDataGrid-cell,& .MuiDataGrid-columnHeaderTitleContainer": {
      display: "flex !important",
      justifyContent:
        direction == "rtl" ? "end !important" : "start !important",
    },
    "& .MuiDataGrid-columnHeader": {
      // position: 'absolute !important', top: '0', left: '0',
      padding: "0 3px !important",
      backgroundColor: gridTheme?.mainColor,
      minHeight: "60px !important",
      maxHeight: "60px !important",
      // fontSize:"20px"
    },

    "& .MuiDataGrid-columnHeaderTitle,& .MuiSvgIcon-root": {
      // color: "#eee",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-menuIcon,& .MuiDataGrid-iconButtonContainer": {
      display: "none !important",
    },
    "& .MuiDataGrid-main": {
      // overflow:'scroll !important',
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
      // overflow: "auto !important"
      height: "7px",
    },
    "& .gridHeaderItem": {
      display: "flex",
      justifyContent:
        direction == "rtl" ? "flex-start !important" : "flex-end !important",
      alignItems: "start",
      alignSelf: direction == "rtl" ? "flex-end !important" : "start",
      fontSize: "12px !important",
    },

    "& .MuiDataGrid-virtualScrollerContent": {
      height: !rowCount ? "398px !important" : "auto",
    },

    "& .MuiCheckbox-root svg": {
      fill: "#000 !important",
    },
    "& .MuiDataGrid-columnHeaderTitleContainerContent,& .MuiDataGrid-cell": {
      fontSize: "13px !important",
    },
    "& .customeHeaderClassName": {
      alignItems:
        direction == "rtl" ? "flex-end !important" : "flex-start !important",
    },
    // @ts-ignore
    "& .MuiDataGrid-cell": {
      padding: "10px 7px !important",
      border: "0 !important",
    },
  })
);
export default StyledDataGrid;

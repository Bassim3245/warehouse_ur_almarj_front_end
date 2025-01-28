import moment from "moment";
import { BackendUrFile, BackendUrl } from "../redux/api/axios";
import axios from "axios";
import Swal from "sweetalert2";
import { Box, IconButton, MenuItem, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import wordImage from "../assets/image/word.png";
import pdfWord from "../assets/image/pdf_136522.png";
import { Download } from "@mui/icons-material";
import { getToken } from "./handelCookie";
const token = getToken();
// getImage
export function getFileIcon(fileName, fileInfo, label) {
  let fileExtension;
  if (label === "edit") {
    fileExtension = fileName;
  } else {
    fileExtension = fileInfo;
  }
  const extension = fileExtension?.split(".")?.pop()?.toLowerCase();
  if (extension === "pdf") {
    return (
      <div>
          <IconButton
            color="primary"
            sx={{
              color: "#1e6a99",
              cursor: "pointer",
              backgroundColor: "#ebebeba0",
              borderRadius: "50%",
            }}
            onClick={() => handleDownload(fileName)}
          >
            {" "}
            <Download />
          </IconButton>
        <img
          src={pdfWord} // Assuming pdfWord is the image source for PDF files
          style={{ width: "80px", maxWidth: "100%" }}
          className="mt-4 mb-4"
          alt="PDF Icon"
        />
      </div>
    );
  } else if (extension === "docx") {
    return (
      <div>
        {token && (
          <IconButton
            color="primary"
            sx={{
              color: "#1e6a99",
              cursor: "pointer",
              backgroundColor: "#ebebeba0",
              borderRadius: "50%",
            }}
            onClick={() => handleDownload(fileName)}
          >
            {" "}
            <Download />
          </IconButton>
        )}
        <img
          src={wordImage} // Assuming wordImage is the image source for Word files
          style={{ width: "200px", maxWidth: "100%" }}
          className="mt-4 mb-4"
          alt="DOCX Icon"
        />
      </div>
    );
  } else if (
    extension === "png" ||
    extension === "jpg" ||
    extension === "jpeg"
  ) {
    console.log("dd", extension);

    return (
      <div>
        {token && (
          <IconButton
            color="primary"
            sx={{
              color: "#1e6a99",
              cursor: "pointer",
              backgroundColor: "#ebebeba0",
              borderRadius: "50%",
            }}
            onClick={() => handleDownload(fileName)}
          >
            {" "}
            <Download />
          </IconButton>
        )}
        <img
          src={label === "edit" ? `${BackendUrFile}/${fileName}` : `${fileInfo}`}
          style={{ width: "200px", maxWidth: "100%" }}
          className="mt-4 mb-4"
          alt="Image"
        />
      </div>
    );
  } else {
    return null; // If the file type is not supported
  }
}

export const formatDate = (date) => {
  return moment(date).format("YYYY/MM/DD HH:mm"); // Return the formatted date
};
export const formatDateYearsMonth = (date) => {
  return moment(date).format("YYYY/MM/DD");
};

export const handleDownload = (file) => {
  const link = document.createElement("a");
  link.href = `${BackendUrFile}/${file}`;
  link.setAttribute("download", "");
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// end function to sum total price
export const DeleteItem = async (_id, setDelete, setAnchorEl, token, url) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ms-3",
      cancelButton: "btn btn-danger",
      popup: "custom-swal-popup", // Add this line
    },
    buttonsStyling: false,
  });
  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "هل انت متأكد من الحذف ؟",
      text: "! لن تتمكن من التراجع عن الحذف ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "موافق",
      cancelButtonText: "لا , تراجع!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      // @ts-ignore
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/${url}/${_id}`,
        headers: {
          authorization: token,
        },
      });
      if (response) {
        setDelete((prv) => !prv);
        setAnchorEl(null);
        // window.location.reload();
      }
      swalWithBootstrapButtons.fire({
        title: "! تم الحذف ",
        text: "تم حذف القيد",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "تم التراجع",
        text: "",
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// to check permission
export const hasPermission = (role, permissions) => {
  return Array.isArray(permissions) && permissions.includes(role);
};
// render menu
export const renderMenuItem = (key, onClick, IconComponent, text) => (
  <MenuItem key={key} onClick={onClick} disableRipple>
    <IconComponent size="large" style={{ color: "#1e6a99" }} />
    <span className="ms-2">{text}</span>
  </MenuItem>
);
// start function data if not found
export const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

export function CustomNoRowsOverlay() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <StyledGridOverlay theme={theme}>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>
        <h5>{t("NotFoundData")}</h5>
      </Box>
    </StyledGridOverlay>
  );
}
// end function
export function getTimeAgo(date) {
  const parsedDate = new Date(date);
  // Check if parsedDate is valid
  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }
  // Calculate the time ago with a suffix
  return formatDistanceToNow(date, { addSuffix: true });
}
// get only image
export const isImageFile = (images) => {
  if (!images || images.length === 0) return null;
  for (let i = 0; i < images.length; i++) {
    const fileName = images[i]?.file_name;
    const extension = fileName?.split(".").pop().toLowerCase(); // Get the file extension
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
        return `${BackendUrFile}/${fileName}`; // Return the first valid image URL
      case "pdf":
      case "doc":
      case "docx":
        // Skip PDF and Word files
        continue; // Skip this file and continue to the next iteration
      default:
        continue; // Skip other unknown file types
    }
  }
  return null; // Return null if no valid image file is found
};
export const FormatDataNumber = (number) => {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2, // أو عدد الأرقام العشرية التي تريدها
    maximumFractionDigits: 2  // أو عدد الأرقام العشرية التي تريدها
  }).format(number);
};
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
  "&.header": {
    backgroundColor: "#1e6a99",
    color: "#fff",
  },
  "&.warehouse-header": {
    backgroundColor: "#e3f2fd",
    color: "#1e6a99",
    fontSize: "1.1rem",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#1e6a99",
  margin: "20px 0",
  fontWeight: "bold",
  borderBottom: "2px solid #1e6a99",
  paddingBottom: "8px",
}));
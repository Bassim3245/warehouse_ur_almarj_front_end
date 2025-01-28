import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Save } from "@mui/icons-material";
import {
  CustomNoRowsOverlay,
  formatDateYearsMonth,
} from "../../../../utils/Function";
import { BottomSend } from "../../../../utils/Content";
import HeaderCenter from "../../../../components/HeaderCenterComponent";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../../../../redux/api/axios";
import { getToken } from "../../../../utils/handelCookie";
import { arrayDataInventory } from "../../../../utils/arrayFuction";

function ReviewDataSet({
  dataFileExcel,
  setDataFileExcel,
  setRefresh,
  dataUserById,
  setSaveData,
  warehouseId,
  dataUserLab,
}) {
  const { rtl } = useSelector((state) => state.language);
  const { maintheme } = useSelector((state) => state.ThemeData);
  const [imageUrls, setImageUrls] = useState({});
  const [labels, setLabels] = useState(["ت", ...arrayDataInventory]);
  const [refreshImage, setRefreshImage] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      let message = "";
      if (dataFileExcel && dataFileExcel.length > 0) {
        message += " ملاحظة : أذا  لم يتم حفظ البيانات سوف يتم حذفها.";
      }
      event.preventDefault();
      event.returnValue = message; // For most browsers
      return message; // For some older browsers
    };
    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dataFileExcel]);
  const tableHeaders = arrayDataInventory;
  // Ensure unique IDs for items
  useEffect(() => {
    if (dataFileExcel?.length > 0) {
      const updatedData = dataFileExcel.map((item, index) => ({
        ...item,
        id: item?.id || `material_${Date.now()}_${index}`,
      }));
      setDataFileExcel(updatedData);
    }
  }, [dataFileExcel, setDataFileExcel]);
  // Manage image URLs
  useEffect(() => {
    const newImageUrls = {};
    dataFileExcel?.forEach((item) => {
      if (item.materialImage instanceof File) {
        newImageUrls[item.id] = URL.createObjectURL(item.materialImage);
      } else if (typeof item.materialImage === "string") {
        newImageUrls[item.id] = item.materialImage;
      }
    });

    setImageUrls(newImageUrls);

    return () => {
      Object.values(newImageUrls).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [refreshImage]);

  // Match names with IDs and prepare data for submission
  // Ensure unique IDs for items
  useEffect(() => {
    if (dataFileExcel?.length > 0) {
      const updatedData = dataFileExcel.map((item, index) => ({
        ...item,
        id: item?.id || `material_${Date.now()}_${index}`,
      }));
      setDataFileExcel(updatedData);
    }
  }, [dataFileExcel, setDataFileExcel]);

  // Manage image URLs
  useEffect(() => {
    const newImageUrls = {};
    dataFileExcel?.forEach((item) => {
      if (item.materialImage instanceof File) {
        newImageUrls[item.id] = URL.createObjectURL(item.materialImage);
      } else if (typeof item.materialImage === "string") {
        newImageUrls[item.id] = item.materialImage;
      }
    });

    setImageUrls(newImageUrls);

    return () => {
      Object.values(newImageUrls).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [dataFileExcel, refreshImage]);

  // Match names with IDs and prepare data for submission
  const handleSubmit = async () => {
    try {
      // Prepare an array to hold the formatted data
      const formattedDataArray = dataFileExcel?.map((item) => {
        const itemData = { ...item }; // Create a copy of the item
        return {
          code: itemData?.code,
          nameMartials: itemData?.materialName, // Use the actual data
          price: itemData?.price,
          origin: itemData?.origin,
          status_martials: itemData?.materialStatus,
          measuring_unit: itemData?.unitMeasuring,
          specification: itemData?.specification,
          minimum_stock_level: itemData?.minimum_stock_level,
          production_date: formatDateYearsMonth(itemData?.production_date),
          ministry_id: dataUserById?.minister_id,
          entity_id: dataUserById?.entity_id,
          user_id: dataUserById?.user_id,
          id: itemData?.id,
          warehouseId: warehouseId,
          lab_id: dataUserLab?.lab_id,
          factory_id: dataUserLab?.factory_id,
          balance: itemData?.balance,
        };
      });

      // Use FormData to handle file uploads
      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedDataArray));
      // Append images separately
      const response = await axios.post(
        `${BackendUrl}/api/insertMultipleData`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: getToken(),
          },
        }
      );
      // Show success message and refresh if needed
      if (response) {
        setSaveData(true);
        toast.success(response?.data?.message);
        response?.data?.existingMaterials?.forEach((item) =>
          toast?.error(`${item}`)
        );
      }
      if (setRefresh) {
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      // Log the error and show failure message
      toast.error(
        error?.response?.data?.message || error?.response?.data?.error
      );
      // toast.error("حدث خطأ أثناء حفظ البيانات");
    }
  };

  // Add a new function to handle the update of data
  const handleUpdateData = (updatedItem) => {
    const updatedData = dataFileExcel?.map((item) =>
      item?.id === updatedItem?.id ? updatedItem : item
    );
    setDataFileExcel(updatedData);
  };

  // Add a new function to handle the deletion of data
  const handleDeleteData = (deletedItem) => {
    const updatedData = dataFileExcel?.filter(
      (item) => item?.id !== deletedItem?.id
    );
    setDataFileExcel(updatedData);
  };

  // Update the table headers

  // Update the table body
  // Show success message and refresh if needed
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Show confirmation dialog
      const message = "Are you sure you want to leave? You will be logged out.";
      event.preventDefault();
      event.returnValue = message; // For most browsers
      return message; // For some older browsers
    };
    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [window.location.reload]);
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <HeaderCenter title={"مراجعة البيانات المدخلة"} typeHeader={"h4"} />
      <Box dir={rtl?.dir === "rtl" ? "rtl" : "ltr"}>
        <BottomSend onClick={handleSubmit}>
          <Save /> <span>حفظ</span>
        </BottomSend>
      </Box>
      {warehouseId}
      {dataUserLab.factory_id || "n"}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, backgroundColor: maintheme?.paperColor }}
      >
        <Table stickyHeader aria-label="obsolete materials table">
          <TableHead>
            <TableRow>
              {labels?.map((item, index) => (
                <TableCell
                  key={index}
                  align={rtl?.dir === "rtl" ? "right" : "left"}
                  sx={{
                    backgroundColor: maintheme?.tableHeaderBg,
                    color: maintheme?.tableHeaderColor,
                    fontWeight: "bold",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFileExcel?.length > 0 ? (
              dataFileExcel.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: maintheme?.tableRowOdd,
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: maintheme?.tableRowEven,
                    },
                    "&:hover": {
                      backgroundColor: maintheme?.tableRowHover,
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {index + 1}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.code}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.materialName}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.price}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.origin}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.materialStatus}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.unitMeasuring}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.specification}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.minimum_stock_level}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {row?.balance}
                  </TableCell>
                  <TableCell align={rtl?.dir === "rtl" ? "right" : "left"}>
                    {formatDateYearsMonth(row?.production_date)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  <CustomNoRowsOverlay />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReviewDataSet;

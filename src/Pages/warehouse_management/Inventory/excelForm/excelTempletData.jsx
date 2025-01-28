import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { getDataStateName } from "../../../../redux/StateMartrialState/stateMatrialAction";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { BackendUrl } from "../../../../redux/api/axios";
import { getToken } from "../../../../utils/handelCookie";
import { arrayDataInventory } from "../../../../utils/arrayFuction";

export default function ExcelTemplate({ dataUnitMeasuring, wareHouseData }) {
  const { stateMaterial } = useSelector((state) => state?.StateMaterial);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const labels = arrayDataInventory;
  useEffect(() => {
    console.log("wharehouse", wareHouseData);
    dispatch(getDataStateName());
  }, [dispatch]);

  const applyDataValidation = (cell, options, required = true) => {
    cell.dataValidation = {
      type: "list",
      allowBlank: !required,
      formulae: [`"${options.join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid Selection",
      error: "Please select a value from the dropdown.",
      editable: false,
    };
  };
  const applyDecimalValidation = (cell) => {
    cell.dataValidation = {
      type: "decimal",
      operator: "greaterThanOrEqual",
      formulae: [0],
      showErrorMessage: true,
      errorTitle: "خطأ في الإدخال",
      error: "يرجى إدخال رقم صحيح أكبر من أو يساوي 0",
      allowBlank: true,
    };
  };

  const exportToExcel = async () => {
    const fileName = "templateExcel.xlsx";
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Template");
      // Add header row with styles
      worksheet.addRow(labels).eachCell((cell, colNumber) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "EEEEEE" },
        };
        worksheet.getColumn(colNumber).width = 25;
      });
      const dataUnitMeasuringOptions = dataUnitMeasuring?.map((item) =>
        item?.measuring_unit?.replace(/,/g, "")
      ) || ["No Data Available"];

      const stateMaterialOptions = stateMaterial?.map((item) =>
        item?.state_name?.replace(/,/g, "")
      ) || ["No Data Available"];

      const dropdownRange = 100;

      // Populate rows with data validation and formatting
      for (let i = 2; i <= dropdownRange; i++) {
        applyDataValidation(worksheet.getCell(`E${i}`), stateMaterialOptions);
        applyDataValidation(
          worksheet.getCell(`F${i}`),
          dataUnitMeasuringOptions,
          false
        );
        // Apply decimal validation to specific columns
        ["H", "I"].forEach((col) => {
          const cell = worksheet.getCell(`${col}${i}`);
          applyDecimalValidation(cell);
        });

        // Format date cells
        ["J"].forEach((col) => {
          const dateCell = worksheet.getCell(`${col}${i}`);
          dateCell.numFmt = "yyyy-mm-dd";
        });
      }

      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const excelData = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(excelData, fileName);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      alert(t("An error occurred while exporting the Excel file."));
    }
  };

  const handelGetTemplateFileExcel = async () => {
    try {
      // Display a loading message or spinner
      console.log("Downloading template...");

      // Make the request to the backend API
      const response = await axios.get(
        `${BackendUrl}/api/getTemplateFileExcel`,
        {
          headers: {
            authorization: getToken(),
          },
          responseType: "blob", // Ensure the response is treated as a binary file
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "templateExcel.xlsx"; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();

      // Clean up the link element
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Optionally, provide feedback to the user
      console.log("Template downloaded successfully!");
    } catch (error) {
      console.error("Error downloading template:", error);

      // Optionally, display a user-friendly message
      // alert("Failed to download the template. Please try again.");
    }
  };

  return (
    <div>
      <Box>
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="d-flex justify-content-center">
              <Button
                onClick={exportToExcel}
                sx={{ padding: 0, margin: "0px" }}
              >
                <div className="maincontent ">
                  <div className="file-upload-wrapper">
                    <div className="box-fileupload">
                      <IoCloudDownloadOutline
                        style={{
                          fontSize: "120px",
                          fontWeight: "bold",
                          color: "rgba(30, 106, 153, 0.7)",
                        }}
                      />
                      <p className="box-fileupload__lable">
                        تنزيل قالب File Excel
                      </p>
                    </div>
                    <div className="error-wrapper" />
                    <div className="image-previwe" />
                  </div>
                </div>
              </Button>
            </div>
            <Typography
              sx={{
                textAlign: "center",
                marginTop: 2,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              إذا قمت بتنزيل القالب بالفعل، يرجى المتابعة إلى الخطوة التالية.
            </Typography>
          </div>
          {/* <ButtonClearState onClick={handelGetTemplateFileExcel}>
              الحصول على القالب
            </ButtonClearState> */}
        </div>
      </Box>
    </div>
  );
}

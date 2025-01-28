import React, { useState } from "react";
import "./style.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Paper, Typography } from "@mui/material";
import ExcelJS from "exceljs";
import excelImage from "../../../../assets/image/pngwing.com.png";
import { ContentPasteGo, Download } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { arrayDataInventory } from "../../../../utils/arrayFuction";
export default function ExcelUpload({ setDataFileExcel }) {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const mainTheme = useSelector((state) => state?.ThemeData?.maintheme);
  // Expected header structure
  const expectedHeaders = arrayDataInventory;
  // Handle file upload and data extraction
  const handleFileExcelUpload = async () => {
    if (file) {
      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          toast.error("ملف الإكسل لا يحتوي على أي أوراق عمل.");
          return;
        }
        // Validate header row
        const headerRow = worksheet.getRow(1).values.slice(1); // Remove first index (ExcelJS is 1-based)
        const isValidHeaders = expectedHeaders.every(
          (header, i) => headerRow[i]?.trim() === header
        );
        // if (!isValidHeaders) {
        //   toast.error(
        //     "ملف الإكسل لا يتطابق مع التنسيق المتوقع. يرجى التحقق من العناوين."
        //   );
        //   return;
        // }
        // Extract and validate data
        const extractedData = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            // Extract row data
            const rowData = {
              // index:rowNumber+1,
              code: row.getCell(1).text?.trim() || null,
              materialName: row.getCell(2).text?.trim() || null,
              price: row.getCell(3).text?.trim() || null,
              origin: row.getCell(4).text?.trim() || null,
              materialStatus: row.getCell(5).text?.trim() || null,
              unitMeasuring: row.getCell(6).text?.trim() || null,
              specification: row.getCell(7).text?.trim() || null,
              minimum_stock_level: row.getCell(8).text?.trim() || null,
              balance: row.getCell(9).text?.trim() || null,
              production_date: row.getCell(10).text?.trim() || null,
            };
            // Skip rows where all cells are empty
            const hasValue = Object.values(rowData).some(
              (value) =>
                value !== null && value !== "" && value !== "yyyy-mm-dd"
            );
            if (hasValue) {
              extractedData.push(rowData);
            }
          }
        });
        setDataFileExcel(extractedData);
        toast.success("تم رفع الملف والتحقق منه بنجاح!");
      } catch (error) {
        console.error("خطأ في معالجة ملف الإكسل:", error.message);
        toast.error(
          "حدث خطأ أثناء معالجة الملف. تأكد من أن الملف صالح ويتوافق مع التنسيق المطلوب."
        );
      }
    } else {
      toast.warning("يرجى اختيار ملف قبل التحميل.");
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();
      if (fileExtension === "xlsx") {
        setFile(uploadedFile);
        setFilePreview(URL.createObjectURL(uploadedFile));
        toast.success("File selected successfully!");
      } else {
        toast.error("Invalid file format. Only .xlsx files are allowed.");
        setFile(null);
        setFilePreview(null);
      }
    }
  };

  return (
    <div>
      <div className="maincontent">
        {!filePreview && (
          <>
            <div className="d-flex justify-content-center">
              <div className="file-upload-wrapper">
                <Button sx={{ padding: 0, width: "100%" }}>
                  <div className="box-fileupload">
                    <input
                      type="file"
                      id="fileId"
                      className="file-upload-input"
                      onChange={handleFileChange}
                      hidden
                    />
                    <label htmlFor="fileId">
                      <AiOutlineCloudUpload
                        style={{
                          fontSize: "120px",
                          color: "rgba(30, 106, 153, 0.7)",
                        }}
                      />
                      <p className="box-fileupload__label">
                        رفع فايل أكسل بعد أكمال أدراج المعلومات
                      </p>
                    </label>
                  </div>
                </Button>
              </div>
            </div>
            <Typography
              sx={{
                textAlign: "center",
                marginTop: 2,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              أذا تم أدراج المعلومات، يمكنك رفع الملف الأكسل هنا
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                marginTop: 2,
              }}
            >
              يمكنك رفع ملفات .xlsx فقط بالتنسيق المطلوب من خلال هذه الصفحة،
              وذلك بحد أقصى 100 منتج.
            </Typography>
          </>
        )}

        {filePreview && (
          <div className="file-upload-wrapper">
            <Paper
              sx={{
                p: 1,
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                width: "100%",
              }}
            >
              <div>
                <img
                  src={excelImage}
                  alt="File Preview"
                  style={{ width: "120px", height: "120px" }}
                />
              </div>
              <div>
                <a href={filePreview} download={file.name}>
                  <Download /> {file.name}
                </a>
                <div className="mt-4">
                  <Button
                    sx={{
                      background: mainTheme?.mainColor || "blue",
                      color: "white",
                      marginRight: "10px",
                    }}
                    onClick={handleFileExcelUpload}
                  >
                    <ContentPasteGo /> أستخراج المعلومات
                  </Button>
                </div>
                {/* Note added here */}
                <div
                  className="mt-2"
                  style={{ color: "gray", fontSize: "0.9rem" }}
                >
                  بعد أكمال أستخراج المواد يمكن الضغط على التالي
                </div>
              </div>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
}

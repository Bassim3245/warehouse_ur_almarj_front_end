import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "../style/fileUpload.css";
import wordImage from "../assets/image/word.png";
import pdfFile from "../assets/image/pdf_136522.png";
import { DemoPaper } from "utils/Content";
import { Close, CloudUpload } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getFileIcon } from "utils/Function";

function FileUploadComponent({ setFileName, fileName, label, setRemoveFile }) {
  const mainTheme = useSelector((state) => state?.ThemeData?.maintheme);
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    let newErrors = {};
    if (newFiles.length > 4) {
      toast.error("Maximum number of files is 4.");
      return; // Exit early if too many files are selected
    }
    const validFiles = newFiles?.filter((file) => {
      const isValidType = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
      ].includes(file.type);
      if (!isValidType) {
        toast.error(
          "Invalid file type. Allowed types are png, jpeg, pdf, and doc/docx."
        );
      }
      const maxSizeMB = 5;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        toast.error(`File size exceeds ${maxSizeMB} MB.`);
      }
      return isValidType && file.size <= maxSizeBytes;
    });

    if (validFiles.length > 0) {
      setFileName((prevFiles) => [...prevFiles.slice(0, 4), ...validFiles]);
    }
  };
  useEffect(() => {
    console.log("fileName", fileName);
  }, [fileName]);

  const handleRemoveFile = (index) => {
    setFileName((prevFiles) => {
      const removedFile = prevFiles[index];
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      setRemoveFile((prevRemovedFiles) => [...prevRemovedFiles, removedFile]);
      return updatedFiles;
    });
  };

  const theme = useTheme();

  return (
    <div
      className="p-20 rad-10"
      style={{
        border: "3px dashed black",
        width: "100%",
        maxWidth: "100%",
        position: "relative",
        background: `${
          theme.palette.mode === "dark"
            ? mainTheme.lightblack
            : mainTheme.paperColor
        }`,
      }}
    >
      <Box>
        <div className="mb-2 mt-2">
          <Typography>الملفات التي يمكن تحميلها</Typography>
          <Typography>word , pdf ,png,jpg,jpeg</Typography>
          <Typography>يجب أن يكون حجم الفايل أقصا حد : 5 MB</Typography>
        </div>
        <form>
          <div
            className="d-flex justify-content-start gap-3 flex_wrap"
            style={{ flexWrap: "wrap" }}
          >
            <div
              className="d-flex justify-content-start gap-3"
              style={{ flexWrap: "wrap" }}
            >
              {label === "upload" &&
                fileName?.map((file, index) => (
                  <DemoPaper variant="elevation" key={index}>
                    {file.type.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        style={{ width: "150px", height: "150px" }}
                      />
                    )}
                    {file.type === "application/pdf" && (
                      <img
                        src={pdfFile}
                        style={{ width: "150px" }}
                        className="mt-4 mb-4"
                        alt="PDF Icon"
                      />
                    )}
                    {(file.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                      file.type === "application/msword") && (
                      <img
                        src={wordImage}
                        style={{ width: "80px" }}
                        className="mt-4 mb-4"
                        alt="Word Icon"
                      />
                    )}
                    <IconButton
                      color="primary"
                      onClick={() => handleRemoveFile(index)}
                      style={{
                        color: mainTheme?.iconColor,
                        cursor: "pointer",
                        backgroundColor: "#ebebeba0",
                        borderRadius: "50%",
                      }}
                    >
                      <Close />
                    </IconButton>
                  </DemoPaper>
                ))}

              {label === "edit" &&
                fileName?.map((item, index) => (
                  <DemoPaper variant="elevation" key={index}>
                    <IconButton
                      color="primary"
                      onClick={() => handleRemoveFile(index)}
                      style={{
                        color: mainTheme?.iconColor,
                        cursor: "pointer",
                        backgroundColor: "#ebebeba0",
                        borderRadius: "50%",
                      }}
                    >
                      <Close />
                    </IconButton>
                    {item instanceof File ? (
                      <img src={URL?.createObjectURL(item)} alt={item?.name} />
                    ) : (
                      getFileIcon(item?.file_name, "", "edit") // Use an alternative for non-File objects
                    )}
                  </DemoPaper>
                ))}
            </div>
            <Box
              sx={{
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                width: {
                  xs: "200px",
                  sm: "200px",
                  md: "auto",
                },
              }}
            >
              <input
                style={{
                  zIndex: 999,
                  opacity: 0,
                  width: "300px",
                  maxWidth: "100%",
                  height: "300px",
                  maxHeight: "100%",
                  position: "absolute",
                }}
                onChange={handleFileChange}
                type="file"
                accept="image/*,.pdf,.doc,.docx" // Only accept images and document types
                multiple
                capture="environment" // Allows capturing images with the camera
              />
              <div className="Neon-input-dragDrop" style={{ maxWidth: "100%" }}>
                <div className="Neon-input-inner">
                  <div className="Neon-input-icon">
                    <CloudUpload />
                  </div>
                  <div className="Neon-input-text">
                    <h3>أختر صورة المادة </h3>
                    <span style={{ display: "inline-block", margin: "15px 0" }}>
                      or
                    </span>
                  </div>
                  <a className="Neon-input-choose-btn blue">أختيار الفايل</a>
                </div>
              </div>
            </Box>
            <div className="upload__mess"></div>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default FileUploadComponent;

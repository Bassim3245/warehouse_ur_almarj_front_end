import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Edit } from "@mui/icons-material";
import { BottomRoot } from "../../../../utils/Content";
import PopupForm from "../../../../components/PopupForm";
import { toast } from 'react-toastify';

export default function ModuleEdit({
  item,
  onUpdateData,setRefreshImage
}) {
  const [open, setOpen] = useState(false);
  const [file1, setFile1] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const { t } = useTranslation();
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      // Validate file type and size
      if (fileType.startsWith('image/')) {
        if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error(t("Image size should be less than 5MB"));
          return;
        }
        setFile1(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview1(reader.result);
          console.log("Image preview created");
        };
        reader.onerror = () => {
          console.error("Error reading file");
          toast.error(t("Error reading image file"));
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview1(null);
        toast.error(t("Only image files are allowed"));
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file1) {
        toast.error(t("Please select an image"));
        return;
      }

      // Create FormData for the image upload
      const formDataWithImage = new FormData();
      formDataWithImage.append("materialImage", file1);
      
      // Create the updated item object
      const updatedItem = {
        ...item,
        id: item.id,
        materialImage: file1
      };
      // Log for debugging
      console.log('Updating item with image:', {
        id: updatedItem.id,
        imageSize: file1.size,
        imageType: file1.type
      });
      // Update the parent component
      onUpdateData(updatedItem);
      setRefreshImage((prv) => !prv);
      setOpen(false);
      toast.success(t("Image updated successfully"));

    } catch (error) {
      console.error('Error updating image:', error);
      toast.error(t("Failed to update image"));
    }
  };
  const renderFormContent = () => (
    <div>
      <Box component="form" sx={{ p: 3 }} onSubmit={handleSubmit}>
        <div className="d-flex gap-4 flex-wrap justify-content-center">
          <label className="custum-file-upload" htmlFor={`imageUpload-${item.id}`}>
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill=""
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
            </div>
            <input
              id={`imageUpload-${item.id}`}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            <span>ادراج الصورة</span>
          </label>
          
          <div className="preview-section">
            {preview1 ? (
              <div className="preview-container">
                <img 
                  src={preview1} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: "200px", 
                    maxHeight: "200px", 
                    objectFit: "contain",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
                  }} 
                />
              </div>
            ) : item?.materialImage ? (
              <div className="preview-container">
                <img 
                  src={item.materialImage} 
                  alt="Current" 
                  style={{ 
                    maxWidth: "200px", 
                    maxHeight: "200px", 
                    objectFit: "contain",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    opacity: "0.7"
                  }} 
                />
                <div className="current-image-label">Current Image</div>
              </div>
            ) : null}
          </div>
        </div>
      </Box>
    </div>
  );

  const renderFormActions = () => (
    <>
      <BottomRoot onClick={handleSubmit}>{t("save")}</BottomRoot>
      <BottomRoot onClick={handleClose}>{t("close")}</BottomRoot>
    </>
  );

  return (
    <div>
      <IconButton className="actionButton editButton" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <PopupForm
        title={t("تحديث صورة المادة")}
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
        width="100%"
        content={renderFormContent()}
        footer={renderFormActions()}
      />
    </div>
  );
}

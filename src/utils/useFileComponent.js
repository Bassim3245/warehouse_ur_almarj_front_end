// useFileUpload.js
import { useState } from "react";
import { toast } from "react-toastify";
const useFileUpload = (pdfIcon, WordIcon) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileType = selectedFile.type;
      // Display preview for images
      if (fileType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result); // Set preview URL for images
        reader.readAsDataURL(selectedFile); // Read file as data URL for preview
      }
      // Set preview icon for PDF
      else if (fileType === "application/pdf") {
        setPreview(pdfIcon); // Replace with actual path to PDF icon
      }
      // Set preview icon for Word document
      else if (
        fileType === "application/msword" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setPreview(WordIcon); // Replace with actual path to Word icon
      }
      // Clear preview for unsupported types
      else {
        setPreview(null);
        toast.error("Unsupported file type");
      }
    }
  };

  return { file, preview, handleFileChange };
};

export default useFileUpload;

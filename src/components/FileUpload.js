import { Close, CloudUpload } from "@mui/icons-material";
import {  IconButton } from "@mui/material";
import { DemoPaper } from "../utils/Content";
import { getFileIcon } from "../utils/Function";
import { useState } from "react";
import { useSelector } from "react-redux";
function FileUpload(props) {
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (event.target.files) {
        props?.setFile_name(event.target.files[0]);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const removeFile = () => {
    setFile("");
    props?.setFile_name("");
  };
  return (
    <>
      <div
        className=" p-20 rad-10"
        style={{
          border: "3px dashed black",
          width: "100%",
          maxWidth: "100%",
          position: "relative",
        }}
      >
        <div className="position_relative d-flex justify-content-start ">
          <div style={{}}>
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
              name="files[]"
              id="filer_input2"
              multiple="multiple"
              type="file"
              capture="camera" // Allows camera input

              onChange={(e) => handleFileChange(e)}
            />
            <div className="Neon-input-dragDrop">
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
                <a className="Neon-input-choose-btn blue">Browse Files</a>
              </div>
            </div>
          </div>
          <div className="Box">
            {props?.label === "edit"
              ? props?.file_name && (
                  <div className="">
                    <div className="position-relative">
                      <IconButton
                        // disabled
                        color="primary"
                        onClick={removeFile}
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "5px",
                          color: maintheme?.iconColor,
                          cursor: "pointer",
                          backgroundColor: "#ebebeba0",
                          borderRadius: "50%",
                        }}
                      >
                        <Close />
                      </IconButton>
                    </div>
                    <DemoPaper variant="elevation">
                      {getFileIcon(props?.fileName, "", props?.label)}
                    </DemoPaper>
                  </div>
                )
              : file && (
                  <div className="">
                    <div className="position-relative">
                      <IconButton
                        // disabled
                        color="primary"
                        onClick={removeFile}
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "5px",
                          color: maintheme?.iconColor,
                          cursor: "pointer",
                          backgroundColor: "#ebebeba0",
                          borderRadius: "50%",
                        }}
                      >
                        <Close />
                      </IconButton>
                    </div>
                    <DemoPaper variant="elevation">
                      {getFileIcon(
                        file?.name,
                        props?.file_name?.name,
                        "upload"
                      )}
                    </DemoPaper>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUpload;

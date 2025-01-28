import { useState } from "react";
import { BackendUrl } from "../../redux/api/axios";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  ButtonClearState,
  ButtonSave,
  VisuallyHiddenInput,
} from "../../utils/Content";
import axios from "axios";
import { toast } from "react-toastify";
function ProfileImage({ setFile, file, token, theme, data }) {
  const [loading, setLoading] = useState(true);
  const handleImageEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios({
        method: "put",
        url: `${BackendUrl}/api/update_image_profile`,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token: token,
        },
        data: formData,
      });
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response?.data?.message);

        setLoading(false);
        window.location.reload(true);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating user.");
      }
    }
  };
  return (
    <div className="col-lg-4 ">
      <div
        className="card"
        style={{
          background:
            theme?.palette?.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
        }}
      >
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src={`${BackendUrl}/${data?.image}`}
              alt="Admin"
              className="rounded-circle p-1 bg-primary"
              width={110}
              height={110}
            />
            <div className="mt-3 w-100">
              <h4>{data?.name}</h4>
              <p className="text-secondary mb-1">{data?.user_type}</p>
              <div className="d-block w-100">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  sx={{ width: "100%", p: "10px", mb: "10px" }}
                  className={"me-3"}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
                <ButtonClearState
                  sx={{ width: "100%", mb: "10px" }}
                  onClick={handleImageEdit}
                >
                  {" "}
                  Save{" "}
                </ButtonClearState>
                <ButtonSave sx={{ width: "100%" }}>remove</ButtonSave>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileImage;

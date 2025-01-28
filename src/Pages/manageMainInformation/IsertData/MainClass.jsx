import { Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../../components/HeaderComponent";
import CustomTextField from "../../../components/CustomTextField";
import { BottomSend } from "../../../utils/Content";
import MainClassList from "../ShowData/ShowMainClass";
import { useSelector } from "react-redux";
import { VisuallyHiddenInput } from "../../../utils/Content";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getToken } from "../../../utils/handelCookie";
import Loader from "../../../components/Loader";
function MainClass({ BackendUrl }) {
  const [mainClassName, setMainClassName] = useState("");
  const [fileName, setFileName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading,setLoading]=useState(false)
  const { rtl } = useSelector((state) => state?.language);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("mainClassName", mainClassName);
    formData.append("image", fileName);
    formData.append("typeFile", "تصنيف رئيسي");
    try {
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/MainClassRegister`,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization:getToken(),
        },
        data: formData,
      });
      if (response && response.data) {
        setMainClassName("");
        setFileName("");
        toast.success(response.data.message);
        setRefresh((prv) => !prv);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      {loading&&<Loader/>}
      <form onSubmit={handleSubmit}>
        <Header title="أدخال الصنف الرئيسي" dir={rtl?.dir} />
        <Box
          className="mobilDisplay"
          sx={{
            mb: "20px",
            mt: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <CustomTextField
            label="أسم ألصنف الرئيسي"
            haswidth={true}
            value={mainClassName}
            hasMultipleLine={false}
            paddingHorizontal="0px"
            required
            readOnly={false}
            onChange={(e) => {
              setMainClassName(e.target.value);
            }}
            onClearClick={() => {
              setMainClassName("");
            }}
          />
        </Box>
        <BottomSend
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{
            width: "100%",
            justifyContent: "center",
            gap: "10px",
          }}
          startIcon={<CloudUploadIcon sx={{ fontSize: 40 }} />} // Increase icon size
          // dir={rtl?.dir}
        >
          رفع صورة {/* Add margin between the input and the text */}
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFileName(e.target.files[0]);
              }
            }}
          />
        </BottomSend>
      </form>
      <div
        className="mt-3"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <BottomSend onClick={handleSubmit}>حفظ البيانات</BottomSend>
        <MainClassList refresh={refresh} />
      </div>
    </div>
  );
}

export default MainClass;

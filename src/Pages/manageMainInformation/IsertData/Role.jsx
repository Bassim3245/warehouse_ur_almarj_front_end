import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BottomSend } from "../../../utils/Content";
import {useTheme } from "@mui/material";
import ShowDataUnitAndRole from "../ShowData/ShowDataAndRole";
import Header from "../../../components/HeaderComponent";
import CustomTextField from "../../../components/CustomTextField";
import { getToken } from "../../../utils/handelCookie";
function RoleSystem({BackendUrl}) {
  const [RoleName, setRoleName] = useState("");
  const [open, setOpen] = useState(true);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BackendUrl}/api/setRole`,
        {
          RoleName: RoleName,
        },
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      toast(response?.data?.message);
      setRoleName("");
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
  };
  const handleEdit = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  return (
    <div className="">
      <Header title="تحديد مستخدم النظام"/>
      <form onSubmit={handleSubmit}>
        {/* <input
          data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          type="text"
          style={{ direction: "rtl" }}
          className="form-control p-10 rad-6 mb-3"
          placeholder=" كتابة الصلاحية"
          value={RoleName}
          onChange={(e) => setRoleName(e?.target?.value)}
          required
        /> */}
         <CustomTextField
            label={"أسم المجموعة"}
            haswidth={true}
            value={RoleName}
            required
            // error={error}
            customWidth="100%"
            hasMultipleLine={false}
            paddingHorizontal={"0px"}
            // message={props?.objectData?.name?.message}
            readOnly={false}
            onChange={(e) => {
              setRoleName(e.target.value);
            }}
            onClearClick={() => {
              setRoleName("");
            }}
          />
        <div className="mt-3" style={{ display:"flex",justifyContent:"center" ,gap:"10px"}}>
          <BottomSend className="me-3" onClick={handleSubmit}>
            حفظ المعلومات 
          </BottomSend>
          <ShowDataUnitAndRole themeMode={theme} label={"Role"} token={getToken} />
        </div>
      </form>
    </div>
  );
}

export default RoleSystem;

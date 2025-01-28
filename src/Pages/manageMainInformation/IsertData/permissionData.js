import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BottomSend } from "../../../utils/Content";
import { useTheme } from "@mui/material";
import ShowDataUnitAndRole from "../ShowData/ShowDataAndRole";
import Header from "../../../components/HeaderComponent";
import { getToken } from "../../../utils/handelCookie";
function PermissionData({BackendUrl}) {
  const [permissionName, setpermissionName] = useState("");
  const [open, setOpen] = useState(true);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BackendUrl}/api/setPermission`,
        {
          permissionName: permissionName,
        },
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      toast(response?.data?.message);
      setpermissionName("");
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
      <Header title="أدخال الصلاحيات" />
      <form onSubmit={handleSubmit}>
        <input
          data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          type="text"
          style={{ direction: "rtl" }}
          className="form-control p-10 rad-6 mb-3"
          placeholder=" كتابة الصلاحية"
          value={permissionName}
          onChange={(e) => setpermissionName(e?.target?.value)}
          required
        />
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
          <BottomSend className="me-3" onClick={handleSubmit}>
            حفظ المعلومات
          </BottomSend>
          <ShowDataUnitAndRole themeMode={theme} label={"permissions"} />
        </div>
      </form>
    </div>
  );
}

export default PermissionData;

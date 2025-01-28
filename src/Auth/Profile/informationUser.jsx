import { Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { BottomSend } from "../../utils/Content";
import { getDataUserById } from "../../redux/userSlice/authActions";
import Edit from "./Edit";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { toast } from "react-toastify";
import "../style/userInformation.css";
import { getToken } from "../../utils/handelCookie";
const PersonalProfile = () => {
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [editDataUser, setEditDataUser] = useState(false);
  const [ministry, setMinistry] = useState(""),
    [entities, setEntities] = useState(""),
    [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [phone, setPhone] = useState(""),
    [Address_id, setAddress_id] = useState(""),
    [oldPassword, setOldPassword] = useState(""),
    [newPassword, setNewPassword] = useState("");
  const token = getToken();
  const [refresh, setRefreshButton] = useState(false);
  const { dataUserById } = useSelector((state) => {
    return state?.user;
  });
  useEffect(() => {
    const getDataById = async () => {
      try {
        setLoading(true);
        dispatch(getDataUserById(token));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    getDataById();
  }, [dispatch, dataUserById?.user_id, token, refresh]);

  const handelEditData = () => {
    setEditDataUser(true);
  };

  const handelClose = () => {
    setEditDataUser(false);
  };

  useEffect(() => {
    if (dataUserById) {
      setMinistry(dataUserById?.ministries);
      setEntities(dataUserById?.Entities_name);
      setUsername(dataUserById?.user_name || "N/A");
      setEmail(dataUserById?.email || "N/A");
      setPhone(dataUserById?.phone_number || "N/A");
      setAddress_id(dataUserById?.address_id || "N/A");
    }
  }, [dataUserById]);
  const handleEdit = async (e) => {
    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("phone", phone);
      formData.append("Address_id", Address_id);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      formData.append("dataId", dataUserById?.user_id);
      const response = await axios.post(
        `${BackendUrl}/api/userEdit`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      if (response) {
        toast.success(response?.data?.message);
        setRefreshButton((prev) => !prev);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  const renderListItem = (label, value, weight) => (
    <li
      className="list-group-item d-flex justify-content-between align-items-center px-0"
      style={{
        background:
          theme?.palette?.mode === "dark"
            ? maintheme?.lightblack
            : maintheme?.paperColor,
        color:
          theme?.palette?.mode === "dark" ? maintheme?.paperColor : "#000000",
        fontWeight: weight ? weight : "",
      }}
    >
      {label}
      <span>{value}</span>
    </li>
  );
  return (
    <Box className="p-0 m-0">
      {loading && <Loader />}
      <div className="container py-5  h-100vh">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div
              className="card-profile mb-4"
              style={{
                background:
                  theme.palette.mode === "dark"
                    ? maintheme.lightblack
                    : maintheme.paperColor,
              }}
            >
              <div className="card-body w-100 ">
                {!editDataUser && (
                  <ul
                    className="list-group list-group-flush"
                    dir="rtl"
                    style={{
                      background:
                        theme.palette.mode === "dark"
                          ? maintheme.lightblack
                          : maintheme.paperColor,
                    }}
                  >
                    {renderListItem(
                      "أسم الوزارة",
                      dataUserById?.ministries || "N/A"
                    )}
                    {renderListItem(
                      "أسم الجهة",
                      dataUserById?.Entities_name || "N/A"
                    )}
                    {renderListItem(
                      "أسم المستخدم",
                      dataUserById?.user_name || "N/A"
                    )}
                     {/* {renderListItem(
                      "أسم المستخدم",
                      dataUserById?.user_name || "N/A"
                    )} */}
                    {renderListItem("الايميل", dataUserById?.email || "N/A")}
                    {renderListItem(
                      "رقم الهاتف",
                      dataUserById?.phone_number || "N/A"
                    )}
                    {renderListItem("العنوان", dataUserById?.governorate_name|| "N/A")}
                  </ul>
                )}
                {editDataUser && (
                  <Edit
                    dataUserById={dataUserById}
                    oldPassword={oldPassword}
                    setOldPassword={setOldPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    address={Address_id}
                    setAddress={setAddress_id}
                    phone={phone}
                    setPhone={setPhone}
                    entities={entities}
                    ministry={ministry}
                    setEntities={setEntities}
                    setMinistry={setMinistry}
                    theme={theme}
                    token={token}
                  />
                )}
              </div>
              <div className=" d-flex justify-content-between p-3 w-100 ">
                {editDataUser && (
                  <>
                    <BottomSend
                      variant="contained"
                      color="primary"
                      onClick={handelClose}
                    >
                      غلق
                    </BottomSend>
                    <BottomSend
                      variant="contained"
                      color="primary"
                      onClick={handleEdit}
                    >
                      حفظ التغير
                    </BottomSend>
                  </>
                )}
                {!editDataUser && (
                  <BottomSend onClick={handelEditData}>تعديل</BottomSend>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default PersonalProfile;

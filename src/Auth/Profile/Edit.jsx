import { Box, Typography } from "@mui/material";
import { BottomRoot } from "../../utils/Content";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";

function Edit({
  dataUserById,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  phone,
  setPhone,
  email,
  setEmail,
  username,
  setUsername,
  address,
  setAddress,
  entities,
  ministry,
  setEntities,
  setMinistry,
  theme,
  token,
}) {
  const [EditPassword, setEditPassword] = useState(null);
  const [governorate, setGovernorate] = useState([]);
  const fetchDataGo = async () => {
    try {
      const response = await axios?.get(
        `${BackendUrl}/api/getDataGovernorate`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setGovernorate(response?.data?.response);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchDataGo();
  }, []);
  return (
    <div className="col-lg-8 w-100 " dir="rtl">
      <div className="card-profile">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0"> الوزارة</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                disabled
                readOnly
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">الجهة</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                disabled
                readOnly
                value={entities}
                onChange={(e) => setEntities(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">أسم المستخدم</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">الايميل</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                disabled
                readOnly
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3"></div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">رقم الهاتف</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">العنوان</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <select
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              >
                {governorate?.map((item) => (
                  <option value={item?.id} key={item?.id}>
                    {item?.governorate_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Box>
            <Typography>
              أذا كنت تريد تحديث كلمة المرور أضغط على الزر التالي
            </Typography>
            <BottomRoot
              onClick={() => {
                setEditPassword((prv) => !prv);
              }}
            >
              تعديل كلمة المرور
            </BottomRoot>
          </Box>
          {EditPassword && (
            <>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">كلمة السر القديمة</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">كلمة السر الجديدة</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Edit;

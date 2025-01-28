import { Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { BackendUrl } from "../../redux/api/axios";
import { formatDateYearsMonth, getFileIcon } from "../../utils/Function";
import { getToken } from "../../utils/handelCookie";
import { getDataUserById } from "../../redux/userSlice/authActions";
import { useTranslation } from "react-i18next";
const InformationMaterial = ({ material_id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const token = getToken();
  const [dataProduct, setDataProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const {t}=useTranslation()
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch, token]);
  const fetchMainClassData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BackendUrl}/api/getDataStagnantMaterialAllByAndStagnantId/${material_id}`,
        { headers: { authorization: token } }
      );
      setDataProduct(data?.response);
    } catch (error) {
      console.error(
        "Error fetching main class data:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMainClassData();
  }, [material_id]);
  const renderListItem = (label, value, weight = "") => (
    <li
      className="list-group-item d-flex justify-content-between align-items-center px-0"
      style={{
        background:
          theme?.palette?.mode === "dark"
            ? maintheme?.lightblack
            : maintheme?.paperColor,
        color:
          theme?.palette?.mode === "dark" ? maintheme?.paperColor : "#000000",
        fontWeight: weight,
      }}
    >
      {label}
      <span>{value}</span>
    </li>
  );

  return (
    <Box>
      {loading && <Loader />}
      <div className="row d-flex justify-content-center my-4">
        {/* Images Section */}
        <div className="col-md-8">
          <div
            className="card-profile mb-4"
            style={{
              background:
                theme?.palette?.mode === "dark"
                  ? maintheme?.lightblack
                  : maintheme?.paperColor,
            }}
          >
            <div className="card-body d-flex justify-content-center align-items-center gap-3 flex-wrap">
              {dataProduct?.images?.map((item, index) => (
                <div key={index}>
                  {getFileIcon(item?.file_name, "_", "edit")}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="col-md-4">
          <div
            className="card-profile mb-4"
            style={{
              width: "100%",
              background:
                theme?.palette?.mode === "dark"
                  ? maintheme?.lightblack
                  : maintheme?.paperColor,
            }}
          >
            <div className="card-body">
              <ul className="list-group list-group-flush" dir="rtl">
                {renderListItem(
                  t("MaterialOverview.Material Name"),
                  dataProduct?.name_material
                )}
                {renderListItem(
                  t("MaterialOverview.main Class"),
                  dataProduct?.main_Class_name
                )}
                {renderListItem(
                  t("MaterialOverview.sub Class"),
                  dataProduct?.sub_class_name
                )}
                {renderListItem(
                  t("MaterialOverview.State of matter"),
                  dataProduct?.state_name
                )}
                {renderListItem(
                  t("MaterialOverview.typeMaterial"),
                  dataProduct?.typ_material
                )}
                {renderListItem(
                  t("MaterialOverview.purchase date"),

                  formatDateYearsMonth(dataProduct?.puchase_date)
                )}
                {renderListItem(
                  t("MaterialOverview.ministry name"),
                  dataProduct?.ministries
                )}
                {renderListItem(
                  t("MaterialOverview.entity name"),
                  dataProduct?.Entities_name
                )}
                {renderListItem(
                  t("MaterialOverview.Quantity"),
                  dataProduct?.Quantity === 0
                    ? "تم الحجز"
                    : dataProduct?.Quantity
                )}
                {renderListItem(
                  t("MaterialOverview.phone Number"),
                  dataProduct?.phone_number,
                  "build"
                )}
                {renderListItem(
                  t("MaterialOverview.Address"),
                  dataProduct?.address,
                  "bold"
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default InformationMaterial;

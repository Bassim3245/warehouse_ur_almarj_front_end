import { useEffect, useState } from "react";
import { BottomSend } from "../../../utils/Content";
import { Box } from "@mui/material";
import CustomTextField from "../../../components/CustomTextField";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../../../components/HeaderComponent";
import ShowDataUnite from "../ShowData/ShowDataUnit";
import { useTranslation } from "react-i18next";
import { getToken } from "../../../utils/handelCookie";
import { getDataUserById } from "../../../redux/userSlice/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
function UnitMeasuring(props) {
  const [unitMeasuring, setUnitMeasuring] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const token = getToken();
  const dispatch = useDispatch();
  const { dataUserById } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    dispatch(getDataUserById(token));
  }, [dispatch]);
  const HandelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("unitMeasuring", unitMeasuring);
      formData.append("entities_id", dataUserById?.entity_id);
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/unitRegister`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: getToken(),
        },
        data: formData,
      });
      if (response) {
        toast(response?.data?.message);
        setUnitMeasuring("");
      }
    } catch (error) {
      if (error.response) {
        console.log(error?.response);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    {loading&&<Loader/>}
      <Header title={t("Stagnant.measuringUnit")} dir={props?.dir} />
      <form onSubmit={(e) => HandelSubmit(e)}>
        <Box
          sx={{ mb: "20px", mt: "20px", width: "100%" }}
        >
          <CustomTextField
            label={"وحدة المادة"}
            haswidth={true}
            value={unitMeasuring}
            required
            customWidth="100%"
            hasMultipleLine={true}
            paddingHorizontal={"0px"}
            readOnly={false}
            onChange={(e) => {
              setUnitMeasuring(e.target.value);
            }}
            onClearClick={() => {
              setUnitMeasuring("");
            }}
          />
        </Box>
      </form>
      <div className="d-flex justify-content-center gap-4">
        <BottomSend onClick={(e) => HandelSubmit(e)}>حفظ البانات</BottomSend>
        <ShowDataUnite />
      </div>
    </>
    // </div>
  );
}
export default UnitMeasuring;

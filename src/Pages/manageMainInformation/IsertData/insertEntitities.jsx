import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShowData from "../ShowData/ShowDataMinstries";
import { getDataMinistries } from "../../../redux/MinistriesState/MinistresAction";
import { ButtonSave } from "../../../utils/Content";
import { Box } from "@mui/material";
import CustomTextField from "../../../components/CustomTextField";
import CustomeSelectField from "../../../components/CustomeSelectField";
import axios from "axios";
import { getDataEntities } from "../../../redux/EntitiesState/EntitiesAction";
import Header from "../../../components/HeaderComponent";
import { useTranslation } from "react-i18next";
import { BackendUrl } from "../../../redux/api/axios";
import { getToken } from "../../../utils/handelCookie";
import Loader from "../../../components/Loader";
function Entities(props) {
  const { Ministries, message, isSuccess, isError } = useSelector((state) => {
    // @ts-ignore
    return state.Ministries;
  });
  const { Entities } = useSelector((state) => {
    // @ts-ignore
    return state.Entities;
  });
  const { rtl } = useSelector((state) => state?.language);
  const [entities, setEntities] = useState("");
  const [ministriesCod, setMinistriesCod] = useState("");
  const token = getToken();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const HandlSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("entities", entities);
      formData.append("ministriesCod", ministriesCod.id);
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/EntitiesRegister`,
        headers: {
          Accept: "application/json",
          "Content-Type": "appnpm lication/json",
          authorization: getToken(),
        },
        data: formData,
      });
      if (response) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(getDataMinistries());
    dispatch(getDataEntities(token));
  }, [entities, refresh]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      console.log(message);
      toast.error(message);
    }
  }, []);
  return (
    <div className="w-100">
      {loading && <Loader />}
      <Header title={t("EntityInput")} dir={rtl?.dir} />
      <form onSubmit={(e) => HandlSubmit(e)}>
        <Box sx={{ mb: "20px", mt: "20px" }} dir={"rtl"}>
          <CustomTextField
            label={"أسم الجهة"}
            haswidth={true}
            value={entities}
            required
            customWidth="100%"
            hasMultipleLine={false}
            paddingHorizontal={"0px"}
            readOnly={false}
            onChange={(e) => {
              setEntities(e.target.value);
            }}
            onClearClick={() => {
              setEntities("");
            }}
          />
        </Box>
        <Box sx={{ mt: "20px" }} dir={"rtl"}>
          <CustomeSelectField
            label={"أختيار الوزارة"}
            haswidth={true}
            value={ministriesCod}
            customWidth="100%"
            hasMultipleLine={true}
            customPadding={"0px"}
            list={Ministries ? Ministries : []}
            customGetOptionLabel={(option) => option?.ministries || ""}
            multiple={false}
            required
            readOnly={false}
            onChange={(e, newValue) => {
              setMinistriesCod(newValue);
            }}
            onClearClick={() => {
              setMinistriesCod("");
            }}
          />
        </Box>
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
        <ButtonSave className="me-3" onClick={(e) => HandlSubmit(e)}>
          أدراج معلومات الجهة
        </ButtonSave>
        <ShowData
          DataShowInformationEntities={Entities}
          themeMode={props?.theme}
          label={"Entities"}
          setRefresh2={setRefresh}
        />
      </div>
    </div>
  );
}
export default Entities;

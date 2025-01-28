import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShowData from "../ShowData/ShowDataMinstries";
import {
  AddMinstries,
  getDataMinistries,
} from "../../../redux/MinistriesState/MinistresAction";
import { BottomSend } from "../../../utils/Content";
import { Box } from "@mui/material";
import CustomTextField from "../../../components/CustomTextField";
import Header from "../../../components/HeaderComponent";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader";
function Minstries(props) {
  const { Ministries, message, isSuccess, isError } = useSelector((state) => {
    // @ts-ignore
    return state.Ministries;
  });
  const { rtl } = useSelector((state) => state?.language);
  const [ministries, setMinstres] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const HandlSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ministries", ministries);
      dispatch(AddMinstries(formData));
      setRefresh(prv=>!prv)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(getDataMinistries());
  }, [ministries, refresh]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
  }, []);
  const { t } = useTranslation();
  return (
    <div>
      {loading && <Loader />}
      <Header
        title={t(
          "Entering information about ministries and independent bodies"
        )}
        dir={rtl?.dir}
      />
      <form onSubmit={(e) => HandlSubmit(e)}>
        <Box
          sx={{ mb: "20px", mt: "20px", display: "flex", gap: "10px" }}
          dir={"rtl"}
        >
          <CustomTextField
            label={"أسم الوزارة"}
            haswidth={true}
            value={ministries}
            required
            customWidth="100%"
            hasMultipleLine={false}
            paddingHorizontal={"0px"}
            readOnly={false}
            onChange={(e) => {
              setMinstres(e.target.value);
            }}
            onClearClick={() => {
              setMinstres("");
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
        <BottomSend className="me-3" onClick={(e) => HandlSubmit(e)}>
          أدراج معلومات الوزارة
        </BottomSend>
        <ShowData
          DataShowInformationMinist={Ministries}
          themeMode={props?.theme}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
}
export default Minstries;

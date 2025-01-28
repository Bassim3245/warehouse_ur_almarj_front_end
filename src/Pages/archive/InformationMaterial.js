import { Box, Button, debounce, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import axios from "axios";
import Loader from "../../components/Loader";
import { BackendUrl } from "../../redux/api/axios";
import { Link } from "react-router-dom";
import {
  formatDateYearsMonth,
  getFileIcon,
} from "../../utils/Function";
import { getToken } from "../../utils/handelCookie";
import HeaderCenter from "../../components/HeaderCenterComponent";
import PrintPdInformation from "./PrintPdfInformation";
const InformationMaterial = () => {
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const { id: archiveId } = useParams();
  const token = getToken();
  const [dataMaterial, setDataMaterial] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const containerRef = useRef(null);
  // Debounced resize handler
  const handleResize = debounce(() => {
    if (containerRef.current) {
      console.log(
        "Container resized:",
        containerRef.current.getBoundingClientRect()
      );
    }
  }, 100);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    const currentRef = containerRef.current;
    if (currentRef) resizeObserver.observe(currentRef);
    return () => currentRef && resizeObserver.unobserve(currentRef);
  }, [handleResize]);
  const fetchMainClassData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BackendUrl}/api/getDataArchiveById/${archiveId}`,
        {
          headers: { authorization: token },
        }
      );
      setDataMaterial(data?.response);
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
  }, []);
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
    <Box className="">
      {loading && <Loader />}
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8 ">
            <div
              className="card-profile mb-4"
              style={{
                background:
                  theme?.palette?.mode === "dark"
                    ? maintheme?.lightblack
                    : maintheme?.paperColor,
              }}
            >
              <div style={{ background: maintheme?.iconColor }}>
                <Button
                  onClick={() => window.history.back(-1)}
                  sx={{ color: "white" }}
                >
                  <ArrowCircleLeftOutlined className="me-2" />
                  الرجوع الى الخلف
                </Button>
              </div>
              <PrintPdInformation dataMaterial={dataMaterial}/>
              <div className="card-body ">
                <div className="main-image d-flex justify-content-center align-items-center gap-3 flex-wrap">
                  <div>
                    {getFileIcon(dataMaterial?.file_check, "_", "edit")}
                    {getFileIcon(dataMaterial?.file_check_buy, "_", "edit")}
                    <HeaderCenter
                      title={"كتاب المناقلة الرسمي"}
                      typeHeader={"h5"}
                    />
                  </div>
                  <div>
                    {dataMaterial?.images?.map((item, index) => (
                      <>
                        <div key={index}>
                          {getFileIcon(item?.file_name, "_", "edit")}
                        </div>
                      </>
                    ))}
                    <HeaderCenter
                      title={dataMaterial?.name_material}
                      typeHeader={"h5"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <>
              <div
                className="card-profile mb-4"
                style={{
                  background:
                    theme?.palette?.mode === "dark"
                      ? maintheme?.lightblack
                      : maintheme?.paperColor,
                }}
              >
                <div
                  className="card-header py-3"
                  dir="rtl"
                  style={{ background: maintheme?.iconColor }}
                >
                  <h5 className="mb-0" style={{ color: "white" }}>
                    {dataMaterial?.name_material} معلومات
                  </h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush" dir="rtl">
                    {renderListItem("أسم المادة", dataMaterial?.name_material)}
                    {renderListItem(
                      "التصنيف الرئيسي",
                      dataMaterial?.main_Class_name
                    )}
                    {renderListItem(
                      "التصنيف الفرعي",
                      dataMaterial?.sub_class_name
                    )}
                    {token && (
                      <>
                        {renderListItem(
                          "حالة المادة",
                          dataMaterial?.state_name
                        )}
                        {renderListItem(
                          "نوع المادة",
                          dataMaterial?.typ_material
                        )}
                        {renderListItem(
                          "تاريخ الشراء",
                          formatDateYearsMonth(dataMaterial?.puchase_date)
                        )}
                        {renderListItem(
                          "اسم الوزارة المسلمة",
                          dataMaterial?.ministry_name_from
                        )}
                        {renderListItem(
                          "أسم الجهة المسلمة ",
                          dataMaterial?.entity_name_from
                        )}
                        {renderListItem(
                          "أسم الوزارة المستلمة ",
                          dataMaterial?.ministry_name_buy
                        )}
                        {renderListItem(
                          "أسم الجهة المستلمة ",
                          dataMaterial?.entity_name_buy
                        )}
                        {renderListItem(
                          "الكمية المسلمة",
                          dataMaterial?.Quantity_buy
                        )}
                        {renderListItem(
                          "رقم الهاتف",
                          dataMaterial?.phone_number,
                          "build"
                        )}
                        {renderListItem(
                          "العنوان",
                          dataMaterial?.governorate_name,
                          "bold"
                        )}
                      </>
                    )}
                  </ul>
                </div>
                <Box
                  className="productDescription"
                  dir="rtl"
                  sx={{
                    background:
                      theme?.palette?.mode === "dark"
                        ? maintheme?.lightblack
                        : maintheme?.paperColor,
                    color:
                      theme?.palette?.mode === "dark"
                        ? maintheme?.paperColor
                        : "#000000",
                  }}
                >
                  {token && (
                    <>
                      <h4>وصف المادة</h4>
                      <p
                        style={{
                          color:
                            theme?.palette?.mode === "dark"
                              ? maintheme?.paperColor
                              : "#000000",
                        }}
                      >
                        {dataMaterial?.description || "لايوجد"}
                      </p>
                    </>
                  )}
                  {!token && (
                    <>
                      <hr />
                      <Typography>
                        أذا كنت تريد أستكشاف المزيد من المعلومات أو حجز المادة
                        يجب تسجيل الدخول أولا
                        <Link to={"/login"}>تسجيل الدخول</Link>
                      </Typography>
                    </>
                  )}
                </Box>
              </div>
            </>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default InformationMaterial;

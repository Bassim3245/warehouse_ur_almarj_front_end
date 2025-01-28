import { useState, useMemo, useRef } from "react";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Print } from "@mui/icons-material";
import { BottomRoot, BottomSend } from "utils/Content";
import { useReactToPrint } from "react-to-print";
import { formatDateYearsMonth } from "../../utils/Function";
import PopupForm from "../../components/PopupForm";
import { BackendUrFile, BackendUrl } from "../../redux/api/axios";
import Logo from "../../Layout/logo";

export default function PrintPdInformation({ dataMaterial }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const materialDetails = useMemo(
    () => [
      { label: "أسم المادة", value: dataMaterial?.name_material },
      { label: "التصنيف الرئيسي", value: dataMaterial?.main_Class_name },
      { label: "حالة المادة", value: dataMaterial?.state_name },
      { label: "نوع المادة", value: dataMaterial?.typ_material },
      {
        label: "تاريخ الشراء",
        value: formatDateYearsMonth(dataMaterial?.puchase_date),
      },
      { label: "أسم الوزارة المسلمة", value: dataMaterial?.ministry_name_from },
      { label: "أسم الجهة المسلمة", value: dataMaterial?.entity_name_from },
      { label: "أسم الوزارة المستلمة", value: dataMaterial?.ministry_name_buy },
      { label: "أسم الجهة المستلمة", value: dataMaterial?.entity_name_buy },
      { label: "الكمية المسلمة", value: dataMaterial?.Quantity_buy },
      { label: "رقم الهاتف", value: dataMaterial?.phone_number },
      { label: "العنوان", value: dataMaterial?.governorate_name },
      { label: "الوصف", value: dataMaterial?.description },
    ],
    [dataMaterial]
  );

  const renderFormContent = () => (
    <Box
      sx={{
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
      dir="rtl"
    >
      <div className="mt-4">
        <div
          ref={componentRef}
          className="p-4"
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "20mm",
            margin: "auto",
            backgroundColor: "white",
          }}
        >
          <div className="d-flex justify-content-center mb-4 "dir="ltr">
            <Logo />
          </div>
          <Divider />
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            {materialDetails.map((detail, index) => (
              <Box
                component="li"
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Typography variant="body1" component="span">
                  {detail.label}:
                </Typography>
                <Typography variant="body1" component="span">
                  {detail.value || "-"}
                </Typography>
              </Box>
            ))}
            {dataMaterial?.images?.map((item, index) => (
              <div key={index} style={{ padding: "8px 0" }}>
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "200mm",
                    marginTop: "10mm",
                  }}
                  src={`${BackendUrFile}/${item?.file_name}`}
                  alt="Material"
                />
              </div>
            ))}
          </Box>
        </div>
      </div>
    </Box>
  );

  const renderFormActions = () => (
    <>
      <BottomRoot onClick={() => setOpen(false)}>{t("close")}</BottomRoot>
      <BottomSend type="button" onClick={handlePrint}>
        {t("طباعة")}
      </BottomSend>
    </>
  );
  return (
    <div>
      <IconButton onClick={() => setOpen(true)} disableRipple>
        <Print style={{ fontSize: "3rem" }} />
      </IconButton>
      <PopupForm
        title={t("رفع كتاب المناقلة")}
        open={open}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
        width="100%"
        content={renderFormContent()}
        footer={renderFormActions()}
      />
    </div>
  );
}

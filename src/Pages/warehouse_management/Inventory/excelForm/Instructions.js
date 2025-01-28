import { Box, Typography, Grid } from "@mui/material";
import imageWelcome from "../../../../assets/image/picture.png";
import { useSelector } from "react-redux";
const Instructions = () => {
  const { maintheme } = useSelector((state) => state.ThemeData);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
        }}
        dir="rtl"
      >
        <Typography sx={{ marginTop: 1,fontSize:{xs:"1.5rem",sm:"2rem"} }}>
          أهلاً وسهلاً بك في نظام أدارة المخازن
        </Typography>
      </Box>
      {/* Steps Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
        dir="rtl"
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ color: maintheme.light_purple, fontWeight: "bold" }}
          >
            يرجى اتباع الخطوات التالية لإتمام العملية بنجاح:
          </Typography>
          <ul style={{ marginTop: 16, lineHeight: "1.8", fontSize: "1rem" }}>
            <li>الخطوة الأولى: تحميل قالب Excel المخصص.</li>
            <li>
              الخطوة الثانية: بعد تحميل الملف وملء المعلومات المطلوبة، يمكنك الانتقال إلى الخطوة التالية.
            </li>
            <li>الخطوة الثالثة: مراجعة المواد وإجراء التعديلات إن لزم الأمر.</li>
            <li>الخطوة الرابعة: حفظ البيانات في قاعدة البيانات.</li>
          </ul>
          <Typography
            sx={{
              marginTop: 2,
              fontSize: "0.875rem",
              color: "red",
              fontWeight: "bold",
            }}
          >
            ملاحظة: يُسمح بإضافة ما يصل إلى 100 مادة فقط إلى ملف Excel.
          </Typography>
        </Box>
        {/* Image Section */}
        <Box>
          <Grid container spacing={2} alignItems="center" sx={{ marginTop: 4 }}>
            <Grid item xs={12} md={6}>
              <img src={imageWelcome} width={200} alt="Welcome Illustration" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default Instructions;

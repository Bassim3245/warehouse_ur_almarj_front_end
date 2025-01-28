import React from "react";
import { Container, Grid, Typography, Button, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Email,
  Phone,
  LocationOn,
  Inventory,
  Assessment,
  LocalShipping,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(135deg, #004d40 0%, #00796b 100%)",
  color: "white",
  padding: theme.spacing(4),
  textAlign: "right",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('/warehouse-pattern.png') repeat",
    opacity: 0.1,
    pointerEvents: "none",
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "right",
  height: "100%",
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  border: "1px solid #e0e0e0",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 20px rgba(0, 121, 107, 0.2)",
    borderColor: "#00796b",
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  backgroundColor: "#e0f2f1",
  color: "#00796b",
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  marginLeft: "auto",
}));

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: "#004d40",
  color: "white",
  marginTop: "auto",
  textAlign: "right",
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexDirection: "row-reverse",
  "& .MuiSvgIcon-root": {
    color: "#4db6ac",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  fontSize: "1.2rem",
  textTransform: "none",
  background: "linear-gradient(45deg, #00897b 30%, #4db6ac 90%)",
  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
  "&:hover": {
    background: "linear-gradient(45deg, #00796b 30%, #00897b 90%)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  },
}));
export default function Home() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        paddingTop: "0px",
        marginTop: "0px",
      }}
      dir="rtl"
    >
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                fontWeight="bold"
                sx={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                {t("نظام إدارة المخازن المتكامل")}
              </Typography>
              <Typography
                variant="h5"
                paragraph
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.8,
                }}
              >
                {t(
                  "حل متكامل لإدارة المخازن بكفاءة عالية وتحكم كامل، يساعدك في تنظيم وإدارة مخزونك بطريقة ذكية وفعالة"
                )}
              </Typography>
              <StyledButton> {t("ابداء النظام")} </StyledButton>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="right"
          gutterBottom
          fontWeight="bold"
          sx={{
            color: "#004d40",
            mb: 6,
          }}
        >
          {t("مميزات النظام")}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={0}>
              <FeatureIcon>
                <Inventory sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography
                variant="h5"
                gutterBottom
                fontWeight="bold"
                color="#00695c"
              >
                {t("ادارة المخازن")}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {t(
                  "حل متكامل لإدارة المخازن بكفاءة عالية وتحكم كامل، يساعدك في تنظيم وإدارة مخزونك بطريقة ذكية وفعالة"
                )}
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={0}>
              <FeatureIcon>
                <Assessment sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography
                variant="h5"
                gutterBottom
                fontWeight="bold"
                color="#00695c"
              >
                {t("ادارة التقارير والتحليلات")}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {t(
                  "تقارير تفصيلية وتحليلات متقدمة تساعدك في اتخاذ القرارات المناسبة وتحسين كفاءة العمل"
                )}
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={0}>
              <FeatureIcon>
                <LocalShipping sx={{ fontSize: 32 }} />
              </FeatureIcon>
              {/* <Typography
                variant="h5"
                gutterBottom
                fontWeight="bold"
                color="#00695c"
              >
                إدارة الشحنات
              </Typography> */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {t(
                  "ادارة الشحنات والتوصيلات بكفاءة عالية، يمكنك تتبع وتحليل كل شحنة بشكل دقيق ومباشر"
                )}
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
      <Footer component="footer">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                color="#4db6ac"
              >
                {t("نظام إدارة المخازن المتكامل")}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, opacity: 0.9, lineHeight: 1.8 }}
              >
                {t(` نظام إدارة المخازن المتكامل هو حل متطور يساعد الشركات في إدارة
                مخزونها بكفاءة عالية، مع توفير أدوات متقدمة للتحليل والمتابعة والتقارير
                `)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                color="#4db6ac"
              >
                {t("اتصل بنا")}
              </Typography>
              <ContactItem>
                <Typography>
                  {t("support@warehouse-system.com")}
                </Typography>
                <Email />
              </ContactItem>
              <ContactItem>
                <Typography>+966 123 456 789</Typography>
                <Phone />
              </ContactItem>
              <ContactItem>
                <Typography>{t(" العراق - بغداد")}</Typography>
                <LocationOn />
              </ContactItem>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              mt: 6,
              pt: 3,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              opacity: 0.8,
            }}
          >
            جميع الحقوق محفوظة © {new Date().getFullYear()} نظام إدارة المخازن
          </Typography>
        </Container>
      </Footer>
    </Box>
  );
}

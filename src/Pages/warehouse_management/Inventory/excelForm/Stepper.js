import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import InfoIcon from "@mui/icons-material/Info";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PreviewIcon from "@mui/icons-material/Preview";
import ExcelTemplate from "./excelTempletData";
import Instructions from "./Instructions";
import ExcelUpload from "./ExcelUpload";
import ReviewDataSet from "./ReviewDataSet";

// Styled Components
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed ? "#784af4" : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
}));
function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;
  const icons = {
    1: <InfoIcon />,
    2: <FileDownloadIcon />,
    3: <UploadFileIcon />,
    4: <PreviewIcon />,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}
ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};
export default function CustomizedStepper(props) {
  const [dataFileExcel, setDataFileExcel] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [saveData, setSaveData] = useState(false);
  // Define 4 consistent steps
  const steps = [
    "المواد  الراكدة ",
    "الحصول على قالب  file excel",
    "رفع file excel",
    "مراجعة البيانات قبل الحفظ بقاعدة البيانات",
  ];
  const dataSteps = [
    <Instructions />,
    <ExcelTemplate
      dataUserById={props?.dataUserById}
      dataSubClass={props?.dataSubClass}
      dataMainClass={props?.dataMainClass}
      dataUnitMeasuring={props?.dataUnitMeasuring}
      materialInfo={props?.materialInfo}
      wareHouseData={props?.wareHouseData}
      labId={props?.labId}
    />,
    <ExcelUpload
      setDataFileExcel={setDataFileExcel}
      setActiveStep={setActiveStep}
      setRefresh={setRefresh}
      refresh={refresh}
      labId={props?.labId}
    />,
    <ReviewDataSet
      dataFileExcel={dataFileExcel}
      dataUserById={props?.dataUserById}
      dataSubClass={props?.dataSubClass}
      dataMainClass={props?.dataMainClass}
      dataUnitMeasuring={props?.dataUnitMeasuring}
      materialInfo={props?.materialInfo}
      setDataFileExcel={setDataFileExcel}
      setRefresh={setRefresh}
      setSaveData={setSaveData}
      warehouseId={props?.warehouseId}
      dataUserLab={props?.dataUserLab}
    />,
  ];
  const handleNext = () => {
    if (activeStep < dataSteps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };
  const handleFinish = () => {
    alert("All steps completed successfully!");
    handleReset();
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Stack sx={{ width: "100%" }} spacing={5}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps?.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === dataSteps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished!
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>أعادة تعيين</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>{dataSteps[activeStep]}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              رجوع
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={
                activeStep === steps.length - 1
                  ? saveData && handleFinish
                  : handleNext
              }
            >
              {activeStep === steps.length - 1 ? saveData && "نهاية" : "التالي"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Stack>
  );
}

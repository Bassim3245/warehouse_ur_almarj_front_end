import CustomizedStepper from "./Stepper";
import {
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  useTheme,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import { ButtonSave } from "../../../../utils/Content";
import logo from "../../../../assets/image/1671635909.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
function HandelExcelFile({
  dataMainClass,
  dataSubClass,
  materialInfo,
  dataUserById,
  dataUnitMeasuring,
  wareHouseData,
  dataUserLab,
  warehouseId
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  return (
    <React.Fragment>
      <ButtonSave variant="outlined" onClick={handleClickOpen}>
        رفع المواد من خلال file excel
      </ButtonSave>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor:
              theme.palette.mode === "dark" ? "#121212" : "#ffffff",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton edge="start" onClick={handleClose}>
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#121212",
              }}
            ></Typography>
            <Box>
              <img src={logo} alt="Logo"  width={"90px"} />
            </Box>
          </Toolbar>
        </AppBar>
        <div className={`${theme.palette.mode === "dark" ? "bg-dark" : ""} `}>
          <div
            className={`m-5 ${
              theme.palette.mode === "dark" ? "bg-dark" : ""
            } p-3 rad-10 `}
          >
            <CustomizedStepper
              dataUserById={dataUserById}
              dataSubClass={dataSubClass}
              dataMainClass={dataMainClass}
              dataUnitMeasuring={dataUnitMeasuring}
              materialInfo={materialInfo}
              wareHouseData={wareHouseData}
              warehouseId={warehouseId}
              dataUserLab={dataUserLab}
            />
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default HandelExcelFile;

import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setscreenwidth } from "../redux/windoScreen/settingDataSlice";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function PopupForm(props) {
  const screenwidth = useSelector((state) => state.settingData.screenWidth);
  const globalTheme = useSelector((state) => state.ThemeData.globalTheme);
  const dispatch = useDispatch();
const theme=useTheme()
  useEffect(() => {
    const handleResize = () => {
      dispatch(setscreenwidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const handleClose = () => {
    props?.setOpen(false); // Close dialog only when explicitly triggered
  };

  const getMaxWidth = () => {
    if (props?.width) {
      return props?.width + " !important";
    } else if (props?.customeWidth) {
      return props?.customeWidth;
    } else {
      return {
        xs: "95% !important",
        sm: "85% !important",
        md: "80% !important",
        lg: "60% !important",
      };
    }
  };
  return (
    <Dialog
      open={props?.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose} // Close dialog explicitly
      aria-describedby="alert-dialog-slide-description"
      sx={{
        width: "100%",
        height: screenwidth <= 700
          ? "100%"
          : props?.customeHeight || "auto",
        "& .MuiPaper-root": {
          width: "100%",
          height: screenwidth <= 700
            ? "100%"
            : props?.customeHeight || "auto",
          padding: screenwidth <= 700
            ? "10px 0 !important"
            : props?.customePadding || "30px 20px !important",
          minHeight: "400px",
          maxWidth: screenwidth <= 700 ? "100%" : getMaxWidth(),
          backgroundColor:theme.palette.mode==="dark"?"#000": props?.backgroundColor || "#fff",
        },
      }}
      BackdropProps={{
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(3px)",
        },
      }}
      fullScreen={screenwidth <= 700 || props?.isFullScreen}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignSelf: "center",
          fontFamily: "Cairo-Bold",
          fontSize: "22px !important",
          color:theme.palette.mode==="dark"?"#fff":"#000" , 
        }}
      >
        {props?.title}
      </DialogTitle>
      <DialogContent
       sx={{
        "&.MuiDialogContent-root": {
          paddingTop: "10px",
        },
      }}
      >{props?.content}</DialogContent>
      <DialogActions>{props?.footer}</DialogActions>
    </Dialog>
  );
}


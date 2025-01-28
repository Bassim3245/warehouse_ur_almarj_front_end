import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ContainerOfInput = styled(Box)(
  ({ theme, mainTheme, customeWidth }) => ({
    boxShadow: "0px 12px 40px #00000014 !important",
    width: customeWidth ? customeWidth : "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px auto",
    "& .MuiTextField-root,& .MuiTextField-root .MuiFilledInput-root": {
      height: "60px !important",
      background: `${
        theme.palette.mode === "dark" ? "#121212" : "#FFFFFF"
      } 0% 0% no-repeat padding-box !important`,
      boxShadow: "0px 12px 40px #00000014 !important",
      opacity: "1 !important",
    },
    "& .MuiFilledInput-root:before": {
      border: "none !important",
      outline: "none !important",
    },
    "& .MuiFilledInput-root:after": {
      border: "none !important",
      outline: "none !important",
    },
    "& .MuiFilledInput-root.Mui-focused:before": {
      top: 0,
      left: 0,
      bottom: 0,
      width: "5px !important",
      height: "100% !important",
      background: mainTheme?.secondaryColor,
      overflow: "hidden",
      transition: "all 0.9s ease",
    },
    "& .MuiTextField-root .MuiFormLabel-root": {
      textAlign: "left",
      font: "normal normal normal 15.5px/26px Cairo",
      letterSpacing: "0.7px",
      color: mainTheme?.primaryColor,
      opacity: "0.95",
    },
    "& .MuiTextField-root .MuiFilledInput-input": {
      textAlign: "left !important",
      font: "normal normal 13px/25px Cairo-Medium !important",
      letterSpacing: "0.9px !important",
      color: `${mainTheme?.primaryColor}     !important`,
      opacity: "1",
      height: "30px !important",
      paddingRight: "55px !important",
      // width:'81%'
    },
  })
);

export const ContainerOfInputFields = styled(Box)(
  ({
    theme,
    customePaddingRight,
    paddingHorizontal,
    customePaddingVertical,
    mainTheme,
    customeWidth,
    customHeight,
    haswidth,
    isForm,
    hasMultiLine,
    direction,
    maxHeight,
    ...props
  }) => ({
    // boxShadow: "0px 12px 40px #00000014 !important",
    // background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    // boxShadow: "0px 0px 40px 10px #00000014 !important",
    opacity: "1 !important",
    width: haswidth ? customeWidth : "85%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignContents: "center",
    margin: haswidth ? "0" : "0 auto",
    padding: paddingHorizontal ? paddingHorizontal : "2px 10px",
    justifyContent: "center",
    alignItems: "center",
    "& textarea": {
      overflowY: "sroll !important",
      // minHeight: hasMultiLine?'100px !important':'55px !important',
      maxHeight: hasMultiLine
        ? maxHeight
          ? maxHeight
          : "200px !important"
        : customHeight
        ? customHeight
        : "55px !important",
      // overflowY: "auto !important",
      position: "relative",
      top: "12px",
      textAlign: "justify",
    },
    "& .MuiTextField-root,& .MuiTextField-root .MuiFilledInput-root": {
      minHeight: customHeight
        ? customHeight
        : hasMultiLine
        ? "45px !important"
        : "55px !important",
      width: "100%",
      background: `${
        theme.palette.mode === "dark"
          ? mainTheme.lightblack
          : mainTheme.paperColor
      } 0% 0% no-repeat padding-box !important`,
      boxShadow: isForm
        ? "0px 2px 10px -2px lightgrey !important"
        : "0px 6px 20px #00000014 !important",
      opacity: "1 !important",
      textAlign: "justify !important",
    },
    "& .MuiTextField-root .MuiFilledInput-root": {
      padding: hasMultiLine ? "12px 10px  !important" : "auto",
    },
    "& .MuiInputLabel-asterisk": {
      color: "#ff0000 !important",
      fontSize: "20px !important",
    },
    "& .MuiFilledInput-root:before": {
      border: "none !important",
      outline: "none !important",
    },
    "& .MuiFilledInput-root:after": {
      border: "none !important",
      outline: "none !important",
    },
    "& .MuiFilledInput-root.Mui-focused:before": {
      top: 0,
      left: 0,
      bottom: 0,
      width: "5px !important",
      height: "100% !important",
      background: mainTheme?.iconColor,
      overflow: "hidden",
      transition: "all 0.9s ease",
    },
    "& .MuiTextField-root .MuiFormLabel-root": {
      textAlign: "left",
      font: "normal normal 15.5px/26px Cairo",
      letterSpacing: "0.7px",
      color: `${
        theme.palette.mode === "dark"
          ? mainTheme.colorWhite
          : mainTheme?.colorblack
      } !important`,
      opacity: "0.95",
    },
    "& .MuiTextField-root .MuiFilledInput-input": {
      textAlign: "left",
      font: "normal normal normal 16px/33px Cairo",
      letterSpacing: "0px",
      color: `${mainTheme?.primaryColor} !important`,
      opacity: "1",
      paddingRight: customePaddingRight ? customePaddingRight : "50px",
      // width:'81%'
    },
    "& .closeIcon": {
      position: "absolute",
      top: "16px",
      right: "5px",
      color: mainTheme?.iconColor,
      cursor: "pointer",
      backgroundColor: "#ebebeba0",
      borderRadius: "50%",
      width: "27px",
      height: "27px",
      padding: "2.8px",
    },
    "& .textAreaIcons": {
      // top:'13px',
      right: "22px",
    },
    "& .phone": {
      top: "26px !important",
    },
    "& .MuiFormHelperText-root": {
      fontSize: props?.CustomFontSize ? props?.CustomFontSize : "15px",
      // marginTop:'10px !important',
      // marginBottom:'10px !important',
      // height:'30px !important',
    },
    "& .errors .MuiFilledInput-root:before": {
      backgroundColor: "red !important",
      top: 0,
      left: 0,
      bottom: 0,
      width: "5px !important",
      height: "100% !important",
      // background: mainTheme?.iconColor,
      overflow: "hidden",
      transition: "all 0.9s ease",
    },
  })
);

export const ContainerOfSelectField = styled(Box)(
  ({
    theme,
    mainTheme,
    customeWidth,
    customHeight,
    haswidth,
    hasError,
    isForm,
    customPadding,
  }) => ({
    // boxShadow: "0px 12px 40px #00000014 !important",
    // background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    // boxShadow: "0px 0px 40px 10px #00000014 !important",
    opacity: "1 !important",
    width: haswidth ? customeWidth : "85%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignContents: "center",
    margin: haswidth ? "0" : "0 auto",
    padding: customPadding ? customPadding : "0px 10px",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiAutocomplete-root": {
      position: "relative",
    },
    "& .MuiTextField-root,& .MuiTextField-root .MuiFilledInput-root": {
      minHeight: customHeight ? customHeight : "55px !important",
      width: "100%",
      background: `${
        theme.palette.mode === "dark"
          ? mainTheme.lightblack
          : mainTheme.paperColor
      } 0% 0% no-repeat padding-box !important`,
      boxShadow: isForm
        ? "0px 2px 10px -2px lightgrey !important"
        : "0px 6px 20px #00000014 !important",
      opacity: "1 !important",
      // overflowY: "scroll"
    },
    "& .MuiFilledInput-root:before": {
      border: "none !important",
      outline: "none !important",
    },
    "& .MuiFilledInput-root:after": {
      border: "none !important",
      outline: "none !important",
    },
    "& .MuiAutocomplete-endAdornment": {
      top: "15px",
    },

    "& .MuiAutocomplete-root.MuiAutocomplete-hasClearIcon ::before": {
      top: 0 + " !important",
      left: 0 + " !important",
      bottom: 0 + " !important",
      width: "5px !important",
      height: "100% !important",
      background: hasError
        ? "red !important"
        : mainTheme?.iconColor + " !important",
      overflow: "hidden !important",
      transition: "all 0.9s ease",
      zIndex: "1000 !important",
      position: "absolute !important",
    },
    "& .MuiAutocomplete-root.Mui-focused ::before": {
      top: 0 + " !important",
      left: 0 + " !important",
      bottom: 0 + " !important",
      width: "5px !important",
      height: "100% !important",
      background: hasError
        ? "red !important"
        : mainTheme?.iconColor + " !important",
      overflow: "hidden !important",
      transition: "all 0.9s ease",
      zIndex: "1000 !important",
      position: "absolute !important",
    },
    "& .MuiAutocomplete-root .MuiFormControl-root .MuiFormLabel-root": {
      textAlign: "left",
      font: "normal normal 15.5px/26px Cairo",
      letterSpacing: "0.7px",
      color: `${
        theme.palette.mode === "dark"
          ? mainTheme.colorWhite
          : mainTheme?.colorblack
      } !important`,
      opacity: "0.95",
    },
    "& .MuiAutocomplete-root .MuiFormControl-root .MuiFilledInput-input": {
      textAlign: "left",
      font: "normal normal normal 16px/33px Cairo",
      letterSpacing: "0px",
      color: `${mainTheme?.primaryColor} !important`,
      opacity: "1",
      // width:'81%'
    },
    "& .closeIcon": {
      position: "absolute",
      top: "20px",
      right: "15px",
      color: mainTheme?.iconColor,
      cursor: "pointer",
    },
    "& .MuiChip-root": {
      height: "25px !important",
    },
    "& .MuiChip-label": {
      fontFamily: "Cairo-Light",
    },
    "& .MuiChip-deleteIcon": {
      fontSize: "14px",
    },
  })
);

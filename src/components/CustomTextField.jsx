import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ContainerOfInputFields } from "./ThemDesign";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
function CustomTextField({
  label,
  error,
  message,
  value,
  onChange,
  onClearClick,
  readOnly,
  type,
  haswidth,
  hasMultipleLine,
  customWidth,
  customePadding,
  focused,
  paddingHorizontal,
  inputPropStyle,
  errorMessage,
  disable,
  customHeight,
  hasePassswordEye,
  maxHeight,
  ...props
}) {
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const inputRef = React.useRef(null);
  const [showPassword, setShowPassword] = useState(null);
  const globalTheme = useSelector((state) => state?.ThemeData?.globalTheme);
  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(setMaintheme())
  // }, [])

  return (
    <ContainerOfInputFields
      mainTheme={maintheme}
      customeWidth={customWidth ? customWidth : "100%"}
      isForm={true}
      haswidth={haswidth ? true : false}
      hasMultiLine={hasMultipleLine ? true : false}
      paddingHorizontal={paddingHorizontal}
      customHeight={customHeight}
      maxHeight={maxHeight}
      CustomFontSize={props?.CustomFontSize}
    >
      <Box
        sx={{
          position: "relative",
          // margin: "5px 0",
          width: "100%",
          backgroundColor: "#fff",
          padding: customePadding ? customePadding : "auto",
        }}
        className="orderdata"
      >
        <TextField
          placeholder={props?.placeHolder ? props?.placeHolder : ""}
          variant="filled"
          label={label}
          value={value}
          onChange={(e) => onChange && onChange(e)}
          type={type ? (showPassword ? "text" : type) : "text"}
          focused={focused ? focused : true}
          // ref={inputRef}
          error={!!error} // Ensure the error prop is a boolean
          helperText={errorMessage}
          autoComplete="new-password"
          multiline={hasMultipleLine ? true : false}
          onKeyDown={props?.onKeyDown}
          InputProps={{
            readOnly: readOnly,
            inputProps: {
              ...(props?.minNumber ? { min: props?.minNumber } : {}),
            },
          }}
          required={props?.required ? props.required : false}
          disabled={disable}
          inputProps={{
            min: 0,
            style: {
              ...inputPropStyle,
            },
          }}
          className={`${error ? "errors" : ""}`}
        />
        {hasePassswordEye && value ? (
          !showPassword ? (
            <VisibilityIcon
              sx={{ color: globalTheme.mainColor, right: "35px !important" }}
              className="closeIcon "
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <VisibilityOffIcon
              className="closeIcon mr-4"
              sx={{ color: globalTheme.mainColor, right: "35px !important" }}
              onClick={() => setShowPassword(false)}
            />
          )
        ) : null}
        {value && !readOnly ? (
          <CloseIcon
            className="closeIcon"
            onClick={() => onClearClick && onClearClick()}
          />
        ) : null}
      </Box>
      {error && message?.length ? (
        <Box
          sx={{
            height: "fit-content",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            width: "95%",
          }}
        >
          {message && message?.length > 0
            ? message?.map((messg, index) => (
                <span
                  key={index}
                  style={{
                    fontFamily: "Cairo-Bold",
                    fontSize: props?.CustomFontSize
                      ? props?.CustomFontSize
                      : "14px",
                    color: "red",
                    height: "auto",
                  }}
                >
                  {messg}
                </span>
              ))
            : null}
        </Box>
      ) : null}
    </ContainerOfInputFields>
  );
}

export default CustomTextField;

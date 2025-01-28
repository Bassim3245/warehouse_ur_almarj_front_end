import React from "react";
import { ContainerOfInputFields } from "./ThemDesign";
import { Box, TextField } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
export default function CustomDatePicker({
  value,
  setValue,
  label,
  is_dateTime,
  format,
  placeholder,
  textError,
  error,
  is_Time,
  minDate,
  maxDate,
  customWidth,
  paddingHorizontal,
  borderPosition = "left", // Add this prop with a default value
  borderColor, // Add this prop
  ...props
}) {
  const maintheme = useSelector((state) => state.ThemeData?.maintheme);
  const dispatch = useDispatch();
  const borderStyle =
    borderPosition === "left"
      ? `5px solid ${borderColor || maintheme?.mainColor} !important`
      : borderPosition === "right"
      ? `5px solid ${borderColor || maintheme?.mainColor} !important`
      : "none";
  return (
    <ContainerOfInputFields
      mainTheme={maintheme}
      customeWidth={customWidth ? customWidth : "100%"}
      hasError={error}
      haswidth={true}
      isForm={true}
      paddingHorizontal={paddingHorizontal}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: "#fff",
          borderLeft: borderPosition === "left" ? borderStyle : "none",
          borderRight: borderPosition === "right" ? borderStyle : "none",
        }}
        className="orderdata"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {is_dateTime && !is_Time ? (
            <DateTimePicker
              label={label}
              inputFormat={format ? format : "YYYY/MM/DD HH:mm:ss"}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              inputProps={{
                placeholder: placeholder ? placeholder : "not specified yet",
                fontSize: "14px", // Adjust the font size as needed
              }}
              onChange={(date) => setValue(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  focused={true}
                  className={``}
                  error={error}
                  helperText={textError}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder
                      ? placeholder
                      : "not specified yet",
                    fontSize: "14px", // Adjust the font size as needed
                  }}
                  required={props?.required ? props.required : false}
                />
              )}
            />
          ) : !is_Time ? (
            <DatePicker
              label={label}
              inputFormat={format ? format : "YYYY/MM/DD"}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              readOnly={props?.readOnly}
              inputProps={{
                placeholder: placeholder ? placeholder : "not specified yet",
                fontSize: "14px", // Adjust the font size as needed
              }}
              onChange={(date) => setValue(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  focused={true}
                  className={``}
                  error={error}
                  helperText={textError}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder
                      ? placeholder
                      : "not specified yet",
                    fontSize: "14px", // Adjust the font size as needed
                  }}
                  required={props?.required ? props.required : false}
                />
              )}
            />
          ) : props?.is_year ? (
            <DatePicker
              views={["year"]} // Only show the year view
              openToYearSelection // Open directly to year selection
              label={label}
              inputFormat={format ? format : "YYYY/MM/DD"}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              inputProps={{
                placeholder: placeholder ? placeholder : "not specified yet",
                fontSize: "14px", // Adjust the font size as needed
              }}
              onChange={(date) => setValue(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  focused={true}
                  className={``}
                  error={error}
                  helperText={textError}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder
                      ? placeholder
                      : "not specified yet",
                    fontSize: "14px", // Adjust the font size as needed
                  }}
                  required={props?.required ? props.required : false}
                />
              )}
            />
          ) : (
            <TimePicker
              label={label}
              inputFormat={format ? format : "YYYY/MM/DD"}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              inputProps={{
                placeholder: placeholder ? placeholder : "not specified yet",
                fontSize: "14px", // Adjust the font size as needed
              }}
              onChange={(date) => setValue(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  focused={true}
                  className={``}
                  error={error}
                  helperText={textError}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder
                      ? placeholder
                      : "not specified yet",
                    fontSize: "14px", // Adjust the font size as needed
                  }}
                  required={props?.required ? props.required : false}
                />
              )}
            />
          )}
          {value && !props?.readOnly ? (
            <CloseIcon
              className="closeIcon"
              onClick={() => setValue(null)}
              sx={{
                right: "37px !important",
                top: "14px !important",
              }}
            />
          ) : null}
        </LocalizationProvider>
      </Box>
    </ContainerOfInputFields>
  );
}

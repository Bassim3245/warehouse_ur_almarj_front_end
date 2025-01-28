import React, { useState, useCallback, useMemo, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { debounce } from "lodash";
import { Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
function AutocompleteExample({
  dataToSetFilter,
  setFilteredData,
  filterData,
  getOption, // Renamed to match the prop name passed
}) {
  const [inputValue, setInputValue] = useState("");
  const {t}=useTranslation()
  useEffect(() => {
    setFilteredData(dataToSetFilter);
    setInputValue(""); // Clear the input value when the project changes
  }, [dataToSetFilter, setFilteredData]);
  const debouncedFilterProducts = useMemo(
    () => debounce((newInputValue) => filterProducts(newInputValue), 300),
    [dataToSetFilter, setFilteredData]
  );
  const handleInputChange = useCallback(
    (event, newInputValue) => {
      setInputValue(newInputValue);
      debouncedFilterProducts(newInputValue);
    },
    [debouncedFilterProducts]
  );
  const filterProducts = useCallback(
    (inputValue) => {
      const lowerCaseInput = inputValue.toLowerCase().trim();
      if (lowerCaseInput === "") {
        setFilteredData(dataToSetFilter); // Reset to show all dataToSetFilter if input is empty
      } else {
        const filtered = dataToSetFilter.filter((item) =>
          item?.main_Class_name?.toLowerCase()?.includes(lowerCaseInput) ?? false
        );
        setFilteredData(filtered); // Update filtered products based on input
      }
    },
    [dataToSetFilter, setFilteredData]
  );
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={filterData}
      getOptionLabel={(option) => getOption(option)} // Use getOptionLabel prop
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label={t("search")}> <Search/> </TextField>}
    />
  );
}

export default AutocompleteExample;
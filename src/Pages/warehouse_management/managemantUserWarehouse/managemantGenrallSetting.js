import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StroeData from "./StroeData";
import { getToken } from "../../../utils/handelCookie";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import { hasPermission } from "../../../utils/Function";
import { getAllWarehouse } from "../../../redux/wharHosueState/WareHouseAction";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LabTabsWareHouse() {
  const token = getToken();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const { rtl } = useSelector((state) => state?.language);
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const [value, setValue] = React.useState(0);
  const { wareHouseData } = useSelector((state) => state?.wareHouse);
  const { dataUserById } = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const [deleteItem, setDelete] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  // Fetch roles and permissions by user ID
  useEffect(() => {
    const userId = dataUserById?.user_id;
    if (userId) {
      dispatch(getRoleAndUserId({ token, userId }));
    }
  }, [dispatch, dataUserById?.user_id, token]);
  // Parse permission data
  useEffect(() => {
    if (Permission?.permission_id) {
      try {
        setPermissionData(JSON.parse(Permission.permission_id));
      } catch (error) {
        console.error("Error parsing permission_id:", error);
      }
    }
  }, [Permission]);
  // Call fetch functions on dependencies change
  useEffect(() => {
    const entity_id = dataUserById?.entity_id;
    dispatch(getAllWarehouse(entity_id));
  }, [refreshKey, dispatch]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Dynamic tab and panel rendering
  const tabs = [
    {
      label: t("أضافة المخازن"),
      component: (
        <StroeData
          dataUserById={dataUserById}
          wareHouseData={wareHouseData}
          dataUser={dataUser}
          token={token}
          rtl={rtl}
          theme={theme}
          t={t}
          seLoading={setLoading}
          setDelete={setDelete}
          setAnchorEl={setAnchorEl}
          deleteItem={deleteItem}
          anchorEl={anchorEl}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
          hasPermission={hasPermission}
          roles={roles}
          permissionData={permissionData}
        />
      ),
      permissionKey: roles?.add_store?._id,
    },
  ];

  const filteredTabs = tabs?.filter((tab) =>
    hasPermission(tab?.permissionKey, permissionData)
  );

  return (
    <Box sx={{ width: "100%" }} dir={rtl ? "rtl" : "ltr"}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {filteredTabs?.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {filteredTabs?.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab?.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import HeaderCenter from "../components/HeaderCenterComponent";
import axios from "axios";
import { BackendUrl } from "../redux/api/axios";
import { getToken } from "../utils/handelCookie";
import { Table } from "react-bootstrap";
import { useTheme } from "@mui/material";
import { getFileIcon } from "../utils/Function";
import { useSelector } from "react-redux";
function HelpAboutProject() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [direction, setDirection] = useState("");
  const { t } = useTranslation();
  const theme = useTheme();
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state.language;
  });
  useEffect(() => {
    setDirection(localStorage.getItem("language"));
  }, [t, useTranslation]);
  const [userGuid, setUserGuid] = useState([]);
  const token = getToken();
  const fetchUserGuid = async () => {
    try {
      const url = token ? "getDataUserGuid" : "getDataUserGuidIsShowGuid";
      const response = await axios.get(`${BackendUrl}/api/${url}`, {
        headers: {
          authorization: getToken(),
          "Content-Type": "application/octet-stream",
        },
      });
      setUserGuid(response?.data?.response);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  React.useEffect(() => {
    fetchUserGuid();
  }, []);
  return (
    <>
      <div id="" className="" dir={direction === "ar" ? "rtl" : ""}>
        <HeaderCenter title={t("layout.User Manual")} typeHeader="h3" />
        <div className="container mt-4">
          <Table
            striped
            bordered
            hover
            dir={rtl?.dir}
            variant={`${theme?.palette?.mode === "dark" ? "dark" : ""}`}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>{t("وصف")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userGuid?.map((item, index) => (
                <tr key={item?.id}>
                  <td>{index + 1}</td>
                  <td>{item?.description}</td>
                  <td>{getFileIcon(item?.file_name, "", "edit")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default HelpAboutProject;

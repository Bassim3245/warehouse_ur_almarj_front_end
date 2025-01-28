import React, { useState, useEffect, Fragment, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { BottomSend, ButtonSave, ColorLink } from "../../../utils/Content";
import { getToken } from "../../../utils/handelCookie";
export default function ShowDataUnitAndRole({ themeMode, label, token }) {
  const [open, setOpen] = useState(false);
  const [dataPermission, setPermissionData] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = useCallback(async () => {
    try {
      const [rolesResponse, permissionsResponse] = await Promise.all([
        axios.get(`${BackendUrl}/api/getRole`,{
          headers:{
            authorization:getToken()
          }
        }),
        axios.get(`${BackendUrl}/api/getAllPermissions`,{
          headers:{
            authorization:getToken()
          }
        }),
      ]);

      setDataGroup(rolesResponse?.data?.response || []);
      setPermissionData(permissionsResponse?.data || []);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  }, [token]);

  useEffect(() => {
    console.log(dataGroup,dataPermission);
    if (open) fetchData();
  }, [open, fetchData]);

  const handleSetPermission = (id) =>
    navigate(`/SetPermissionToGroup/${id}`);
  const renderRows = () => {
    if (label === "Role") {
      return dataGroup.map((item, index) => (
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.group_name}</td>
          <td>
            <ButtonSave className="ms-3">حذف</ButtonSave>
            <BottomSend className="ms-3">تعديل</BottomSend>
            <ColorLink onClick={() => handleSetPermission(item?.id)}>
              اضافة صلاحيات
            </ColorLink>
          </td>
        </tr>
      ));
    }

    if (label === "permissions") {
      return dataPermission?.map((item, index) => (
        <tr key={item?.id}>
          <td>{index + 1}</td>
          <td>{item?.permission_name}</td>
          <td>
            <BottomSend className="ms-3">تعديل</BottomSend>
          </td>
        </tr>
      ));
    }

    return null;
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        البيانات المدرجة
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Table
            striped
            bordered
            hover
            dir="rtl"
            variant={themeMode?.palette?.mode === "dark" ? "dark" : ""}
          >
            <thead>
              <tr>
                <th>#</th>
                {label === "Role" ? (
                  <>
                    <th>Role</th>
                    <th>action</th>
                  </>
                ) : label === "permissions" ? (
                  <>
                    <th>permissions</th>
                    <th>action</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            غلق
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

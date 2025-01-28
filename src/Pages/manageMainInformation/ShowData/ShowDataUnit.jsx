import * as React from "react";
import { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Table from "react-bootstrap/Table";
import { ButtonSave } from "../../../utils/Content";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import AllowDelete from "../../../components/AllowDelete";
import { getToken } from "../../../utils/handelCookie";
import ModelEdit from "../SubClassAndUnit/editDataSubandMeasuring";
export default function ShowDataUnite() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [dataUnit, setDataUnit] = useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [refresh, setRefresh] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/getAllDataUnits`, {
        headers: {
          authorization: getToken(),
        },
      });
      setDataUnit(response?.data?.response);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  React.useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, refresh]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <ButtonSave onClick={handleClickOpen}>البيانات المدرجة</ButtonSave>
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
            variant={theme?.palette?.mode === "dark" ? "dark" : ""}
          >
            <thead>
              <tr>
                <th> ةحدة القياس </th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {dataUnit?.map((item) => (
                <tr key={item?.unit_id}>
                  <td>{item?.measuring_unit}</td>
                  <td className="d-flex justify-content-center align-items-center gap-4 ">
                    {/* Uncomment and integrate ModelEdit if needed */}
                    <ModelEdit
                      setRefresh={setRefresh}
                      edit_id={item?.unit_id}
                      edit_value={item?.measuring_unit}
                      label={"UintMeasuring"}
                      edit_path={"editUnit"}
                    />
                    <AllowDelete
                      delete_id={item?.unit_id}
                      path_delete={"deleteUnitById"}
                      setRefresh={setRefresh}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
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

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
import ModelEdit from "../editData/editData";
import AllowDelate from "../../../components/AllowDelete";
import { getToken } from "../../../utils/handelCookie";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader";
export default function MainClassList() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [dataMainClass, setDataMainClass] = useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [refresh2, setRefresh] = useState(false);
  const [refresh3, setRefresh3] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const token = getToken();
  const fetchMainClassData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BackendUrl}/api/getDataMainClass`, {
        headers: {
          authorization: token,
        },
      });
      setDataMainClass(response?.data?.response);
    } catch (error) {
      console.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchMainClassData();
  }, [open, refresh2, refresh3]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {isLoading && <Loader />}
      <Fragment>
        <ButtonSave onClick={handleClickOpen}> البيانات المدرجة</ButtonSave>
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
              variant={`${theme?.palette?.mode === "dark" ? "dark" : ""}`}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>أسم الصنف الرئيسي</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataMainClass?.map((item, index) => (
                  <tr key={item?.mainClass_id}>
                    <td>{index + 1}</td>
                    <td>{item?.main_Class_name}</td>
                    <td>
                      <img
                        src={`${BackendUrl}/${item?.file_name}`}
                        alt=""
                        width={200}
                        height={200}
                      />
                    </td>
                    <td className="d-flex justify-content-center align-items-center gap-4 ">
                      <ModelEdit
                        edit_id={item?.mainClass_id}
                        edit_data={item?.main_Class_name}
                        edit_path="editMainClass"
                        setOpen={setOpen}
                        dataMainClass={dataMainClass}
                        ministries_id={item?.ministries_id}
                        label="mainClass"
                        labelFelid={t("mainClass")}
                        imageName={item?.file_name}
                        image_id={item?.id}
                        setRefresh3={setRefresh3}
                      />
                      <AllowDelate
                        delete_id={item?.mainClass_id}
                        path_delete={"deleteByIdMainClass"}
                        setRefresh={setRefresh}
                        setOpen={setOpen}
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
    </>
  );
}

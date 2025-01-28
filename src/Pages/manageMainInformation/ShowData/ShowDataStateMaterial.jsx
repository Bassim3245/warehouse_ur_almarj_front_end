import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { ButtonClearState } from "../../../utils/Content";
import ModelEdit from "../editData/editData";
import AllowDelate from "../../../components/AllowDelete";
import { useDispatch, useSelector } from "react-redux";
import { getDataStateName } from "../../../redux/StateMartrialState/stateMatrialAction";
export default function ShowData({ refresh, setRefresh }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { stateMaterial, } = useSelector(
    (state) => state.StateMaterial
  );
  React.useEffect(() => {
    dispatch(getDataStateName());
  }, [dispatch, refresh]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonClearState variant="outlined" onClick={handleClickOpen}>
        البيانات المدرجة
      </ButtonClearState>
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
            variant={theme.palette.mode === "dark" ? "dark" : ""}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>اسم الحالة </th>
                <th>اجراء</th>
              </tr>
            </thead>
            <tbody>
              {stateMaterial?.map((data, index) => (
                <tr key={data?.id}>
                  <td>{index + 1}</td>
                  <td>{data?.state_name}</td>
                  <td className="d-flex justify-content-center align-items-center gap-4">
                    <AllowDelate
                      delete_id={data?.id}
                      path_delete={"deleteMinistersById"}
                      setRefresh={setRefresh}
                    />
                    <ModelEdit
                      edit_id={data?.id}
                      edit_data={data?.state_name}
                      edit_path="EditStateName"
                      setOpen={setOpen}
                      setRefresh={setRefresh}
                      label="Ministries"
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
    </React.Fragment>
  );
}

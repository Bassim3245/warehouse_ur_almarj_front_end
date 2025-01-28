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
export default function ShowData(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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
                {props.label === "Entities" ? (
                  <>
                    <th>#</th>
                    <th>اسم الجهة </th>
                    <th>أسم الجهة</th>
                    <th>اجراء</th>
                  </>
                ) : (
                  <>
                    <th>#</th>
                    <th>اسم الوزارة </th>
                    <th>اجراء</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {props.label === "Entities"
                ? props?.DataShowInformationEntities?.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data?.Entities_name}</td>
                      <td>{data?.ministries}</td>
                      <td>{data?.entities_id}</td>

                      <td className="d-flex justify-content-center align-items-center gap-4">
                        <AllowDelate
                          delete_id={data?.entities_id}
                          path_delete={"deleteEntitiesById"}
                          setRefresh2={props?.setRefresh2}
                          setOpen={setOpen}
                        />
                        <ModelEdit
                          edit_id={data?.entities_id}
                          edit_data={data?.Entities_name}
                          edit_path="editEntities"
                          setOpen={setOpen}
                          dataMinistries={props?.DataShowInformationMinist}
                          ministries_id={data?.ministries_id}
                          label="Entities"
                          setRefresh2={props?.setRefresh2}
                        />
                      </td>
                    </tr>
                  ))
                : props?.DataShowInformationMinist?.map((data, index) => (
                    <tr key={data?.id}>
                      <td>{index + 1}</td>
                      <td>{data?.ministries}</td>
                      <td className="d-flex justify-content-center align-items-center gap-4">
                        <AllowDelate
                          delete_id={data?.id}
                          path_delete={"deleteMinistersById"}
                          setRefresh={props?.setRefresh}
                        />
                        <ModelEdit
                          edit_id={data?.id}
                          edit_data={data?.ministries}
                          edit_path="EditMinistries"
                          setOpen={setOpen}
                          setRefresh={props?.setRefresh}
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

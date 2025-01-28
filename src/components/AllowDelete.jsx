import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BackendUrl } from "../redux/api/axios";
import { ButtonClearState, ButtonSave } from "../utils/Content";
import { IconButton } from "@mui/material";
import { HelpOutlineOutlined } from "@mui/icons-material";
import { getToken } from "../utils/handelCookie";
// Style for the modal box
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// AllowEdit component
export default function AllowDelete(props) {
  const [open, setOpen] = useState(false);
  const token=getToken()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handelDelete = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/${props?.path_delete}/${props?.delete_id}`,
        headers: {
          authorization: token,
        },
      });
      if (response) {
        toast.success(response?.data?.message);
        setOpen(false);
        props?.setOpen(false);
        props?.setRefresh((prev) => !prev);
        props?.setRefresh3((prev) => !prev);

      }
    } catch (error) {
      toast?.error(error?.response?.data?.message);
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      <ButtonClearState onClick={handleOpen}>حذف</ButtonClearState>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        BackdropProps={{
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(3px)",
          }}}
      >
        <Box sx={style}>
        <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <IconButton>
              <HelpOutlineOutlined
                style={{ fontSize: "100px", marginBottom: "16px" }}
              />
            </IconButton>
            <h3>هل أنت موافق على الحذف</h3>
          </Box>
          <div className="d-flex justify-content-between align-items-center">
            <ButtonClearState onClick={handelDelete}>
              {" "}
              {t("delete")}
            </ButtonClearState>
            <ButtonSave onClick={handleClose}> {t("close")}</ButtonSave>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

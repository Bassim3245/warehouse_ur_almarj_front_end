import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { getToken } from "../../utils/handelCookie";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import DropDownGrid from "../../components/CustomMennu";
import RequestDenied from "./RequestDeined";
export default function MoreOption({ msgId, messageDe, setOpenChat }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [opentest,setOpen]=React.useState(false)
  const token = getToken();
  const DeleteMessageById = async (id) => {
    try {
      const response = await axios.delete(
        `${BackendUrl}/api/deleteMessageById/${msgId}`,
        { headers: { token: token } }
      );
      if (response) {
        toast(response?.data?.message || []);
        setOpenChat(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
<>
      <DropDownGrid Icon={GridMoreVertIcon}>
        <MenuItem onClick={DeleteMessageById}>
          <Delete /> حذف
        </MenuItem>
        <RequestDenied
          book_id={null}
          msgId={msgId}
          path={"ApproveBooked"}
          messageEdit={messageDe}
          //   setRefresh={setRefresh}
          edit={true}
          setOpen={setOpen}
        />
      </DropDownGrid>
    </>
  );
}

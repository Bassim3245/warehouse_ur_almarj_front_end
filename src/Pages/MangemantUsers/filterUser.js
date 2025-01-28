import * as React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { BottomSend } from "../../utils/Content";
import { toast } from "react-toastify";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getToken } from "../../utils/handelCookie";
export default function FilterDataUser({
  open,
  setOpen,
  page,
  limit,
  setFilterDataUser,
  setRefreshButton,
  setTotalItems,
  setTotalPages,
}) {
  const [email,setEmail ] = React.useState("");
  const [name, setName] = React.useState("");
  const {t}=useTranslation()
    const handleClose = () => {
    setOpen(false);
  };
  const handelSearch = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataUserSearch?email=${email || ""}&name=${name}&limit=${limit}&page=${page}`,
        {
          headers: {
            authorization: getToken(), // Assuming getToken is a function that retrieves the token
          },
        }
      );
      if (response && response.data) {
        setFilterDataUser(response.data.response); // Update filtered data
        setTotalPages(response?.data?.pagination?.totalPages);
        setTotalItems(response?.data?.pagination?.totalItems);
        setRefreshButton((prev) => !prev); // Toggle refresh button
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } 
    }
  };

  return (
    <>
      {open && (
        <Box
          sx={{
            mt: "10px",
          }}
          className="boxContainerReportFilter"
        >
          <IconButton onClick={handleClose} sx={{ mb: "10px" }}>
            <Close />
          </IconButton>
          <Box component="form" sx={{ margin: "10px" }} onSubmit={handelSearch}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                mb: 2,
                mt: 2,
              }}
              dir="rtl"
            >
              <TextField
                value={email}
                id="outlined-required"
                label={t("الايميل")}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label={t("أسم المستخدم")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <BottomSend sx={{ mt: "10px" }} onClick={handelSearch}>
              بحث
            </BottomSend>
          </Box>
        </Box>
      )}
    </>
  );
}

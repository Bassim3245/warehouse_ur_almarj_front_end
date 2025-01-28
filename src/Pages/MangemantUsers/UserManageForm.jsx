import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackendUrl } from "../../redux/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomeSelectField from "../../components/CustomeSelectField";
import CustomTextField from "../../components/CustomTextField";
import "../style.css";
import { getDataMinistries } from "../../redux/MinistriesState/MinistresAction";
import { getDataEntities } from "../../redux/EntitiesState/EntitiesAction";
import { BorderLinearProgress, BottomSend } from "../../utils/Content";
import { Add, ModeEditOutlined } from "@mui/icons-material";
import Header from "../../components/HeaderComponent";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { getToken } from "../../utils/handelCookie";
import Loader from "../../components/Loader";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function UserMangeForm({
  editInfo,
  DataUsers,
  setRefreshButton,
  allUser,
  Ministries,
  Entities,
  DataGovernorate,
  DataJobTitle,
  dataGroup,
}) {
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const maintheme = useSelector((state) => state?.ThemeData?.maintheme);
  const [name, setName] = useState("");
  const [ministriesId, setMinistriesId] = useState("");
  const [entitiesId, setEntitiesId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [jopTitle, setJopTitle] = useState("");
  const [roleId, setRoleId] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  useEffect(() => {
    let inputs = [
      name,
      password,
      email,
      roleId,
      ministriesId,
      entitiesId,
      phone,
      jopTitle,
    ];
    let nonEmptyCount = inputs.reduce((count, input) => {
      return count + (input ? 1 : 0);
    }, 0);
    setValue(nonEmptyCount * 11.5);
  }, [
    name,
    password,
    email,
    roleId,
    ministriesId,
    entitiesId,
    phone,
    jopTitle,
  ]);
  useEffect(() => {
    if (editInfo) {
      setName(DataUsers?.user_name);
      setEmail(DataUsers?.email);
      setPhone(DataUsers?.phone_number);
      setPassword("");
      if (Ministries?.length && DataUsers?.ministres_id) {
        let findItem = Ministries?.find(
          (item) => item?.id === DataUsers?.ministres_id
        );
        if (findItem) setMinistriesId(findItem);
      }
      if (Entities && DataUsers?.entities_id) {
        let findItem = Entities?.find(
          (item) => item?.entities_id === DataUsers?.entities_id
        );
        if (findItem) setEntitiesId(findItem);
      }
      if (dataGroup?.length && DataUsers?.group_id) {
        let findItem = dataGroup?.find(
          (item) => item?.id === DataUsers?.group_id
        );
        if (findItem) setRoleId(findItem);
      }
      if (DataJobTitle?.length && DataUsers?.job_id) {
        let findItem = DataJobTitle?.find(
          (item) => item?.id === DataUsers?.job_id
        );
        if (findItem) setJopTitle(findItem);
      }
    }
  }, [
    open,
    DataGovernorate,
    DataJobTitle,
    DataUsers?.email,
    DataUsers?.entities_id,
    DataUsers,
    Entities,
    dataGroup,
    editInfo,
    Ministries,
  ]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("entities_id", entitiesId?.entities_id || "");
      formData.append("ministries_id", ministriesId?.id || "");
      formData.append("name", name);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("jopTitle", jopTitle);
      formData.append("roleId", roleId?.id);
      const response = await axios.post(
        `${BackendUrl}/api/registerUser`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      if (response) {
        toast(response?.data?.message);
        setName("");
        setPassword("");
        setEmail("");
        setEntitiesId("");
        setMinistriesId("");
        setPhone("");
        setRoleId("");
        setOpen(false);
        setRefreshButton((prev) => !prev);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleEdit = async (e) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("roleId", roleId?.id);
      formData.append("entities_id", entitiesId?.entities_id || "");
      formData.append("ministries_id", ministriesId?.id || "");
      formData.append("name", name);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("dataId", DataUsers?.user_id);
      const response = await axios.post(
        `${BackendUrl}/api/userManagementEdit`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      if (response) {
        setRefreshButton((prev) => !prev);
        toast(response?.data?.message);
        setOpen(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // @ts-ignore
    dispatch(getDataMinistries());
    dispatch(getDataEntities());
  }, [dispatch]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const dataFilter = Entities?.filter((item) => {
      return item?.ministries_id === ministriesId?.id;
    });
    setFilterData(dataFilter);
  }, [Entities, ministriesId]);
  const { t } = useTranslation("");
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {editInfo ? (
        <MenuItem onClick={handleClickOpen} disableRipple>
          <ModeEditOutlined sx={{ color: "", fontSize: "20px" }} />
          <span className="ms-2">{t("edit")}</span>
        </MenuItem>
      ) : allUser ? (
        <BottomSend onClick={handleClickOpen} disableRipple>
          <Add /> {t("userManager.Authorized personnel information management")}
        </BottomSend>
      ) : (
        <BottomSend onClick={handleClickOpen} disableRipple>
          <Add /> {t("userManager.insert new user")}
        </BottomSend>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
        sx={{ padding: "0px" }}
      >
        <DialogContent>
          <AppBar
            sx={{ position: "absolute", background: maintheme?.iconColor }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <GridCloseIcon />
              </IconButton>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant="h6"
                component="div"
              ></Typography>
              {editInfo ? (
                <Button autoFocus color="inherit" onClick={handleEdit}>
                  {t("saveChange")}
                </Button>
              ) : (
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                  {t("save")}
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <div className="Project" style={{ marginTop: "50px" }}>
            <Box>
              <div className=" form-outline mb-3 me-2 w-100 " dir={rtl?.dir}>
                <Box
                  className="container"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    className="boxContainerReportForm  p-4 mt-4 "
                    sx={{ width: "100%", maxWidth: "100%" }}
                  >
                    <div className="d-flex justify-content-between">
                      <Header
                        title={
                          editInfo
                            ? t("userManager.User information Edit")
                            : t("userManager.User information form")
                        }
                        dir={rtl?.dir}
                      />
                    </div>
                    <BorderLinearProgress variant="determinate" value={value} />
                    <Box sx={{ minWidth: 35 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >{`${Math.round(value)}%`}</Typography>
                    </Box>
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                      <Box
                        className="mobilDisplay"
                        sx={{
                          mb: "20px",
                          mt: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "15px",
                          width: "100%",
                          maxWidth: "100%",
                        }}
                      >
                        <Box sx={{ width: "100%" }}>
                          <Box sx={{ mb: "15px" }}>
                            <CustomTextField
                              label={t("userManager.user name")}
                              haswidth={true}
                              value={name}
                              // error={error}
                              hasMultipleLine={true}
                              paddingHorizontal={"0px"}
                              // message={props?.objectData?.name?.message}
                              readOnly={false}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              onClearClick={() => {
                                setName("");
                              }}
                            />
                          </Box>
                          <>
                            <Box sx={{ mb: "15px" }}>
                              <CustomTextField
                                label={t("userManager.email")}
                                haswidth={true}
                                value={email}
                                // error={error}
                                hasMultipleLine={true}
                                paddingHorizontal={"0px"}
                                // message={props?.objectData?.name?.message}
                                readOnly={false}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                onClearClick={() => {
                                  setEmail("");
                                }}
                              />
                            </Box>
                            <Box sx={{ mb: "15px" }}>
                              <CustomTextField
                                label={t("userManager.password")}
                                haswidth={true}
                                value={password}
                                // error={error}
                                hasMultipleLine={true}
                                paddingHorizontal={"0px"}
                                // message={props?.objectData?.name?.message}
                                readOnly={false}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                                onClearClick={() => {
                                  setPassword("");
                                }}
                              />
                            </Box>
                          </>
                          <Box sx={{}}>
                            <CustomTextField
                              label={t("userManager.phon number")}
                              haswidth={true}
                              value={phone}
                              // error={error}
                              hasMultipleLine={true}
                              paddingHorizontal={"0px"}
                              // message={props?.objectData?.name?.message}
                              readOnly={false}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                              onClearClick={() => {
                                setPhone("");
                              }}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                          <Box sx={{ mb: "15px" }}>
                            <CustomeSelectField
                              label={t("userManager.Ministry name")}
                              haswidth={true}
                              value={ministriesId}
                              customWidth="100%"
                              hasMultipleLine={true}
                              customPadding={"0px"}
                              list={Ministries ? Ministries : []}
                              customGetOptionLabel={(option) =>
                                option?.ministries || ""
                              }
                              multiple={false}
                              required
                              readOnly={false}
                              onChange={(e, newValue) => {
                                setMinistriesId(newValue);
                              }}
                              onClearClick={() => {
                                setMinistriesId("");
                              }}
                              // isOptionEqualToValue={(option, value) => option._id === value._id}
                            />
                          </Box>
                          <Box sx={{ mb: "15px" }}>
                            <CustomeSelectField
                              label={t("userManager.Entity name")}
                              haswidth={true}
                              value={entitiesId}
                              customWidth="100%"
                              hasMultipleLine={true}
                              customPadding={"0px"}
                              list={filterData ? filterData : []}
                              customGetOptionLabel={(option) =>
                                option?.Entities_name || ""
                              }
                              multiple={false}
                              required
                              readOnly={false}
                              onChange={(e, newValue) => {
                                setEntitiesId(newValue);
                              }}
                              onClearClick={() => {
                                setEntitiesId("");
                              }}
                            />
                          </Box>
                          <Box sx={{ mb: "15px" }}>
                            <CustomeSelectField
                              label={t("userManager.Choosing user role")}
                              haswidth={true}
                              value={roleId}
                              customWidth="100%"
                              hasMultipleLine={true}
                              customPadding={"0px"}
                              list={dataGroup ? dataGroup : []}
                              customGetOptionLabel={(option) =>
                                option?.group_name || ""
                              }
                              multiple={false}
                              required
                              readOnly={false}
                              onChange={(e, newValue) => {
                                setRoleId(newValue);
                              }}
                              onClearClick={() => {
                                setRoleId("");
                              }}
                            />
                          </Box>
                          <Box>
                            <CustomTextField
                              label={t("العنوان الوظيفي")}
                              haswidth={true}
                              value={jopTitle}
                              // error={error}
                              hasMultipleLine={true}
                              paddingHorizontal={"0px"}
                              // message={props?.objectData?.name?.message}
                              readOnly={false}
                              onChange={(e) => {
                                setJopTitle(e.target.value);
                              }}
                              onClearClick={() => {
                                setJopTitle("");
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      {editInfo ? (
                        <BottomSend
                          sx={{ width: "99%" }}
                          onClick={handleEdit}
                          disabled={isLoading}
                        >
                          {t("saveChange")}
                        </BottomSend>
                      ) : (
                        <BottomSend
                          sx={{ width: "99%" }}
                          onClick={handleSubmit}
                          disabled={isLoading}
                        >
                          {t("save")}
                        </BottomSend>
                      )}
                    </form>
                  </Box>
                </Box>
              </div>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default UserMangeForm;

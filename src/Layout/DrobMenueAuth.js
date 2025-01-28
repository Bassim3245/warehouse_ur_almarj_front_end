import { IconButton, Menu, MenuItem } from "@mui/material";
import  { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { InfoOutlined, Logout } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { setLanguage } from "../redux/LanguageState";
import { logoutUser } from "../redux/userSlice/authActions";
function DrobMenueAuth({ navigate, dispatch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t, i18n } = useTranslation();
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state.language;
  });
  const [info ,setInfo]=useState(JSON.parse(localStorage.getItem("user")))
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleProfile = () => {
    navigate("Profile");
  };

  const handleDirectionArabic = () => {
    const language = "ar";
    i18n.changeLanguage("ar");
    localStorage.setItem("language", "ar");
    dispatch(setLanguage(language));
  };
  const handleDirectionEnglish = () => {
    const language = "en";
    i18n.changeLanguage("en");
    dispatch(setLanguage(language));
    localStorage.setItem("language", "en");
  };

  return (
    <>
      <IconButton
        // color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsOutlinedIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/help-platform");
          }}
        >
          <InfoOutlined style={{ marginRight: "10px" }} />
          {t("layout.User Manual")}
        </MenuItem>
        <MenuItem onClick={HandleProfile}>
          <Person2OutlinedIcon fontSize="small" sx={{ marginRight: "10px" }} />
          {t("appBar.dropdown.profile")}
        </MenuItem>
        {/* start icon language */}
        {rtl.flexDirection === "row" ? (
          <MenuItem onClick={handleDirectionArabic}>
            <FontAwesomeIcon
              icon={faLanguage}
              style={{ marginRight: "10px" }}
            />
            {t("appBar.dropdown.languageArabic")}
          </MenuItem>
        ) : (
          <MenuItem onClick={handleDirectionEnglish}>
            <FontAwesomeIcon
              icon={faLanguage}
              style={{ marginRight: "10px" }}
            />
            {t("appBar.dropdown.languageEnglish")}
          </MenuItem>
        )}
        {/* end Icon language */}
        <MenuItem
          onClick={() => {
            const userId=info?.user_id
            dispatch(logoutUser(userId));
          }}
        >
          <Logout fontSize="small" sx={{ marginRight: "10px" }} />
          {t("appBar.dropdown.logout")}
        </MenuItem>
      </Menu>
    </>
  );
}

export default DrobMenueAuth;

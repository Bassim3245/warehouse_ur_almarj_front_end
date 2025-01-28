import { Home, Info, InfoOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import  { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidCategory } from "react-icons/bi";
import MenuIcon from "@mui/icons-material/Menu";

function DropDownMenu({ navigate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [
    { label: t("HomePage"), path: "/", iconName: <Home /> },
    {
      label: t("Products and Materials"),
      path: "/All-Category",
      iconName: <BiSolidCategory style={{ fontSize: "20px" }} />,
    },
    { label: t("About"), path: "about-page", iconName: <InfoOutlined /> },
    { label: t("layout.User Manual"), path: "help-platform", iconName: <Info /> },
  ];
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
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
        {menuItems.map(
          (page, index) =>
            page.label &&
            page.path && (
              <MenuItem
                key={index}
                onClick={() => {
                  navigate(page.path);
                  handleClose(); // Close the menu after navigating
                }}
              >
                {page.iconName}
                <span style={{ marginRight: "10px", marginLeft: "10px" }}>
                  {page.label}
                </span>
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
}
export default DropDownMenu;

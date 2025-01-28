import React from "react";
import IconButton from "@mui/material/IconButton";
import { styled, alpha } from "@mui/material/styles";
import { Menu, Box } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { GridMoreVertIcon } from "@mui/x-data-grid";
export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme, GridTheme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: GridTheme?.paperColor,
    color: GridTheme?.disabledGlobalText
      ? GridTheme?.gloablTextColor
      : GridTheme?.paperTextColor,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    "& .itmlist:hover": {
      backgroundColor: GridTheme?.paperTextColor + "55",
    },
  },
}));
export default function DropDownGrid(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={open ? handleClose : handleClick} // Toggle open/close on button click
        >
          {props?.Icon ? (
            <GridMoreVertIcon />
          ) : (
            <SettingsOutlinedIcon fontSize="medium" sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose} // Ensure menu closes when clicked outside or on Escape key
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {props?.children}
      </StyledMenu>
    </React.Fragment>
  );
}

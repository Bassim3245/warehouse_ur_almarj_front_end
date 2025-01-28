import { List, ListItem, ListItemButton, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

function LisItem({ rtl, navigate }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const listItemButtonStyles = {
    minHeight: 48,
    justifyContent: "center",
    color: theme.palette.mode === "dark" ? "white" : "black",
    borderRadius: "6px",
  };
  const menuItems = [
    { label: t("HomePage"), path: "/" },
    { label: t("Products and Materials"), path: "/All-Category" },
    { label: t("About"), path: "/about-page" },
    { label: t("layout.User Manual"), path: "/help-platform" },
  ];
  return (
    <List dir={rtl.dir} sx={{ display: "flex", gap: "6px" }}>
      {menuItems?.map(({ label, path }, index) => (
        <ListItem key={index} disablePadding sx={{ width: "auto" }}>
          <ListItemButton onClick={() => navigate(path)} sx={listItemButtonStyles}>
            {label}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default LisItem;

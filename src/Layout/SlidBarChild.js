import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";

const SlidBarChild = ({
    data,
    navigate,
    setOpenPage,
    open,
    rtl,
    location,
    theme,
    maintheme,
    hasPermission,
    permissionData
  }) => (
    <>
       {data?.map((item) => {
          const hasAccess = hasPermission(
            item?.checkPermission,
            permissionData
          );
          return (
            hasAccess && (
           <ListItem
           disablePadding
           key={item.path}
           sx={{ display: "block" }}
           dir={rtl?.dir}
         >
           <Tooltip title={open ? null : item?.text} placement="left">
             <ListItemButton
               onClick={() => {
                 // Navigate to the item's path
                 navigate(item?.path);
                 setOpenPage(false); // Close the menu after clicking an item
               }}
               sx={{
                 minHeight: 48,
                 justifyContent: open ? "initial" : "center",
                 px: 2.5,
                 dir: rtl?.dir,
                 marginLeft: "10px",
                 marginRight: "10px",
                 borderRadius: "5px",
                 bgcolor:
                   location.pathname === `/${item.path}` ||
                   location.pathname === item.path
                     ? theme.palette.mode === "dark"
                       ? grey[800] // Active state for dark mode
                       : grey[300] // Active state for light mode
                     : null,
                 "&:hover": {
                   bgcolor:
                     location.pathname === `${item.path}` ||
                     location.pathname === item.path
                       ? theme.palette.mode === "dark"
                         ? grey[700] // Hover state when active in dark mode
                         : grey[400] // Hover state when active in light mode
                       : theme.palette.action.hover, // Default hover state
                 },
                 "&.Mui-selected": {
                   bgcolor:
                     theme.palette.mode === "dark"
                       ? grey[800] // Active state for dark mode
                       : grey[300], // Active state for light mode
                   "&:hover": {
                     bgcolor:
                       theme.palette.mode === "dark"
                         ? grey[700] // Hover state when active in dark mode
                         : grey[400], // Hover state when active in light mode
                   },
                 },
               }}
             >
               <ListItemIcon
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : "auto",
                   justifyContent: "center",
                   fontSize: "20px",
                   color:
                     theme.palette.mode === "dark"
                       ? ""
                       : maintheme?.mainColor,
                 }}
               >
                 {item.icon}
               </ListItemIcon>
               <ListItemText
                 primary={item.text}
                 sx={{
                   opacity: open ? 1 : 0,
                   textAlign: rtl.dir === "rtl" ? "start" : "",
                   marginRight: rtl.dir === "rtl" ? "10px" : "",
                 }}
               />
             </ListItemButton>
           </Tooltip>
         </ListItem>
      ));
    })}
    </>
  );
  export default SlidBarChild
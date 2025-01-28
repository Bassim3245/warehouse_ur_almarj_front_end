import { Box, Typography, useTheme } from "@mui/material";
const Header = ({ title, subTitle, isDashboard = false, dir, typeHeader }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: "10px", mb: "8px" }} dir={dir}>
      <Typography
        sx={{
          color: theme.palette.info.light,
          fontWeight: "bold",
        }}
        variant={typeHeader ? typeHeader : "h5"}
      >
        {title}
      </Typography>
      <Typography variant="body1">{subTitle}</Typography>
    </Box>
  );
};
export default Header;

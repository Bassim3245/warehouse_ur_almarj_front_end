import { Box, Typography, useTheme } from "@mui/material";
const HeaderCenter = ({ title, isDashboard = false, dir ,typeHeader}) => {
  const theme=useTheme()
  return (
    <Box mb={isDashboard ? 2 : 4} dir={dir} sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          color: theme.palette.info.light,
          fontWeight: "bold",
          mt:"3px"
        }}
        variant={typeHeader?typeHeader:"h3"}
      >
        {title}
      </Typography>
    </Box>
  );
};
export default HeaderCenter;

import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function RefreshButtonData({ setRefreshButton }) {
  const handleRefresh = () => {
    setRefreshButton((prev) => !prev);
  };

  return (
    <IconButton
      color="primary"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        '&:hover': {
          backgroundColor: "primary.dark",
        },
        borderRadius: "8px", // Optional: Customize button shape
            // Optional: Adjust button size
      }}
      onClick={handleRefresh}
    >
      <Refresh />
    </IconButton>
  );
}

export default RefreshButtonData;

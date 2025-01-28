import {
  Button,
  LinearProgress,
  linearProgressClasses,
  Menu,
  Paper,
} from "@mui/material";
import { blue, cyan, grey, indigo, pink, purple, red } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));
export const ColorButtonEdit = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[50]),
  backgroundColor: purple[50],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));
export const ColorLink = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));
export const MainButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[700],
  },
}));
export const ButtonClearState = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: cyan[400],
  "&:hover": {
    backgroundColor: cyan[900],
  },
}));
export const ButtonSave = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: grey[400],
  "&:hover": {
    backgroundColor: grey[900],
  },
}));
export const BottomRoot = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  "&:hover": {
    backgroundColor: grey[900],
  },
}));
export const BottomSend = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[500]),
  backgroundColor: indigo[500],
  "&:hover": {
    color: indigo[500],
    backgroundColor: "white",
  },
}));
export const BottomClose = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  "&:hover": {
    color: red[500],
    backgroundColor: "white",
  },
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
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
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
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
  },
}));
export const getRowClassName = (params) => {
  // Log the dateExpire value for debugging

  // Check if dateExpire is 2 (expired)
  if (params.row.dateExpire === 2) {
    return "highlighted-row-near-expiration"; // Class for rows that are near expiration
  }
  // Check if dateExpire is 1 (near expiration)
  if (params.row.minimum_stock_level >= params.row.quantity_incoming) {
    console.log("Date Expiration:", params.row.minimum_stock_level);
    console.log("Date Expiration:", params.row.quantity_incoming);
    return "highlighted-row-expired"; // Class for rows that are expired or near expiration
  }
  // Alternate class for even indexed rows
  if (params.row.index % 2 === 0) {
    return "highlighted-row-even"; // Class for even indexed rows
  }
  // Return an empty string if no class is applied
  return "";
};
// progress line in form 
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
export const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

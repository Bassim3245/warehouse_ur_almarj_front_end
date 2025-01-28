import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "../redux/userSlice/authActions";
import { useNavigate } from "react-router-dom";
import { Autorenew } from "@mui/icons-material";
function RefreshButtonTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RefreshButtonTemplateFunction = () => {
    dispatch(refreshAccessToken());
    navigate("/");
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Box
        component="section"
        sx={{
          p: 2,
          // border: "3px dashed grey",
          textAlign: "center", // Optional, centers text within the box
          width: "50%",
          height: "50%",
          maxWidth: "100%",
        }}
      >
        <div className="backAfterBef">
        <button className="button" onClick={RefreshButtonTemplateFunction}>
          <div className="bloom-container">
            <div className="button-container-main">
              <div className="button-inner">
                <div className="back"></div>
                <div className="front">
                  {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path
              d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
            ></path>
          </svg> */}
                  <Autorenew />
                </div>
              </div>
              <div className="button-glass">
                <div className="back"></div>
                <div className="front"></div>
              </div>
            </div>
            <div className="bloom bloom1"></div>
            <div className="bloom bloom2"></div>
          </div>
        </button>
        </div>
      </Box>
    </div>
  );
}

export default RefreshButtonTemplate;

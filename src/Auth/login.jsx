import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BottomSend } from "../utils/Content.jsx";
import { loginUser } from "../redux/userSlice/authActions.js";
import { clearState } from "../redux/userSlice/userSlice.js";
import "./style/PageLogo.css";
// import logo from "../assets/image/images.jpeg";
// import logo from "../assets/image/1671635909.png";
import logo from "../assets/image/image.png";
function Login() {
  const Navigateto = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, Role, code, loading } = useSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        Navigateto("/");
      }, 500);
    }
    if (isError) {
      toast.error(isError);
      dispatch(clearState());
    }
  }, [isSuccess, isError, message, code, Role, Navigateto, dispatch]);
  return (
    <section className="loginSection vh-100">
      <div className="container">
        <div className="login-card">
          <div className="logo-section">
            <img src={logo} alt="Logo" className="main-logo" />
            <h2 className="system-name">نظام المخازن</h2>
          </div>
          <div className="login-form-section">
            <div className="welcome-text">
              <h1>أهلاً بك في نظام المخازن </h1>
              <p>منتجات أور</p>
            </div>
            <form onSubmit={handleSubmit}>
              <Typography dir="rtl" sx={{ paddingBottom: "10px" }} variant="h5">
                تسجيل الدخول
              </Typography>
              <InputLabel htmlFor="email-input" dir="rtl" className="MuiInputLabel-root1">
                أيميل
              </InputLabel>
              <FormControl
                sx={{ m: 1, width: "100%" }}
                variant="outlined"
                dir="rtl"
              >
                <OutlinedInput
                  id="email-input"
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>
              <InputLabel htmlFor="password-input" dir="rtl">
                كلمة المرور
              </InputLabel>
              <FormControl
                sx={{ m: 1, width: "100%" }}
                variant="outlined"
                dir="rtl"
              >
                <OutlinedInput
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end" sx={{ direction: "rtl" }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <div className="mt-4">
                <BottomSend
                  type="submit"
                  style={{
                    maxWidth: "100%",
                    margin: "auto",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  تسجيل الدخول
                </BottomSend>
              </div>
            </form>
          </div>

          <div className="background-pattern">
            <svg
              viewBox="0 0 960 540"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMax slice"
            >
              <g fill="none" stroke="currentColor" strokeWidth="100">
                <circle r="234" cx="196" cy="23"></circle>
                <circle r="234" cx="790" cy="491"></circle>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Login;

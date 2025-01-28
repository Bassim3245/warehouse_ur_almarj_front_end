
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BottomSend, ColorButton } from "../Config/Content.jsx";
import "./style/PageLogo.css";
import { loginUser } from "../redux/userSlice/authActions.js";
import { clearState } from "../redux/userSlice/userSlice.js";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function Login() {
  const Navigateto = useNavigate();
  const { isSuccess, isError, message, Role, code, loading } = useSelector(
    // @ts-ignore
    (state) => state.user
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    console.log("ddd", formData.password);
    e.preventDefault();
    // @ts-ignore
    dispatch(loginUser(formData));
    // localStorage.setItem("token", "1234");
    // Navigateto("/Home");
  };
  useEffect(() => {
    console.log(Role);
    if (isSuccess) {
      setTimeout(() => {
        if (Role === "User") {
          Navigateto("/ProductsDisplay");
        } else {
          Navigateto("/Home");
        }
        // Navigateto("/Home");
      }, 500);
    }
    if (isError) {
      console.log("error");
      toast.error(isError);
      dispatch(clearState());
    }
  }, [isSuccess, isError, message, code, Role, Navigateto, dispatch]);
  const [loadingtest, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  const [loadingImage, setLoadingImage] = useState(true);
  useEffect(() => {
    setLoadingImage(true);
    setTimeout(() => {
      setLoadingImage(false);
    }, 4000);
  }, []);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <section className="loginSection vh-100  ">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 welcome-section login-wrapper">
              <div className="">
                <svg
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  viewBox="0 0 960 540"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMax slice"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "#b4b4b463",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                  }}
                  fill="#0367a4"
                >
                  <g
                    className="opacity-20 MuiBox-root muiltr-1wnrr1p"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="100"
                  >
                    <circle r="234" cx="196" cy="23"></circle>

                    <circle r="234" cx="790" cy="491"></circle>
                  </g>
                </svg>
                <div style={{}}>
                  <svg
                    style={{
                      color: "#ffffffa8",
                      position: "absolute",
                      top: "-30px",
                      left: "500px",
                      right: -300,

                      // transform: "scale(0.779)",
                    }}
                    className="absolute -top-64 -left-64 opacity-20 MuiBox-root muiltr-x3mbcd"
                    viewBox="0 0 220 192"
                    fill="#b4b4b463"
                  >
                    <defs>
                      <pattern
                        id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                        x="0"
                        y="0"
                        width="8"
                        height="8"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="4"
                          fill="currentColor"
                        ></rect>
                      </pattern>
                    </defs>
                    <rect
                      width="100"
                      height="75"
                      fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                    ></rect>
                  </svg>
                </div>
              </div>
              <Box sx={{ margin: "20px", height: "100px" }}></Box>
              {/* <img src="/image/dots.png" alt="" className="ImgeLogo" /> */}
              <div className="welcome-content">
                <Typography
                  variant="h1"
                  style={{
                    textAlign: "start",
                    color: "white",
                    fontWeight: "bold",
                    // marginRight:"50px"
                  }}
                  className="h1Login"
                >
                  أهلاً بك في
                  <br /> نظام البنك الوطني للمواد الراكدة وبطيئة الحركة
                </Typography>
                <div className="right-section logoCompany">
                  <div className="logo-circle">
                    <div className="">
                      <div className="circle yellow mb-2"></div>
                      <div className="circle light-purple"></div>
                    </div>
                    <div className="">
                      <div className="circle purple mb-2"></div>
                      <div className="circle light-yellow"></div>
                    </div>
                  </div>
                </div>
                <p>الشركة العامة للأنضمة الاكترونية</p>
              </div>
            </div>
            <div className=" col-lg-6 col-xl-5 order-2 order-lg-1 d-flex justify-content-center align-items-center mb-3">
              <div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <div className="right-section pt-3">
                    <div className="logo-circle">
                      <div className="">
                        <div className="circle yellow mb-2 "></div>
                        <div className="circle light-purple"></div>
                      </div>
                      <div className="">
                        <div className="circle purple mb-2"></div>
                        <div className="circle light-yellow"></div>
                      </div>
                    </div>
                  </div>
                  <Typography sx={{ textAlign: "center", mb: "10px" }}>
                    البنك <span style={{ color: "orange" }}>الوطني</span> <br />{" "}
                    للمواد الراكدة وبطيئة الحركة
                  </Typography>
                </Box>
                {/* <h2
                  className="fw-bold mb-2 mx-1 mx-md-4 me-3 mt-3 text-danger"
                  style={{ direction: "rtl" }}
                >
                  <span className="text-primary">نظام </span> المواد الراكدة
                </h2> */}
                <form
                  className="mx-1 mx-md-4"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <Typography
                    className=" me-3"
                    dir="rtl"
                    sx={{ ma: "10px", mb: "10" }}
                    variant="h5"
                  >
                    تسجيل الدخول
                  </Typography>
                  <FormControl
                    sx={{ mb: "10px", width: "100%" }}
                    variant="outlined"
                    dir="rtl"
                    name="email"
                  >
                    <InputLabel htmlFor="outlined-adornment-email" dir="rtl">
                      أيميل
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      type="text"
                      label="أيميل"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl
                    sx={{ mb: "5px", width: "100%" }}
                    variant="outlined"
                    dir="rtl"
                  >
                    <InputLabel htmlFor="outlined-adornment-password" dir="rtl">
                      كلمة المرور
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          sx={{ direction: "ltr" }}
                        >
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
                      label="كلمة المرور"
                    />
                  </FormControl>

                  <div className="mt-4">
                    <BottomSend
                      type="submit"
                      style={{
                        maxWidth: "100%",
                        margin: "auto",
                        width: "100%",
                        marginLeft: "0px",
                        // height: "auto",
                      }}
                      onClick={(e) => handleSubmit(e)}
                    >
                      login
                    </BottomSend>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default Login;

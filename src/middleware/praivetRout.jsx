import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice/authActions";
import { getRefreshToken } from "../utils/handelCookie";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  // const [info ,setInfo]=useState(JSON.parse(localStorage.getItem("user")))
  // useEffect(() => {
  //   const monitorRefreshToken = () => {
  //     const interval = setInterval(() => {
  //       const refreshToken = getRefreshToken();
  //       if (!refreshToken) {
  //         clearInterval(interval); // Stop monitoring once token is gone
  //         const userId=info?.user_id
  //         dispatch(logoutUser(userId));
  //       }
  //     }, 1000); // Check every second
  //     // Cleanup on component unmount
  //     return () => clearInterval(interval);
  //   };

  //   monitorRefreshToken();
  // }, [dispatch]);

  const token = Cookies.get("refreshToken"); // Check initial state
  if (!token) {
    return <Navigate to="/Login" />; // Redirect to login if no valid token exists
  }
  return <Outlet />;
};

export default PrivateRoutes;

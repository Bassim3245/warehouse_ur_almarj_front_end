import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Preloading from "./Preload/Preloading";
import { useDispatch, useSelector } from "react-redux";
import RedirectPages from "./RedirectPages/RedirectPages";
import axios from "axios";
import { setRolesRedux } from "../../redux/RoleSlice/RoleSlice";
import rolesApi from "../Network/Role";
import { setGlobalLoading } from "../reduxStore/SettingsReducer";
import Pusher from "pusher-js";
// import PathListRoutes from './PathListRoutes'
Pusher.logToConsole = true;
const cookies = new Cookies();
const PathListRoutes = [
  {
    index: 1,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "MangeUser",
  },
  {
    index: 2,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "GeneralDataInformation",
  },

  {
    index: 3,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "ProjectList",
  },

  {
    index: 4,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "/Dashboard",
  },
  {
    index: 5,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "ProjectList",
  },
  {
    index: 6,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "ProductList",
  },
  {
    index: 7,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "Event",
  },

  {
    index: 8,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "AnalyticsData",
  },
  {
    index: 9,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "BusinessPersonsMain",
  },
  {
    index: 10,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "PerformsnceAnalytcsMain",
  },
  {
    index:11,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "ProjectList",
  },
  {
    index: 12,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "ProductList",
  },
  {
    index: 13,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "Event",
  },

  {
    index: 14,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "AnalyticsData",
  },
  {
    index:15,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "BusinessPersonsMain",
  },
  {
    index:16,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "PerformsnceAnalytcsMain",
  },

  {
    index: 17,
    Check:  (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "HR",
  },
  {
    index:18,
    Check: (setRolesRedux)=>{setRolesRedux.Add_General_Data.value},
    path: "FilesReceived",
  },
];

export default function ProtectionAdmin(props) {
  const [t] = useTranslation("common");
  const token = cookies.get("token");
  const access_type = cookies.get("access_type");
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState([]);
  const [hasAccessToThisRoute, setHasAccessToThisRoute] = useState(false);
  const mainpath = useSelector((state) => state.settingsData.mainpath);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const rolesRedux = useSelector((state) => state.rolesData.roles);
  const userData = useSelector((state) => state.userData.data);
  const tokenData = useSelector((state) => state.userData.token);
  const [firstLoading, setFirstLoading] = useState(true);
  // console.log('rolesRedux==>', rolesRedux)
  let location = useLocation();
  const pathsList = PathListRoutes;

  const getRoles = async () => {
    if (!firstLoading) return;
    let data = null;
    try {
      setRoleLoading(true);
      setLoading(true);
      data = await rolesApi.userRoles();
      setFirstLoading(false);
      if (data && data?.status) {
        console.log("datadadasdsadas==>", data?.data);
        let arr = [];
        if (data?.data && data?.data?.length)
          arr = data?.data?.map((item) => item?.id);

        setUserRoles(arr);
        setRoleLoading(false);
        setLoading(false);
      } else {
        setRoleLoading(false);
        setLoading(false);
      }
    } catch (err) {
      setFirstLoading(false);
      dispatch(setGlobalLoading(false));
      setRoleLoading(false);
      setLoading(false);
      console.log(err?.message);
    }
  };
  useEffect(() => {
    console.log("protected admin called===>", firstLoading);
    getRoles();
  }, []);
  // useEffect(() => {
  //   if(tokenData)
  //   loadNotificationsData()
  // }, [tokenData]);
  const dispatch = useDispatch();
  const hadleCheckIdExists = (roles) => {
    const updatedRoles = Object.entries(rolesRedux).reduce(
      (acc, [key, value]) => {
        if (roles?.includes(value?.id)) {
          acc[key] = { ...value, value: true };
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    dispatch(setRolesRedux(updatedRoles));
    console.log("sadasdasdasdasd", updatedRoles);
  };
  useEffect(() => {
    let abortController = new AbortController();
    if (userRoles) {
      hadleCheckIdExists(userRoles);
    }
    return () => {
      abortController.abort();
    };
  }, [userRoles]);

  useEffect(() => {
    let abortController = new AbortController();
    if (rolesRedux) {
      routeChange();
      // window.pusher = null;
      // subscribeToNotifications()
    }
    return () => {
      abortController.abort();
    };
  }, [rolesRedux]);

  useEffect(() => {
    let abortController = new AbortController();
    console.log("sdfsdfsdfsdfsdf=>", location?.pathname);
    routeChange();
    return () => {
      abortController.abort();
    };
  }, [location?.pathname]);
  const routeChange = async () => {
    setLoading(true);
    if (userRoles && userRoles?.length > 0) {
      let check = false;
      let codeError = null;
      pathsList &&
        pathsList?.length > 0 &&
        pathsList?.map((itm) => {
          if (!check) {
            if (location?.pathname == `${mainpath}/${itm?.to}`) {
              let checkIsInRole = false;
              if (itm?.roles(rolesRedux) == true) {
                checkIsInRole = true;
              }
              if (checkIsInRole) {
                check = true;
              } else {
                check = false;
                codeError = 501;
              }
            } else {
              check = false;
              if (!codeError) codeError = 404;
            }
            // }
          }
        });
      if (check) {
        setHasAccessToThisRoute(true);
        console.log("enter success");
        setLoading(false);
      } else {
        setHasAccessToThisRoute(false);
        setLoading(false);
        setCode(codeError);
      }
    } else if (!loading && !userRoles) {
      setCode(503);
      setHasAccessToThisRoute(false);
      setLoading(false);
    }
    setLoading(false);
  };
  var timer;
  // useEffect(() => {
  //   subscribeToNotifications();
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);
  // const subscribeToNotifications = () => {
  //   if (!window?.pusher) {
  //     var pusher = null;
  //     window.pusher = pusher = new Pusher("d95c44395f081fd6bb8f", {
  //       cluster: "ap1",
  //     });
  //     subscribeToChangeOrderStatusNotifications(pusher)
  //   }
  // };
  // const subscribeToChangeOrderStatusNotifications = (pusher) => {
  //   console.log('asdasdasdasasdas=========>entered')
  //   const current_user_id = cookies.get("user_id");
  //   const channelName = `new-order`;
  //   const eventName = 'new-order-event'
  //   const newOrderData = pusher.subscribe(channelName);
  //   console.log('asdasdasdasasdas=========>1')
  //   newOrderData.bind(eventName, (notification) => {
  //     console.log('asdasdasdasasdas=========>', notification)
  //     if (
  //       (userData && userData?.group?.id == 1) && rolesRedux?.show_notification?.value
  //     ) {
  //       var data = notification?.notification
  //       console.log('asdasdasdasasdas=========>2', data)

  //       const title = data?.body;
  //       if ("Notification" in window) {
  //         console.log('asdasdasdasasdas=========>Notification API is supported')

  //         // Notification API is supported
  //         if (Notification.permission === "granted") {
  //           console.log('asdasdasdasasdas=========>3')
  //           const notification = new Notification(data?.title, {
  //             body: title,
  //             icon: require("../assets/img/logo.png").default,
  //             data: { url: window.location.origin + mainpath + `/notifications?id=${data?.id}` },
  //           });
  //           console.log('asdasdasdasasdas=========>4')
  //           notification.onclick = function (event) {
  //             event.preventDefault();
  //             window.focus();
  //             const url = event.target.data.url;
  //             window.open(url, "_blank");
  //           };
  //         } else {
  //           console.log('asdasdasdasasdas=========>5')
  //           Notification.requestPermission().then(function (permission) {
  //             console.log('asdasdasdasasdas=========>6')
  //             if (permission === "granted") {
  //               console.log('asdasdasdasasdas=========>7')
  //               // User has granted permission
  //               const notification = new Notification(data?.title, {
  //                 body: title,
  //                 icon: require("../assets/img/logo.png").default,
  //                 data: { url: window.location.origin + mainpath + `/notifications?id=${data?.id}` },
  //               });
  //               console.log('asdasdasdasasdas=========>8')
  //               notification.onclick = function (event) {
  //                 event.preventDefault();
  //                 window.focus();
  //                 const url = event.target.data.url;
  //                 window.open(url, "_blank");
  //               };
  //             }
  //           });
  //         }
  //       }
  //       let titleText = title && title?.length > 45 ? (title?.slice(0, 45) + '...') : title
  //       toast.info(titleText, {
  //         position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         toastId: data?.id,
  //       });
  //       loadNotificationsData();
  //     }
  //   });
  // };
  // const loadNotificationsData = async () => {
  //   try {
  //     // setLoading(true);
  //     let result = await notificationAPI.unReadedNotifications({
  //       noLoading: true,
  //       params:{
  //         get_count:1,
  //       }
  //     })
  //     // setLoading(false);
  //     if (result?.status) {
  //       dispatch(setTotalUnreadNotificationsCountRedux(result?.data?.data?.un_readed_count));
  //     } else {
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };
  if (!loading) {
    if (hasAccessToThisRoute && token) {
      return props?.children;
    } else {
      if (code === 404)
        return (
          <RedirectPages
            code={code}
            reason={"Woobs!"}
            message="The page you are looking for is not currently available"
            path={"/ticket-system/Dashboard"}
            goTo="Go Home"
          />
        );
      else if (code === 501)
        return (
          <RedirectPages
            code={code}
            reason={"Woobs!"}
            message="You don't have permission to access this page"
            path={"/ticket-system/Dashboard"}
            goTo="Go Home"
          />
        );
      else if (code === 503)
        return (
          <RedirectPages
            code={code}
            reason={"Woobs!"}
            message="There is a trouble with the server"
            path={"/ticket-system/Dashboard"}
            goTo="Reload Page"
            hasReload={true}
          />
        );
      else if (!token) {
        if (cookies.get("username")) cookies.remove("username");
        if (localStorage.getItem("userData"))
          localStorage.removeItem("userData");
        if (cookies.get("user_id")) cookies.remove("user_id");
        if (localStorage.getItem("roles")) localStorage.removeItem("roles");
        if (cookies.get("token")) cookies.remove("token");
        if (cookies.get("default_route")) cookies.remove("default_route");
        window.location.href = "/";
      }
    }
  } else {
    return <Preloading />;
  }
}

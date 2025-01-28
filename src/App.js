import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./middleware/PageNotFound";
import PrivateRoutes from "./middleware/praivetRout";
import "./style/fremwork.css";
import PersonalProfile from "./Auth/Profile/informationUser";
import { useDispatch } from "react-redux";
import React, { Suspense, useEffect } from "react";
import { setscreenwidth } from "./redux/windoScreen/settingDataSlice";
import Aos from "aos";
import HelpAboutProject from "./help/help";
import Loader from "./components/Loader";
import ReactGA from "react-ga";
import GoogleAnalyticsTracker from "./utils/GoogleAnalyticsTracker ";
import Notification from "./Pages/Notification/Notification";
import UserManagementFromEntities from "./Pages/MangemantUsers/userMangemantFromEntitis";
import RefreshButtonTemplate from "./Layout/RefreshButtonTemplate";
import DashboardWarehouse from "./Pages/warehouse_management/Dashbord";
import Inventory from "./Pages/warehouse_management/Inventory/inventory";
import Reports from "./Pages/Report/Report";
import Shipments from "./Pages/warehouse_management/shipments";
import Warehouses from "./Pages/warehouse_management/Warehouses/wherhouse";
import PrintInventory from "./Pages/warehouse_management/Inventory/PrintInventory";
import UserTable from "./Pages/warehouse_management/managemantUserWarehouse/UserTable";
import LabTabsWareHouse from "./Pages/warehouse_management/managemantUserWarehouse/managemantGenrallSetting";
import Login from "./Auth/login";
import Root from "./Layout/Root";
import LabMinitoring from "./Pages/monitoringLabrarotory/LabMinitoring";
import Home from "./Pages/Home/Home";
import StoreData from "./Pages/managemnatStoreData/storeData";
import MaterialMovement from "./Pages/warehouse_management/Inventory/materialMovment";
const MainInformation = React.lazy(() =>
  import("./Pages/manageMainInformation/MainInformation")
);
const Permission = React.lazy(() =>
  import("./Pages/manageMainInformation/ShowData/RoleAndPermission/Permission")
);
const SetPermissionToGroup = React.lazy(() =>
  import(
    "./Pages/manageMainInformation/ShowData/RoleAndPermission/SetPermisition"
  )
);
const UserManagementAllUsers = React.lazy(() =>
  import("./Pages/MangemantUsers/UsermanagemantAllUsers")
);
const SetPermissionFromEntities = React.lazy(() =>
  import("./Pages/MangemantUsers/setPermissionFromEntitis")
);
const AllLog = React.lazy(() => import("./Pages/log/AllLog"));
const LogById = React.lazy(() => import("./Pages/log/LogById"));
const Archive = React.lazy(() => import("./Pages/archive/archiveList"));
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setscreenwidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  // Initialize AOS animations
  useEffect(() => {
    Aos.init();
  }, []);
  const TRACKING_ID = "G-2H0DW1GEQW"; // Replace with your Google Analytics Tracking ID
  ReactGA.initialize(TRACKING_ID);
  return (
    <BrowserRouter>
      <GoogleAnalyticsTracker />
      {/* Add the tracker component inside BrowserRouter */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="Reports" element={<Reports />} />
              <Route
                path="DashboardWarehouse"
                element={<DashboardWarehouse />}
              />
              <Route path="Inventory" element={<Inventory />} />
              <Route path="StoreData" element={<StoreData />} />

              <Route path="Shipments" element={<Shipments />} />
              <Route path="Warehouses" element={<Warehouses />} />
              <Route path="material-movement" element={<MaterialMovement />} />

              <Route
                path="Inventory/print-Inventory"
                element={<PrintInventory />}
              />
              <Route path="add-User-To-Warehouse" element={<UserTable />} />
              <Route path="follow-up-labs" element={<LabMinitoring />} />

              <Route path="general-Setting" element={<LabTabsWareHouse />} />
              
              <Route
                path="/UserManagementAllUsers"
                element={<UserManagementAllUsers />}
              />
              <Route path="/MainInformation" element={<MainInformation />} />
              <Route path="/Permission/:id" element={<Permission />} />
              <Route
                path="/SetPermissionToGroup/:id"
                element={<SetPermissionToGroup />}
              />
              <Route path="/AllLog" element={<AllLog />} />
              <Route path="/logEntity" element={<LogById />} />
              <Route path="/profile" element={<PersonalProfile />} />
              <Route
                path="/UserManagementFromEntities"
                element={<UserManagementFromEntities />}
              />
              <Route
                path="/SetPermissionFromEntities/:id"
                element={<SetPermissionFromEntities />}
              />

              <Route path="/archive" element={<Archive />} />
              <Route path="/Notification" element={<Notification />} />
              {/* refresh token */}
              <Route path="refresh-token" element={<RefreshButtonTemplate />} />
            </Route>
            <Route path="help-platform" element={<HelpAboutProject />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

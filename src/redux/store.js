import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import languageSlice from "./LanguageState";
import RolesReducer from "./RoleSlice/RoleSlice";
import themesSlice from "./theme/themeReducer";
import MinistriesState from "./MinistriesState/MinistriesSlice";
import EntitiesState from "./EntitiesState/EntitiesSlice";
import StateMaterialState from "./StateMartrialState/StateMatrialSlices";
import settingDataSlice from "./windoScreen/settingDataSlice";
import inventorySlice from "./Inventiry/InventorySlice";
import warehouseSlice from "./wharHosueState/WareHouseSlice";
// @ts-ignore
const enhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = configureStore(
  {
    reducer: {
      user: userSlice,
      language: languageSlice,
      RolesData: RolesReducer,
      ThemeData: themesSlice,
      Ministries: MinistriesState,
      Entities: EntitiesState,
      StateMaterial: StateMaterialState,
      settingData: settingDataSlice,
      Inventory: inventorySlice,
      wareHouse: warehouseSlice,
    },
  },
  // @ts-ignore
  enhance
);
export default store;

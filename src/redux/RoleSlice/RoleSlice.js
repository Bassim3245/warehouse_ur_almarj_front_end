import { createSlice } from "@reduxjs/toolkit";
import { getRoleAndUserId } from "./rolAction";
const initialState = {
  Permission: [],
  isError: false,
  isSuccess: false,
  loading: false,
  roles: {
    management_Users: {
      value: false,
      _id: 5,
    },
    main_page: {
      value: false,
      _id: 7,
    },
    show_all_data_inventory_material: {
      value: false,
      _id: 8,
    },
    setting_information: {
      value: false,
      _id: 9,
    },
    management_permission: {
      value: false,
      _id: 10,
    },
    show_all_data_warehouse: {
      value: false,
      _id: 11,
    },
    store_general_setting: {
      value: false,
      _id: 12,
    },
    show_log: {
      value: false,
      _id: 13,
    },
    show_profile: {
      value: false,
      _id: 14,
    },
    management_user_from_entity: {
      value: false,
      _id: 15,
    },
    show_log_entity: {
      value: false,
      _id: 16,
    },
    add_general_data: {
      value: false,
      _id: 17,
    },
    show_all_data_inventory_material: {
      value: false,
      _id: 18,
    },

    general_reports: {
      value: false,
      _id: 20,
    },
    management_Nonfiction: {
      value: false,
      _id: 25,
    },
    add_factory: {
      value: false,
      _id: 31,
    },
    add_lab: {
      value: false,
      _id: 32,
    },
    add_store: {
      value: false,
      _id: 33,
    },
    show_all_data_shipment: {
      value: false,
      _id: 34,
    },
    allow_to_see_reports: {
      value: false,
      _id: 35,
    },
  },
};
export const RolesReducer = createSlice({
  name: "RolesData",
  initialState: initialState,
  reducers: {
    setRolesRedux: (state, action) => {
      state.roles = action.payload;
    },
    getRoleRedux: (state) => {
      return state.roles;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoleAndUserId.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getRoleAndUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true; // registration isSuccessful
        state.Permission = action.payload;
      })
      .addCase(getRoleAndUserId.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});
export const { setRolesRedux, getRoleRedux } = RolesReducer.actions;
export default RolesReducer.reducer;
export const userSelector = (state) => state.RolesData;

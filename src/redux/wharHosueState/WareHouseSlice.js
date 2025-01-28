import { createSlice } from "@reduxjs/toolkit";
import { getAllWarehouse } from "./WareHouseAction";
export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    loading: false,
    wareHouseData: [],
    code: false,
    isFetching: false,
    isSuccess: false,
    isSuccessMessage: false,
    isError: false,
    message: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWarehouse.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getAllWarehouse.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isSuccessMessage = true;
        state.wareHouseData = payload;
      })
      .addCase(getAllWarehouse.rejected, (state, { payload }) => {
        state.loading = false;
        state.isError = true;
        state.isSuccessMessage = false;
        state.message = payload;
      });
  },
});

export default warehouseSlice.reducer;
export const { clearState } = warehouseSlice.actions;
export const warehouseSelector = (state) => state.warehouse;

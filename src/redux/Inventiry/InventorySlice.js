import { createSlice } from "@reduxjs/toolkit";
import { getAllDataInventory, getDataUserById } from "./InventoryAction";
export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    loading: false,
    InventoryData: [],
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
      state.InventoryData=[];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDataInventory.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getAllDataInventory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isSuccessMessage = true;
        state.InventoryData = payload;
      })
      .addCase(getAllDataInventory.rejected, (state, { payload }) => {
        state.loading = false;
        state.isError = true;
        state.isSuccessMessage = false;
        state.message = payload;
      });
    builder
      .addCase(getDataUserById.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getDataUserById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isSuccessMessage = true;
        state.dataUserById = payload;
      })
      .addCase(getDataUserById.rejected, (state, { payload }) => {
        state.loading = false;
        state.isError = true;
        state.isSuccessMessage = false;
        state.message = payload;
      });
  },
});

export default inventorySlice.reducer;
export const { clearState } = inventorySlice.actions;
export const inventorySelector = (state) => state.inventory;

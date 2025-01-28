import { createSlice } from "@reduxjs/toolkit";
import { AddStateMaterial, getDataStateName } from "./stateMatrialAction";
const StateMaterialState = createSlice({
  name: "StateMaterial",
  initialState: {
    stateMaterial: [],
    isError: false,
    isSuccess: false,
    isLoading: null,
    message: "",
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddStateMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddStateMaterial.fulfilled, (state, { payload }) => {
        state.message = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(AddStateMaterial.rejected, (state, { payload }) => {
        state.isError = true;
        state.message = payload;
      });
    builder
      .addCase(getDataStateName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataStateName.fulfilled, (state, { payload:{response} }) => {
        state.stateMaterial = response;
        state.isLoading = false;
      })
      .addCase(getDataStateName.rejected, (state, { payload }) => {
        state.message = "error";
      })
  }
});
export default StateMaterialState.reducer
export const userSelector = (state) => state.stateMaterial;

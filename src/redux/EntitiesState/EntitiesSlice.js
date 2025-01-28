import { createSlice } from "@reduxjs/toolkit";
import { getDataEntities } from "./EntitiesAction";
const EntitiesState = createSlice({
  name: "Entities",
  initialState: {
    Entities: [],
    isError: false,
    isSuccess: false,
    isLoading: null,
    message: "",
    
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataEntities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataEntities.fulfilled, (state, { payload:{response} }) => {
        state.Entities = response;
        state.isLoading = false;
      })
      .addCase(getDataEntities.rejected, (state, { payload }) => {
        state.message = "error";
      })
  }
});
export default EntitiesState.reducer
export const userSelector = (state) => state.Entities;

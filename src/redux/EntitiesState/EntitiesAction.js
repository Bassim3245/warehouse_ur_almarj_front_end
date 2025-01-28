import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl, token } from "../api/axios";
export const getDataEntities = createAsyncThunk(
  "Admin/getDataEntities",
  async (token,thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataEntities`,
        headers:{
          authorization:token
        }
      });
      if (response || response?.data) {
        console.log( "hhhhh",response?.data);
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data.response.message) {
        return thunkAPI.rejectWithValue(error.response.data.response.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

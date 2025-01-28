import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl } from "../api/axios";
import { getToken } from "../../utils/handelCookie";
export const AddMinstries = createAsyncThunk(
  "Admin/AddMinstries",
  async (formData, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/MinistriesRegister`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization:getToken()
        },
        data: formData,
      });
      if (response) {
        return response?.data?.message;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
export const getDataMinistries = createAsyncThunk(
  "Admin/getDataMin",
  async (thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataMinistries`,
        headers: {
          authorization:getToken()
        },
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

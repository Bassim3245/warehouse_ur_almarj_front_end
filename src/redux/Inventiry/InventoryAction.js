import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl } from "../api/axios";
import { getToken } from "../../utils/handelCookie";
// Helper to refresh token
const getAllDataInventory = createAsyncThunk(
  "auth/getAllInventory",
  async (
    { minstry_id, entity_id, store_id },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/inventoryGetData?entity_id=${entity_id}&ministry_id=${minstry_id}&store_id=${store_id}`,
        headers: {
          authorization: getToken(),
        },
      });
      if (response?.data?.data) {
        return response?.data?.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const getDataUserById = createAsyncThunk(
  "auth/getAllUserByIdToShow",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getUserById`,
        headers: {
          authorization: token,
        },
      });
      if (response || response?.data) {
        console.log(response?.data);
        return response?.data?.response;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export { getAllDataInventory, getDataUserById };

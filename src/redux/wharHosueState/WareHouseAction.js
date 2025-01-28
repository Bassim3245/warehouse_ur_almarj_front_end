import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl } from "../api/axios";
import { getToken } from "../../utils/handelCookie";
// Helper to refresh token

const getAllWarehouse = createAsyncThunk(
  "auth/getAllWarehouse",
  async (entity_id, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getWarehouseData?entity_id=${entity_id}`,
        headers: {
          authorization: getToken(),
        },
      });
      if (response?.data?.data) {
        return response.data.data;
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
export { getAllWarehouse };

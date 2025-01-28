import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl } from "../api/axios";
import { getToken } from "../../utils/handelCookie";
const getRoleAndUserId = createAsyncThunk(
  "auth/getPermissionByUIserId",
  async ({token,userId}, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataRoleIdAndPermission/${userId}`,
        headers: {
          Accept: "application/json",
          authorization: `${getToken()}`,
        },
      });
      if (response || response?.data) {
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
export { getRoleAndUserId };

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl } from "../api/axios";
import {
  getToken,
  removeToken,
  getRefreshToken,
  setToken,
} from "../../utils/handelCookie";
// Helper to refresh token
const refreshAuthToken = async () => {
  try {
    const refreshToken = getRefreshToken(); // Get the refresh token from cookies or storage
    const response = await axios.post(
      `${BackendUrl}/api/refreshToken`,
      {},
      {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (response && response.data) {
      const { token, refreshToken: newRefreshToken } = response.data;
      // setToken(token, newRefreshToken); // Update both tokens
      return token;
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BackendUrl}/api/addUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        return response.data.message;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// login
const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/Login`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      });
      if (response || response?.data) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const getAllDataUser = createAsyncThunk(
  "auth/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getAllData`,
        headers: {
          Accept: "application/json",
        },
      });
      if (response || response?.data) {
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

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = getToken(); // Retrieve the token
      const refreshToken = getRefreshToken();
      if (!token) {
        return rejectWithValue("User not authenticated");
      }
      const response = await axios.post(`${BackendUrl}/api/logoutUser`, {
        userId,
        refreshToken,
      });
      if (response || response.data) {
        removeToken();
        window.location.reload();
        localStorage.clear();
        return response?.data; // If successful, return the API response
      }
    } catch (error) {
      // Return a user-friendly error message
      return rejectWithValue(
        error.response?.data?.message || "Failed to log out. Please try again."
      );
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (_, { dispatch, rejectWithValue }) => {
    const info = JSON.parse(localStorage.getItem("user"));
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token available");
      const response = await axios.post(`${BackendUrl}/api/refreshToken`, {
        refreshToken,
      });
      if (response) {
        const { accessToken } = response.data;
        setToken(accessToken, refreshToken); // Update tokens
        window.location.reload();
        return { accessToken };
      }
    } catch (error) {
      window.location.reload();
      const user_id = info.user_id;
      dispatch(logoutUser(user_id));
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Axios instance with interceptor
// const axiosInstance = axios.create();
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("originalRequest", originalRequest);

//     // If the error is a 401 and the request has not already been retried
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = getRefreshToken();
//         // Check if the refresh token is expired
//         if (!refreshToken) {
//           // Refresh token does not exist, logout immediately
//           removeToken();
//           localStorage.clear();
//           window.location.reload(); // Trigger logout process
//           return Promise.reject(new Error("Refresh token expired"));
//         }
//         // Try to refresh the access token
//         const newToken = await refreshAccessToken();
//         originalRequest.headers.authorization = `Bearer ${newToken.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         // If refreshing the token fails, remove tokens and log out
//         removeToken();
//         localStorage.clear();
//         window.location.reload(); // Redirect to login if refresh fails
//         throw err;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export {
  registerUser,
  loginUser,
  getAllDataUser,
  getDataUserById,
  refreshAuthToken,
};

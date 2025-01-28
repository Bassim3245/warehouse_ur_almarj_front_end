import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  getAllDataUser,
  getDataUserById,
  logoutUser,
} from "./authActions";
import {
  removeToken,
  setToken,
} from "../../utils/handelCookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    dataUsers: [],
    dataUserById: {},
    dataUserWareHouse: {},
    Role: "",
    code: false,
    isFetching: false,
    isSuccess: false,
    isSuccessMessage: false,
    isError: false,
    message: "",
    RoleData: {},
    accessToken: null, // Store access token
    refreshToken: null, // Store refresh token
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      removeToken();
      state.accessToken = null;
      state.refreshToken = null;
      // logoutUser();
      window.location.reload(false);
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    setTokens: (state, { payload: { accessToken, refreshToken } }) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(registerUser.fulfilled, (state, payload) => {
        state.loading = false;
        state.isSuccess = true;
        state.message = payload.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload: { user, message, accessToken, refreshToken } }) => {
          state.isError = false;
          state.isSuccess = true;
          state.message = message;
          localStorage.setItem("user", JSON.stringify(user));
          state.Role = user?.group_name;
          state.accessToken = accessToken; // Store access token
          state.refreshToken = refreshToken; // Store refresh token
          setToken(accessToken, refreshToken); // Save tokens in cookies
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
      });
    builder
      .addCase(getAllDataUser.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getAllDataUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isSuccessMessage = true;
        state.dataUsers = payload;
      })
      .addCase(getAllDataUser.rejected, (state, { payload }) => {
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
    
    // builder
    //   .addCase(refreshAccessToken.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(
    //     refreshAccessToken.fulfilled,
    //     (state, { payload: { accessToken } }) => {
    //       state.loading = false;
    //       state.accessToken = accessToken; // Update access token
    //       setToken(accessToken, state.refreshToken); // Update token in cookies
    //     }
    //   )
    //   .addCase(refreshAccessToken.rejected, (state, { payload }) => {
    //     state.loading = false;
    //     state.isError = true;
    //     state.message = payload;
    //     // Clear tokens if refresh fails
    //     state.accessToken = null;
    //     state.refreshToken = null;
    //     removeToken();
    //   });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
        state.dataUserById = {};
        removeToken();
        window.location.reload();
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.isError = true;
        state.message = payload;
        window.location.reload();
        removeToken();
        localStorage.clear();
      });
  },
});

export default userSlice.reducer;
export const { clearState, logout, setTokens } = userSlice.actions;
export const userSelector = (state) => state.user;

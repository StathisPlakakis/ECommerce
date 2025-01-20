import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => { }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      action.payload.success ? state.isAuthenticated = true : false;
      action.payload.success ? state.user = action.payload.user : null;
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      action.payload.success ? state.isAuthenticated = true : false;
      action.payload.success ? state.user = action.payload.user : null;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  }

});

export const registerUser = createAsyncThunk('auth/registerUser',
  async (formData) => {
    const response = await axios.post('https://ecommerce-px2q.onrender.com/api/auth/register', formData, { withCredentials: true });
    return response.data;
  })

export const loginUser = createAsyncThunk('auth/loginUser', async (formData) => {
  const response = await axios.post('https://ecommerce-px2q.onrender.com/api/auth/login', formData, { withCredentials: true });
  return response.data;
})

export const logoutUser = createAsyncThunk(
  "/auth/logoutUser",

  async () => {
    const response = await axios.post("https://ecommerce-px2q.onrender.com/api/auth/logout",
      {},
      { withCredentials: true });
    return response.data;
  }
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const response = await axios.get('https://ecommerce-px2q.onrender.com/api/auth/check-auth', {
    withCredentials: true,
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  }
  )
  return response.data;
})
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
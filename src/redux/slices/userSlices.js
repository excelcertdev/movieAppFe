import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commonService } from "../../services/common.services";
import { apiConstants } from "../../constants/api.constant";
import { toast } from 'react-toastify';


export const login = createAsyncThunk('user/login', async (data) => {
  let loginData = {
    email: data.email,
    password: data.password
  }
  const response = await commonService.withOutToken(apiConstants.LOGIN_USER ,loginData); 
  if(response && response.data && response.data.status){
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 2000,
    });
    localStorage.setItem('userData',JSON.stringify(response.data))
    localStorage.setItem('rememberMe',JSON.stringify(data.rememberMe))

  }else{
    toast.error(
      response.data.message, {
        position: "top-right",
      }
    )
  }
 
  return response.data; 
});

// Logout user clear session

export const logout = createAsyncThunk('user/logout', async (data) => {
  const response = await commonService.getWithToken(apiConstants.LOGOUT ,data); 
  if(response && response.data && response.data.status){
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 2000,
    });
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
  
  }else{
    toast.error(
      response.data.message, {
        position: "top-right",
      }
    )
  }
 
  return response.data; 
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    loggedInUser: null,
    logout: null
  },
  reducers: {
    changeValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});


export const { changeValue } = userSlice.actions;

export default userSlice.reducer 
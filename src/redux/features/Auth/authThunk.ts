import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
     
     

      const res = await axiosInstance.post("/auth/signup", {
        ...data,
        role:'user'
      });
      const { accessToken, refreshToken } = res.data.data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
  
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      const {  accessToken, refreshToken } = res.data.data
    
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);


      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);


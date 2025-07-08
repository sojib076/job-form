/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axiosInstance";
import {createAsyncThunk } from "@reduxjs/toolkit";


// Async thunk for applying to a job
export const applyForJob = createAsyncThunk<
  string, // returns jobId on success
  { jobId: string; userId: string },
  { rejectValue: string }
>(
  "jobs/applyForJob",
  async ({ jobId, userId }, { rejectWithValue }) => {
    try {
       await axiosInstance.post("/user/apply", { jobId, userId });
      return jobId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to apply");
    }
  }
)


export const fetchUserAppliedJobs = createAsyncThunk(
  "applications/fetchUserAppliedJobs",
  async (userId: string) => {
    const res = await axiosInstance.get(`/user/applied-jobs/${userId}`);
    console.log("Fetched applied jobs:", res.data.data);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to fetch applied jobs");
    }
    
    return res.data.data;
  }
);
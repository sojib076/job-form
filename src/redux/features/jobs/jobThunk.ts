/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import type { JobPayload } from "@/utils/types";


export const postJob = createAsyncThunk("jobs/postJob",
  async (jobData: JobPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/jobs/admin-post", jobData);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to post job");
    }
  }
);

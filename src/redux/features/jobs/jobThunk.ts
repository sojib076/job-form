/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import type { JobParams, JobPayload } from "@/utils/types";



export const postJob = createAsyncThunk("/jobs/postJob",
  async (jobData: JobPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/jobs/admin-post", jobData);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to post job");
    }
  }
);

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params: JobParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/jobs', {
        params,
      });

      console.log("Fetched Jobs:", response.data);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateJob = createAsyncThunk<
  string, 
  { jobId: string; updatedData: Partial<JobParams> },
  { rejectValue: string }
>(
  "jobs/updateJob",
  async ({ jobId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/jobs/${jobId}`, updatedData);

      if (response.status !== 200) {
        return rejectWithValue("Failed to update the job");
      }

      return jobId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update job");
    }
  }
);

export const deleteJob = createAsyncThunk<
  string, // return deleted jobId
  string, // takes jobId as argument
  { rejectValue: string }
>(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/jobs/${jobId}`);

      if (response.status !== 200) {
        return rejectWithValue("Failed to delete the job");
      }

      return jobId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete request failed");
    }
  }
);
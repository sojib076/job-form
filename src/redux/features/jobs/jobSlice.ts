/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { deleteJob, fetchJobs, updateJob } from "./jobThunk";
type JobState = {
    jobs: {
        data: any[]; // Replace 'any' with your specific job type if available
        meta: {
            page: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        }
    };
    meta: any | null;
    loading: boolean;
    error: string | null;
}
const initialState: JobState = {
  jobs: {
    data: [],
    meta: {
      page: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 0,
    },
  },
  meta: null,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.meta = action.payload.meta;
      })
      
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
        .addCase(deleteJob.fulfilled, (state, action) => {
      const deletedId = action.payload;
    
      state.jobs.data = state.jobs.data.filter(job => job._id !== deletedId);
    })
     .addCase(updateJob.fulfilled, (state, action) => {
      const updatedJob = action.payload
      console.log(updateJob);

      const index = state.jobs.data.findIndex(job => job._id === updatedJob._id);
      if (index !== -1) {
        // Replace only the job at that index (for updated info)
        state.jobs.data[index] = updatedJob;
      }
    });

  },
});

export const { clearError } = jobSlice.actions;
export default jobSlice.reducer;

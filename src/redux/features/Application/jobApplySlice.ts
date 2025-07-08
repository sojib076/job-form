import { createSlice } from "@reduxjs/toolkit";
import { applyForJob, fetchUserAppliedJobs } from "./ApplicaitonThnuk"; // make sure to import both thunks

type JobApplyState = {
  loading: boolean;
  appliedJobIds: string[];
  applyingJobId: string | null;
  error: string | null;
  success: boolean;
};

const initialState: JobApplyState = {
  loading: false,
  appliedJobIds: [],
  applyingJobId: null,
  success: false,
  error: null,
};

const jobApplySlice = createSlice({
  name: "jobApply",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // applyForJob handlers
      .addCase(applyForJob.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.applyingJobId = action.meta.arg.jobId;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.applyingJobId = null;

        const jobId = action.meta.arg.jobId;
        if (!state.appliedJobIds.includes(jobId)) {
          state.appliedJobIds.push(jobId);
        }
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.applyingJobId = null;
        state.success = false;
        state.error = action.payload as string;
      })

      // fetchUserAppliedJobs handlers
      .addCase(fetchUserAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobIds = action.payload; // update appliedJobIds with fetched data
      })
      .addCase(fetchUserAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetSuccess } = jobApplySlice.actions;
export default jobApplySlice.reducer;

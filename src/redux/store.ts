import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import jobReducer from "./features/jobs/jobSlice";
import jobApplyReducer from "./features/Application/jobApplySlice";

// ✅ move this up
const combinedReducer = (state: any, action: any) => ({
  auth: authReducer(state?.auth, action),
  jobs: jobReducer(state?.jobs, action),
  jobApply: jobApplyReducer(state?.jobApply, action),
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/forceLogout") {
    state = undefined;
  }
  return combinedReducer(state, action); // ✅ now it's defined
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

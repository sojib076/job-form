import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import jobReducer from "./features/jobs/jobSlice";
import jobApplyReducer from "./features/Application/jobApplySlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs : jobReducer,
    jobApply: jobApplyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

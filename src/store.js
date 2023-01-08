import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

//Global store
export const store = configureStore({
  reducer: {
    //reducers are defined here
    auth: authReducer,
  },
});
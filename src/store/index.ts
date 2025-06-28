import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { modalSlice } from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

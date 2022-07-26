import { configureStore } from '@reduxjs/toolkit';
import tickets from './tickets-slice';
import filters from './filters-slice';

export const store = configureStore({
  reducer: {
    tickets,
    filters,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

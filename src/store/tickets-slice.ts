import { createSlice } from '@reduxjs/toolkit';
import { ICompany, ITicket } from '../types/tickets';
import { fetchData } from './thunks';

interface IInitialState {
  companies: ICompany[];
  tickets: ITicket[];
  loadingState: {
    isLoading: boolean;
    isError: boolean;
  };
}

const initialState: IInitialState = {
  companies: [],
  tickets: [],
  loadingState: {
    isLoading: false,
    isError: false,
  },
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.tickets = action.payload.tickets;
      state.companies = action.payload.companies.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }

        return 0;
      });

      state.loadingState.isLoading = false;
      state.loadingState.isError = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loadingState.isLoading = false;
      state.loadingState.isError = true;
    });
    builder.addCase(fetchData.pending, (state) => {
      state.loadingState.isLoading = true;
      state.loadingState.isError = false;
    });
  },
});

export default ticketsSlice.reducer;

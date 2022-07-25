import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../api/api';
import { ApiRoutes } from '../constants/constants';
import { ICompany, ITicket } from '../types/tickets';

export const fetchData = createAsyncThunk('tickets/fetchData', async () => {
  const ticketsPromise = axiosApi.get<ITicket[]>(ApiRoutes.Tickets);
  const companiesPromise = axiosApi.get<ICompany[]>(ApiRoutes.Companies);

  const [tickets, companies] = await Promise.all([
    ticketsPromise,
    companiesPromise,
  ]);

  return { tickets: tickets.data, companies: companies.data };
});

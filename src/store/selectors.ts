import { RootState } from './store';

export const selectTickets = (state: RootState) => state.tickets;
export const selectCompanies = (state: RootState) => state.companies;

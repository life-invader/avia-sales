import { createSelector } from '@reduxjs/toolkit';
import {
  DefaultCompany,
  FilterFunctions,
  SortFunctions,
} from '../../constants/constants';
import { ICompany, ITicket } from '../../types/tickets';
import { getAvailableStops } from '../../utils/ticket';
import { selectFilters } from '../filters-slice/selectors';
import { RootState } from '../store';
import { CitiesType } from './types';

export const selectTickets = (state: RootState) => state.tickets.tickets;
export const selectCompanies = (state: RootState) => state.tickets.companies;
export const selectCompany = (ticket: ITicket) => (state: RootState) => {
  const companies = state.tickets.companies;
  // Если не указать DefaultCompany при возврате, у функции return type будет ICompany | undefined
  return (
    companies.find((item) => item.id === ticket.companyId) || DefaultCompany
  );
};
export const selectCities = (key: keyof CitiesType) => (state: RootState) =>
  state.tickets.cities[key];
export const selectLoadingState = (state: RootState) =>
  state.tickets.loadingState;

export const selectAvailableStops = createSelector(selectTickets, (tickets) => {
  return getAvailableStops(tickets);
});

export const selectFilteredTickets = createSelector(
  selectTickets,
  selectCompanies,
  selectFilters,
  selectAvailableStops,
  (tickets, companies, filters, stops) => {
    const companyId = (
      companies.find((item) => item.name === filters.company) ||
      ({
        id: 'default',
        logo: 'default',
        name: 'default',
      } as ICompany)
    ).id; // Нужен id компании (s7, xiamen) для фильтрации

    const result = tickets.filter((ticket) => {
      return (
        FilterFunctions.transfers(filters.transfers, stops, ticket) &&
        FilterFunctions.company(ticket, companyId) &&
        FilterFunctions.date(ticket, filters) &&
        FilterFunctions.cities(ticket, filters)
      );
    });

    return SortFunctions[filters.sort](result);
  }
);

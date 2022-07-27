import { createSelector } from '@reduxjs/toolkit';
import { FilterFunctions, SortFunctions } from '../constants/constants';
import { FiltersType, ICompany, SortOptionsType } from '../types/tickets';
import { getAvailableStops } from '../utils/ticket';
import { RootState } from './store';

export const selectTickets = (state: RootState) => state.tickets.tickets;
export const selectCompanies = (state: RootState) => state.tickets.companies;
export const selectLoadingState = (state: RootState) =>
  state.tickets.loadingState;
export const selectAvailableStops = createSelector(selectTickets, (tickets) => {
  return getAvailableStops(tickets);
});
export const selectFilteredTickets = (
  filters: FiltersType,
  sort: SortOptionsType
) =>
  createSelector(
    selectTickets,
    selectCompanies,
    selectAvailableStops,
    (tickets, companies, stops) => {
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
          FilterFunctions.company(ticket, companyId)
        );
      });

      return SortFunctions[sort](result);
    }
  );

export const selectChosenDate = (state: RootState) => state.filters.time;
export const selectCity = (key: string) => (state: RootState) => {
  if (key === 'cityFrom') {
    return state.filters.city.origin;
  } else {
    return state.filters.city.destination;
  }
};
export const selectCities = (key: string) => (state: RootState) => {
  if (key === 'cityFrom') {
    return state.tickets.cities.origins;
  } else {
    return state.tickets.cities.destinations;
  }
};

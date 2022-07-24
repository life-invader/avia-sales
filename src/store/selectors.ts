/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { ICompany, ITicket } from '../types/tickets';
import { getAvailableStops } from '../utils/ticket';
import { RootState } from './store';

type FiltersType = {
  transfers: string[];
  company: string;
};

// { transfers: [], company: 'all' }
// { no-transfer: 0 }

export const selectTickets = (state: RootState) => state.tickets;
export const selectCompanies = (state: RootState) => state.companies;
export const selectLoadingState = (state: RootState) => state.loadingState;
export const selectCompany = (ticket: ITicket) => createSelector(selectCompanies, (companies) => {
  return companies.find((item) => item.id === ticket.companyId);
});
export const selectFilteredTickets = (filters: FiltersType) => createSelector(selectTickets, selectCompanies, (tickets, companies) => {
  const stops = getAvailableStops(tickets);
  const companyId = (companies.find((item) => item.name === filters.company) || {
    id: '999',
    logo: 'default',
    name: 'default'
  } as ICompany).id;

  return tickets.filter((ticket) => {
    return (Object.keys(filters) as Array<keyof FiltersType>).every((key) => {
      const item = filters[key]; // 1-transfer

      if (item === 'all') {
        return true;
      }

      // Фильтрация по пересадкам
      if (Array.isArray(item)) {
        if (item.length === 0) {
          return true;
        }

        return item.some((i) => {
          return stops[i] === ticket.info.stops.length;
        });
      }

      return ticket.companyId === companyId;
    });
  })
});

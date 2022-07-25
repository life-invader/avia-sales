import { Transfers } from '../../constants/constants';
import { ICompany, ITicket } from '../../types/tickets';

export type TransfersType = keyof typeof Transfers;

export type CatalogFiltersType = {
  tickets: ITicket[];
  companies: ICompany[];
};

export type StopsType = {
  [key: string]: number;
};

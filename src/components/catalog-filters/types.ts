import { Transfers } from '../../constants/constants';
import { ICompany, ITicket } from '../../types/tickets';

export type TransfersType = keyof typeof Transfers;

export type CatalogFiltersType = {
  tickets: ITicket[];
  companies: ICompany[];
  transfersFilterClickHandler: (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => void;
  companiesFilterClickHandler: (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export type StopsType = {
  [key: string]: number;
};

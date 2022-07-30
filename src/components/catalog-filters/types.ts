import { Transfers } from '../../constants/constants';
import { ICompany } from '../../types/tickets';

export type TransfersType = keyof typeof Transfers;

export type CatalogFiltersType = {
  companies: ICompany[];
  stops: StopsType;
  checkedCompany: string;
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

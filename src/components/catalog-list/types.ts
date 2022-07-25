import { ICompany, ITicket } from '../../types/tickets';

export type CatalogListType = {
  tickets: ITicket[];
  companies: ICompany[];
  isLoading?: boolean;
  isError?: boolean;
};

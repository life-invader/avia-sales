import { ICompany, ITicket } from '../../types/tickets';

export type CitiesType = {
  origins: string[];
  destinations: string[];
};

export interface ITickets {
  companies: ICompany[];
  tickets: ITicket[];
  cities: CitiesType;
  loadingState: {
    isLoading: boolean;
    isError: boolean;
  };
}

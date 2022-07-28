import { StopsType } from '../components/catalog-filters/types';
import { IFilters } from '../store/filters-slice/types';
import { ITicket } from '../types/tickets';

export const ApiRoutes = {
  Tickets: '163b5e66df9f2741243e',
  Companies: 'a1b1c28b32d9785bb26c',
};

export const TICKETS_SHOW_AMOUNT = 5;

export const Transfers = {
  'no-transfer': 'Без пересадок',
  '1-transfer': '1 пересадки',
  '2-transfer': '2 пересадки',
  '3-transfer': '3 пересадки',
} as const;

export const FilterFunctions = {
  transfers: (item: string[], stops: StopsType, ticket: ITicket) => {
    if (item.length === 0) {
      return true;
    }

    return item.some((i) => {
      return stops[i] === ticket.info.stops.length;
    });
  },
  company: (ticket: ITicket, companyId: string) => {
    if (companyId === 'default') {
      return true;
    }

    return ticket.companyId === companyId;
  },
  date: (ticket: ITicket, filters: IFilters) => {
    const dateStart = Number(ticket.info.dateStart);
    const dateEnd = Number(ticket.info.dateEnd);

    const start = filters.time.timeTo ? filters.time.timeTo : null;
    const end = filters.time.timeBack ? filters.time.timeBack : null;

    return !(
      (start && start > dateStart) ||
      (end && end < dateStart) ||
      (start && start > dateEnd) ||
      (end && end < dateEnd)
    );
  },
  cities: (ticket: ITicket, filters: IFilters) => {
    const origin = filters.city.origin;
    const destination = filters.city.destination;

    function checkOrigin() {
      if (!origin) {
        return true;
      }

      return ticket.info.origin.toLowerCase().includes(origin.toLowerCase());
    }

    function checkDest() {
      if (!destination) {
        return true;
      }

      return ticket.info.destination
        .toLowerCase()
        .includes(destination.toLowerCase());
    }

    return checkOrigin() && checkDest();
  },
};

export const SortOptions = {
  Cheap: 'cheap',
  Fast: 'fast',
  Optimal: 'optimal',
} as const;

export const SortOptionsTitle = {
  [SortOptions.Cheap]: 'Самый дешевый',
  [SortOptions.Fast]: 'Самый быстрый',
  [SortOptions.Optimal]: 'Оптимальный',
} as const;

export const SortFunctions = {
  [SortOptions.Cheap]: (tickets: ITicket[]) => {
    return tickets.sort((a, b) => a.price - b.price);
  },
  [SortOptions.Fast]: (tickets: ITicket[]) => {
    return tickets.sort((a, b) => a.info.duration - b.info.duration);
  },
  [SortOptions.Optimal]: (tickets: ITicket[]) => {
    return tickets.sort(
      (a, b) => a.info.duration - b.info.duration || a.price - b.price
    );
  },
};

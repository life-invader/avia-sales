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

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
  Cheap: 'Самый дешевый',
  Fast: 'Самый быстрый',
  Optimal: 'Оптимальный',
} as const;

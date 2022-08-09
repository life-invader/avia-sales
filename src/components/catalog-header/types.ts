import { SortOptionsType } from '../../types/tickets';

export type CatalogHeaderType = {
  activeSort: SortOptionsType;
  setActiveSort: (sort: SortOptionsType) => void;
};

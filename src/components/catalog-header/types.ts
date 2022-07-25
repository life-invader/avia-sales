import { SortOptionsType } from '../../types/tickets';

export type CatalogHeaderType = {
  activeSort: SortOptionsType;
  setActiveSort: React.Dispatch<React.SetStateAction<SortOptionsType>>;
};

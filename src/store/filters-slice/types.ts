import { SortOptionsType } from '../../types/tickets';

export type TimeType = {
  timeTo: number;
  timeBack: number;
};

export type FilterCityType = {
  origin: string;
  destination: string;
};

export interface IFilters {
  transfers: string[];
  company: string;
  time: TimeType;
  city: FilterCityType;
  sort: SortOptionsType;
}

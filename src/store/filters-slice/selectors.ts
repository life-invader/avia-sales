import { RootState } from '../store';
import { FilterCityType } from './types';

export const selectFilters = (state: RootState) => state.filters;
export const selectCompany = (state: RootState) => state.filters.company;
export const selectSort = (state: RootState) => state.filters.sort;
export const selectChosenDate = (state: RootState) => state.filters.time;
export const selectCity = (key: keyof FilterCityType) => (state: RootState) => {
  return state.filters.city[key];
};

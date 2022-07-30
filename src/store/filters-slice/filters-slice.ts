import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOptions } from '../../constants/constants';
import { SortOptionsType } from '../../types/tickets';
import { FilterCityType, IFilters, TimeType } from './types';

const initialState: IFilters = {
  transfers: [],
  company: 'all',
  time: {
    timeTo: 0,
    timeBack: 0,
  },
  city: {
    origin: '',
    destination: '',
  },
  sort: SortOptions.Cheap,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTransfers(state, action: PayloadAction<string>) {
      if (state.transfers.includes(action.payload)) {
        state.transfers = state.transfers.filter(
          (item) => item !== action.payload
        );
      } else {
        state.transfers.push(action.payload);
      }
    },
    setCompany(state, action: PayloadAction<string>) {
      state.company = action.payload;
    },
    setTime(
      state,
      action: PayloadAction<{ date: number; id: keyof TimeType }>
    ) {
      const { id, date } = action.payload;
      if (state.time[id] === date) {
        state.time[id] = 0;
      } else {
        state.time[id] = date;
      }
    },
    setCity(
      state,
      action: PayloadAction<{ id: keyof FilterCityType; city: string }>
    ) {
      const { city, id } = action.payload;
      state.city[id] = city;
    },
    swapCities(state) {
      const temporary = state.city.origin;
      state.city.origin = state.city.destination;
      state.city.destination = temporary;
    },
    setSort(state, action: PayloadAction<SortOptionsType>) {
      state.sort = action.payload;
    },
  },
});

export default filtersSlice.reducer;
export const {
  setTransfers,
  setCompany,
  setTime,
  setCity,
  swapCities,
  setSort,
} = filtersSlice.actions;

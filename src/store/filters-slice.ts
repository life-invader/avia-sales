import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOptions } from '../constants/constants';
import { SortOptionsType } from '../types/tickets';

interface IFilters {
  transfers: string[];
  company: string;
  time: {
    timeTo: number;
    timeBack: number;
  };
  city: {
    origin: string;
    destination: string;
  };
  sort: SortOptionsType;
}

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
    setTime(state, action: PayloadAction<{ date: number; id: string }>) {
      const { id, date } = action.payload;

      if (id === 'timeTo') {
        state.time.timeTo = date;
      } else {
        state.time.timeBack = date;
      }
    },
    setCity(state, action: PayloadAction<{ id: string; city: string }>) {
      const { city, id } = action.payload;
      if (id === 'cityFrom') {
        state.city.origin = city;
      } else {
        state.city.destination = city;
      }
    },
    swapCities(state) {
      const temporary = state.city.origin;
      state.city.origin = state.city.destination;
      state.city.destination = temporary;
    },
  },
});

export default filtersSlice.reducer;
export const { setTransfers, setCompany, setTime, setCity, swapCities } =
  filtersSlice.actions;

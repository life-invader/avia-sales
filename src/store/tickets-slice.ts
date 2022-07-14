import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('users/fetchByIdStatus', async () => {
  const ticketsPromise = axios.get(
    'https://api.npoint.io/163b5e66df9f2741243e'
  );
  const companiesPromise = axios.get(
    'https://api.npoint.io/a1b1c28b32d9785bb26c'
  );

  const [tickets, companies] = await Promise.all([
    ticketsPromise,
    companiesPromise,
  ]);

  return { tickets: tickets.data, companies: companies.data };
});

export type CityCodes =
  | 'MOW'
  | 'HKT'
  | 'HKG'
  | 'JNB'
  | 'PTB'
  | 'ARH'
  | 'TRN'
  | 'KRS'
  | 'SRT'
  | 'LOS'
  | 'EKV'
  | 'EKT';

export interface ITicket {
  id: string;
  // Цена в рублях
  price: number;
  // идентификатор компании которая осуществляет перевозку
  companyId: string;
  // Массив идентификаторов перелётов
  info: {
    // Код города откуда вылет
    origin: CityCodes;
    // Код города куда летим
    destination: CityCodes;
    // Дата и время вылета в unix времени
    dateStart: string;
    // Дата и время прибытия в unix времени
    dateEnd: string;
    // Массив кодов городов с пересадками
    stops: CityCodes[];
    // Длительность полета в миллисекундах
    duration: number;
  };
}

export interface ICompany {
  id: string;
  // Название компании
  name: string;
  // Имя логотипа
  // Т.к. картинки пока храниться будут у Вас локально - имя и путь к картинке можете замапить на те что будут у вас
  logo: string;
}

interface IInitialState {
  companies: ICompany[];
  tickets: ITicket[];
}

const initialState: IInitialState = {
  companies: [],
  tickets: [],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.companies = action.payload.companies;
      state.tickets = action.payload.tickets;
    });
  },
});

export default ticketsSlice.reducer;

import { SortOptions } from '../constants/constants';

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
  price: number;
  companyId: string;
  info: {
    origin: CityCodes;
    destination: CityCodes;
    dateStart: string;
    dateEnd: string;
    stops: CityCodes[];
    duration: number;
  };
}

export interface ICompany {
  id: string;
  name: string;
  logo: string;
}

export type FiltersType = {
  transfers: string[];
  company: string;
  timeTo: string;
  timeBack: string;
};

export type SortOptionsType = typeof SortOptions[keyof typeof SortOptions];

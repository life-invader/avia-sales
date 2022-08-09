import { FilterCityType } from '../../../store/filters-slice/types';
import { CitiesType } from '../../../store/tickets-slice/types';

export type InputCityType = {
  title: string;
  placeholder: string;
  id: keyof CitiesType;
  filterId: keyof FilterCityType;
};

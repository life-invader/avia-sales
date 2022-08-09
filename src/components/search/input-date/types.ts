import { TimeType } from '../../../store/filters-slice/types';

export type InputDateType = {
  title: string;
  placeholder: string;
  id: keyof TimeType;
};

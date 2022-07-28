import { TimeType } from '../../store/filters-slice/types';

export type DatepickerType = {
  id: keyof TimeType;
  closePicker: (state: boolean) => void;
};

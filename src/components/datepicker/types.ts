export type DatepickerType = {
  chosenDate: number;
  selectDate: (date: Date) => () => void;
};

import dayjs from 'dayjs';
import ruLocale from 'dayjs/locale/ru';
dayjs.locale(ruLocale);

export const formatMonth = (date: Date) => {
  return dayjs(date).format('MMMM, YYYY');
};

export const formatInputDateValue = (date: number) => {
  return dayjs(date).format('DD MMMM, dd');
};

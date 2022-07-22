import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import { StopsType } from '../components/catalog-filters/types';
import { ITicket } from '../types/tickets';
dayjs.extend(Duration);

export const formatGuitarPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU').format(price);

export const formatDate = (date: string) => {
  return dayjs(date).format('HH:mm');
};

export const getLandingTime = (date: string, duration: number) => {
  const startTime = Number(date); // ms
  const landingTime = dayjs(startTime + duration); // ms
  const landingTimeFormatted = landingTime.format('HH:mm'); // чч:мм

  return landingTimeFormatted;
};

export const formatDuration = (duration: number) => {
  const flightDuration = dayjs.duration(duration, 'milliseconds');
  const hours = flightDuration.hours();
  const minutes = flightDuration.minutes();

  if (hours <= 0) {
    return `${minutes}м`;
  }

  return `${hours}ч ${minutes}м`;
};

export const getAvailableStops = (tickets: ITicket[]) => {
  return tickets
    .map((item) => item.info.stops)
    .reduce((acc: StopsType, item) => {
      acc[`${item.length === 0 ? 'no' : item.length}-transfer`] = acc[
        `${item.length === 0 ? 'no' : item.length}-transfer`
      ]
        ? (acc[`${item.length === 0 ? 'no' : item.length}-transfer`] += 1)
        : 1;

      return acc;
    }, {});
};

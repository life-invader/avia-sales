import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import { StopsType } from '../components/catalog-filters/types';
import { DefaultCompany, TransfersDeclinations } from '../constants/constants';
import { ICompany, ITicket } from '../types/tickets';
dayjs.extend(Duration);

export const getTransferName = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

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
        ? (acc[`${item.length === 0 ? 'no' : item.length}-transfer`] =
            item.length)
        : item.length;

      return acc;
    }, {});
};

export const getCompany = (ticket: ITicket, companies: ICompany[]) => {
  return (
    companies.find((item) => item.id === ticket.companyId) || DefaultCompany
  );
};

export const getTransfersDeclination = (number: number) => {
  return TransfersDeclinations[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
};

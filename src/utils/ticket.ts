import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
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

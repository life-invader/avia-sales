/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChosenDate } from '../../../store/selectors';
import Datepicker from '../../datepicker/datepicker';

import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import customParssdafeFormat from 'dayjs/locale/ru';
dayjs.extend(updateLocale, customParseFormat)
// dayjs.updateLocale('ru', {
//   weekdaysShort: [
//     'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'
//   ]
// })
dayjs.locale(customParssdafeFormat)

function InputDate({ title, id, placeholder, isDatePickerOpened, setIsDatePickerOpened, closePickers }: any) {
  const time = useSelector(selectChosenDate);
  const datePickerTypeTime = id === 'timeTo' ? time.timeTo : time.timeBack;
  const formattedDate = dayjs(datePickerTypeTime).format('DD MMMM, dd')
  console.log(dayjs(datePickerTypeTime).format('DD MMMM, dd'))
  console.log(dayjs(new Date()).format('DD MMMM, dd'))

  const datePickerHandler = (evt: any) => {
    evt.stopPropagation();
    closePickers();
    setIsDatePickerOpened(true);
  };

  return (
    <div className="label-wrapper">
      <label className="search-label">
        <span className="visually-hidden">{title}</span>
        <input
          id={id}
          className="search-input search-input-date"
          type="text"
          placeholder={placeholder}
          form="tickets-form"
          value={
            Number(datePickerTypeTime)
              ? formattedDate
              : ''
          }
          readOnly
          onClick={datePickerHandler}
        />
      </label>
      {isDatePickerOpened && (
        <Datepicker
          closePicker={setIsDatePickerOpened}
          id={id}
          isDatePickerOpened={isDatePickerOpened}
        />
      )}
    </div>
  );
}

export default InputDate;

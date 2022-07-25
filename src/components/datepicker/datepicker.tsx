/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { DatepickerType } from './types';
import classnames from 'classnames';
import * as calendar from './calendar';
import './datepicker.scss';

const dateD = new Date();
const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthData = calendar.getMonthData(dateD.getFullYear(), dateD.getMonth());

function Datepicker({ closePicker, dataChooseHandler }: any) {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleOutsideClick = (evt: MouseEvent) => {
    if (
      datePickerRef.current &&
      !evt.composedPath().includes(datePickerRef.current)
    ) {
      closePicker(false);
    }
  };

  const handleDayClick = (date: Date) => {
    dataChooseHandler(date);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="datepicker" ref={datePickerRef}>
      <p className="datepicker-title">ИЮНЬ 2022</p>
      <table className="calendar">
        <thead className="datepicker-head">
          <tr className="datepicker-row">
            {weekDayNames.map((name) => (
              <th key={name} className="head-cell">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthData.map((week, index) => (
            <tr key={index} className="datepicker-row">
              {week.map((date, index) =>
                date ? (
                  <td
                    key={index}
                    className={classnames('day', 'datepicker-day', {
                      today: calendar.areEqual(date, dateD),
                      selected: calendar.areEqual(date, selectedDate),
                    })}
                    onClick={() => handleDayClick(date)}
                  >
                    {date.getDate()}
                  </td>
                ) : (
                  <td key={index} />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Datepicker;

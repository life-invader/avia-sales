/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useRef } from 'react';
import { DatepickerType } from './types';
import classnames from 'classnames';
import * as calendar from './calendar';
import { setTime } from '../../store/filters-slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useSelector } from 'react-redux';
import { selectChosenDate } from '../../store/selectors';
import './datepicker.scss';
import dayjs from 'dayjs';

const dateD = new Date();
const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthData = calendar.getMonthData(dateD.getFullYear(), dateD.getMonth());

function Datepicker({ closePicker, id }: any) {
  const dispatch = useAppDispatch();
  const time = useSelector(selectChosenDate) || 0;
  const datePickerTypeTime = id === 'timeTo' ? time.timeTo : time.timeBack;

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (evt: MouseEvent) => {
    if (
      datePickerRef.current &&
      !evt.composedPath().includes(datePickerRef.current)
    ) {
      closePicker(false);
    }
  };

  const handleDayClick = (date: Date) => {
    dispatch(setTime({ date: date.getTime(), id }));
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="datepicker" ref={datePickerRef}>
      <p className="datepicker-title">{dayjs(datePickerTypeTime).format('MMMM, YYYY')}</p>
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
                    className={classnames('datepicker-day', {
                      today: calendar.areEqual(date, dateD),
                      'datepicker-day-active': calendar.areEqual(
                        date,
                        new Date(datePickerTypeTime)
                      ),
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

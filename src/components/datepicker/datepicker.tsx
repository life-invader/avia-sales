import { useRef } from 'react';
import { DatepickerType } from './types';
import { formatMonth } from '../../utils/date-picker';
import classnames from 'classnames';
import * as calendar from './calendar';
import './datepicker.scss';

function Datepicker({ selectDate, chosenDate }: DatepickerType) {
  const datePickerRef = useRef<HTMLDivElement>(null);

  const todaysDate = new Date();
  const monthData = calendar.getMonthData(
    todaysDate.getFullYear(),
    todaysDate.getMonth()
  );

  return (
    <div className="datepicker" ref={datePickerRef}>
      <p className="datepicker-title">{formatMonth(todaysDate)}</p>
      <table className="calendar">
        <thead className="datepicker-head">
          <tr className="datepicker-row">
            {calendar.weekDayNames.map((name) => (
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
                      'datepicker-day-today': calendar.areEqual(
                        date,
                        todaysDate
                      ),
                      'datepicker-day-active': calendar.areEqual(
                        date,
                        new Date(chosenDate)
                      ),
                    })}
                    onClick={selectDate(date)}
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

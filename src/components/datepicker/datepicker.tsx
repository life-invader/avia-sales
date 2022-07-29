import { useRef } from 'react';
import { DatepickerType } from './types';
import { setTime } from '../../store/filters-slice/filters-slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useSelector } from 'react-redux';
import { formatMonth } from '../../utils/date-picker';
import classnames from 'classnames';
import { selectChosenDate } from '../../store/filters-slice/selectors';
import * as calendar from './calendar';
import './datepicker.scss';

function Datepicker({ closePicker, id }: DatepickerType) {
  const dispatch = useAppDispatch();

  const datePickerRef = useRef<HTMLDivElement>(null);
  const dateFilters = useSelector(selectChosenDate);
  const chosenDate = dateFilters[id];

  const todaysDate = new Date();
  const monthData = calendar.getMonthData(
    todaysDate.getFullYear(),
    todaysDate.getMonth()
  );

  const handleDayClick = (date: Date) => () => {
    dispatch(setTime({ date: date.getTime(), id }));
    closePicker();
  };

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
                    onClick={handleDayClick(date)}
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

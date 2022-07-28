import { useSelector } from 'react-redux';
import { formatInputDateValue } from '../../../utils/date-picker';
import Datepicker from '../../datepicker/datepicker';
import React from 'react';
import { selectChosenDate } from '../../../store/filters-slice/selectors';
import { InputDateType } from './types';

function InputDate({
  title,
  id,
  placeholder,
  isDatePickerOpened,
  setIsDatePickerOpened,
  closePickers,
}: InputDateType) {
  const dateFilters = useSelector(selectChosenDate);
  const chosenDate = dateFilters[id];

  const datePickerHandler = (evt: React.SyntheticEvent) => {
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
          value={chosenDate ? formatInputDateValue(chosenDate) : ''}
          readOnly
          onClick={datePickerHandler}
        />
      </label>
      {isDatePickerOpened && (
        <Datepicker closePicker={setIsDatePickerOpened} id={id} />
      )}
    </div>
  );
}

export default InputDate;

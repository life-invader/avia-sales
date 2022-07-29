import { useSelector } from 'react-redux';
import { formatInputDateValue } from '../../../utils/date-picker';
import { useEffect, useRef, useState } from 'react';
import { selectChosenDate } from '../../../store/filters-slice/selectors';
import { InputDateType } from './types';
import Datepicker from '../../datepicker/datepicker';

function InputDate({ title, id, placeholder }: InputDateType) {
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const dateFilters = useSelector(selectChosenDate);
  const chosenDate = dateFilters[id];

  const closePickerHandler = () => {
    setIsDatePickerOpened(false);
  };

  const datePickerHandler = () => {
    setIsDatePickerOpened(true);
  };

  const handleOutsideClick = (evt: MouseEvent) => {
    if (
      datePickerRef.current &&
      !evt.composedPath().includes(datePickerRef.current)
    ) {
      setIsDatePickerOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="label-wrapper" ref={datePickerRef}>
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
        <Datepicker closePicker={closePickerHandler} id={id} />
      )}
    </div>
  );
}

export default InputDate;

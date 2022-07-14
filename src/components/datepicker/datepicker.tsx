import { useEffect, useRef } from 'react';
import './datepicker.scss';

type DatepickerType = {
  closePicker: (state: boolean) => void;
};

function Datepicker({ closePicker }: DatepickerType) {
  const datePickerRef = useRef(null);

  const handleOutsideClick = (evt: MouseEvent) => {
    if (!evt.composedPath().includes(datePickerRef.current!)) {
      closePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="datepicker" ref={datePickerRef}>
      ИЮНЬ 2022
      <div className="calendar"></div>
    </div>
  );
}

export default Datepicker;

import { useEffect, useRef } from 'react';
import { DatepickerType } from './types';
import './datepicker.scss';

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
      <p className="datepicker-title">ИЮНЬ 2022</p>
      <table className="calendar">
        <thead className="datepicker-head">
          <tr className="datepicker-row">
            <th className="head-cell">пн</th>
            <th className="head-cell">вт</th>
            <th className="head-cell">ср</th>
            <th className="head-cell">чт</th>
            <th className="head-cell">пт</th>
            <th className="head-cell">сб</th>
            <th className="head-cell">вс</th>
          </tr>
        </thead>
        <tbody>
          <tr className="datepicker-row">
            <td className="datepicker-day inactive"></td>
            <td className="datepicker-day inactive"></td>
            <td className="datepicker-day">1</td>
            <td className="datepicker-day">2</td>
            <td className="datepicker-day">3</td>
            <td className="datepicker-day">4</td>
            <td className="datepicker-day">5</td>
          </tr>
          <tr className="datepicker-row">
            <td className="datepicker-day">6</td>
            <td className="datepicker-day">7</td>
            <td className="datepicker-day">8</td>
            <td className="datepicker-day">9</td>
            <td className="datepicker-day">10</td>
            <td className="datepicker-day">11</td>
            <td className="datepicker-day">12</td>
          </tr>
          <tr className="datepicker-row">
            <td className="datepicker-day">13</td>
            <td className="datepicker-day">14</td>
            <td className="datepicker-day">15</td>
            <td className="datepicker-day">16</td>
            <td className="datepicker-day">17</td>
            <td className="datepicker-day">18</td>
            <td className="datepicker-day">19</td>
          </tr>
          <tr className="datepicker-row">
            <td className="datepicker-day">20</td>
            <td className="datepicker-day">21</td>
            <td className="datepicker-day">22</td>
            <td className="datepicker-day">23</td>
            <td className="datepicker-day">24</td>
            <td className="datepicker-day">25</td>
            <td className="datepicker-day">26</td>
          </tr>
          <tr className="datepicker-row">
            <td className="datepicker-day">27</td>
            <td className="datepicker-day">28</td>
            <td className="datepicker-day">29</td>
            <td className="datepicker-day">30</td>
            <td className="datepicker-day">31</td>
            <td className="datepicker-day inactive"></td>
            <td className="datepicker-day inactive"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Datepicker;

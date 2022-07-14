/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { SyntheticEvent, useState } from 'react';
import Datepicker from '../datepicker/datepicker';
import './search.scss';

function Search() {
  const [isDatepickerOpened, setIsDatepickerOpened] = useState(false);
  const [currentInput, setCurrentInput] = useState('');

  const dateClickHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setIsDatepickerOpened(true);
    setCurrentInput(evt.currentTarget.id);
  };

  return (
    <div className="search">
      <div className="field-wrapper">
        <label className="search-label">
          <span className="visually-hidden">Откуда летим</span>
          <input
            className="search-input firs-input"
            type="text"
            placeholder="Откуда"
            form="tickets-form"
          />
        </label>

        <label className="search-label">
          <span className="visually-hidden">Куда летим</span>
          <input
            className="search-input"
            type="text"
            placeholder="Куда"
            form="tickets-form"
          />
        </label>

        <button className="change-btn" type="button">
          <span className="visually-hidden">
            Поменять местами &apos;откуда&apos; и &apos;куда&apos;
          </span>
        </button>
      </div>

      <div className="field-wrapper">
        <div className="label-wrapper">
          <label className="search-label">
            <span className="visually-hidden">Когда летим</span>
            <input
              id="there"
              className="search-input search-input-date"
              type="text"
              placeholder="Когда"
              form="tickets-form"
              onClick={dateClickHandler}
            />
          </label>
          {isDatepickerOpened && (
            <Datepicker closePicker={setIsDatepickerOpened} />
          )}
        </div>

        <div className="label-wrapper">
          <label className="search-label">
            <span className="visually-hidden">Когда летим обратно</span>
            <input
              id="back"
              className="search-input last-input search-input-date"
              type="text"
              placeholder="Обратно"
              form="tickets-form"
              onClick={dateClickHandler}
            />
          </label>
          {isDatepickerOpened && (
            <Datepicker closePicker={setIsDatepickerOpened} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

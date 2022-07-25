import { SyntheticEvent, useState } from 'react';
import Datepicker from '../datepicker/datepicker';
import './search.scss';

function Search() {
  const [isThereDatepickerOpened, setIsThereDatepickerOpened] = useState(false);
  const [isBackDatepickerOpened, setIsBackDatepickerOpened] = useState(false);

  const closeAll = () => {
    setIsThereDatepickerOpened(false);
    setIsBackDatepickerOpened(false);
  };

  const dateThereClickHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    closeAll();
    setIsThereDatepickerOpened(true);
  };

  const dateBackClickHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    closeAll();
    setIsBackDatepickerOpened(true);
  };

  return (
    <div className="search">
      <div className="field-wrapper">
        <label className="search-label">
          <span className="visually-hidden">Откуда летим</span>
          <input
            className="search-input search-dest"
            type="text"
            placeholder="Откуда"
            form="tickets-form"
          />
        </label>

        <label className="search-label">
          <span className="visually-hidden">Куда летим</span>
          <input
            className="search-input search-dest"
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
              onClick={dateThereClickHandler}
            />
          </label>
          {isThereDatepickerOpened && (
            <Datepicker closePicker={setIsThereDatepickerOpened} />
          )}
        </div>

        <div className="label-wrapper">
          <label className="search-label">
            <span className="visually-hidden">Когда летим обратно</span>
            <input
              id="back"
              className="search-input search-input-date"
              type="text"
              placeholder="Обратно"
              form="tickets-form"
              onClick={dateBackClickHandler}
            />
          </label>
          {isBackDatepickerOpened && (
            <Datepicker closePicker={setIsBackDatepickerOpened} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

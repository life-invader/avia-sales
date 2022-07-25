/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useState } from 'react';
import Datepicker from '../datepicker/datepicker';
import InputCity from './input-city/input-city';
import './search.scss';

function Search() {
  const [isThereDatepickerOpened, setIsThereDatepickerOpened] = useState(false);
  const [isBackDatepickerOpened, setIsBackDatepickerOpened] = useState(false);
  const [openedPicker, setOpenedPicker] = useState('');
  const [selectedTime, setSelectedTime] = useState<any>({
    timeTo: '',
    timeBack: '',
  });

  const closeAll = () => {
    setIsThereDatepickerOpened(false);
    setIsBackDatepickerOpened(false);
  };

  const dateThereClickHandler = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    closeAll();
    setIsThereDatepickerOpened(true);
    setOpenedPicker(evt.currentTarget.id);
  };

  const dateBackClickHandler = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    closeAll();
    setIsBackDatepickerOpened(true);
    setOpenedPicker(evt.currentTarget.id);
  };

  const dataChooseHandler = (date: Date) => {
    setSelectedTime({ ...selectedTime, [openedPicker]: date });
  }

  return (
    <div className="search">
      <div className="field-wrapper">
        {/* <div className="city-label-wrapper">
          <label className="search-label">
            <span className="visually-hidden">Откуда летим</span>
            <input
              className="search-input search-dest"
              type="text"
              placeholder="Откуда"
              form="tickets-form"
            />
            <ul className="search-options-list">
              <li className='search-options-item'>
                Вариант 1
              </li>
              <li className='search-options-item'>
                Вариант 2
              </li>
            </ul>
          </label>
        </div> */}
        <InputCity title={'Откуда летим'} placeholder={'Откуда'} />

        <div className="city-label-wrapper">
          <label className="search-label">
            <span className="visually-hidden">Куда летим</span>
            <input
              className="search-input search-dest"
              type="text"
              placeholder="Куда"
              form="tickets-form"
            />
          </label>
        </div>

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
              id="timeTo"
              className="search-input search-input-date"
              type="text"
              placeholder="Когда"
              form="tickets-form"
              value={selectedTime.timeTo ? selectedTime.timeTo.toLocaleDateString() : ''}
              readOnly
              onClick={dateThereClickHandler}
            />
          </label>
          {isThereDatepickerOpened && (
            <Datepicker closePicker={setIsThereDatepickerOpened} dataChooseHandler={dataChooseHandler} />
          )}
        </div>

        <div className="label-wrapper">
          <label className="search-label">
            <span className="visually-hidden">Когда летим обратно</span>
            <input
              id="timeBack"
              className="search-input search-input-date"
              type="text"
              placeholder="Обратно"
              form="tickets-form"
              value={selectedTime.timeBack ? selectedTime.timeBack.toLocaleDateString() : ''}
              readOnly
              onClick={dateBackClickHandler}
            />
          </label>
          {isBackDatepickerOpened && (
            <Datepicker
              closePicker={setIsBackDatepickerOpened}
              dataChooseHandler={dataChooseHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

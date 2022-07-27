/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setCity, swapCities } from '../../store/filters-slice';
import Datepicker from '../datepicker/datepicker';
import InputCity from './input-city/input-city';
import InputDate from './input-date/input-date';
import './search.scss';

function Search() {
  const dispatch = useAppDispatch();

  const [isToDatePickerOpened, setIsToDatePickerOpened] = useState(false);
  const [isBackDatePickerOpened, setIsBackDatePickerOpened] = useState(false);

  const closePickers = () => {
    setIsToDatePickerOpened(false);
    setIsBackDatePickerOpened(false);
  }

  const cityInputHandler = (city: string, id: string) => {
    dispatch(setCity({ city, id }))
  }

  const swapCitiesClickHandler = () => {
    dispatch(swapCities());
  }

  return (
    <div className="search">
      <div className="field-wrapper">
        <InputCity title={'Откуда летим'} placeholder={'Откуда'} id={'cityFrom'} cityInputHandler={cityInputHandler} />
        <InputCity title={'Куда летим'} placeholder={'Куда'} id={'cityTo'} cityInputHandler={cityInputHandler} />

        <button className="change-btn" type="button" onClick={swapCitiesClickHandler}>
          <span className="visually-hidden">
            Поменять местами &apos;откуда&apos; и &apos;куда&apos;
          </span>
        </button>
      </div>

      <div className="field-wrapper">

        <InputDate title={'Когда летим'} id={'timeTo'} placeholder={'Когда'} isDatePickerOpened={isToDatePickerOpened} setIsDatePickerOpened={setIsToDatePickerOpened} closePickers={closePickers} />
        <InputDate title={'Когда летим обратно'} id={'timeBack'} placeholder={'Обратно'} isDatePickerOpened={isBackDatePickerOpened} setIsDatePickerOpened={setIsBackDatePickerOpened} closePickers={closePickers} />
      </div>
    </div>
  );
}

export default Search;

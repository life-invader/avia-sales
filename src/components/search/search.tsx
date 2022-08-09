import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { swapCities } from '../../store/filters-slice/filters-slice';
import { FilterCityType } from '../../store/filters-slice/types';
import { CitiesType } from '../../store/tickets-slice/types';
import InputCity from './input-city/input-city';
import InputDate from './input-date/input-date';
import './search.scss';

function Search() {
  const dispatch = useAppDispatch();

  const swapCitiesClickHandler = () => {
    dispatch(swapCities());
  };

  return (
    <div className="search">
      <div className="field-wrapper">
        <InputCity
          title={'Откуда летим'}
          placeholder={'Откуда'}
          id={'origins' as keyof CitiesType} // нужен для селектора доступных для выбора городов и в кач-ве id'шника
          filterId={'origin' as keyof FilterCityType} // нужен для селектора фильтров
        />
        <InputCity
          title={'Куда летим'}
          placeholder={'Куда'}
          id={'destinations' as keyof CitiesType} // нужен для селектора доступных для выбора городов и в кач-ве id'шника
          filterId={'destination' as keyof FilterCityType} // нужен для селектора фильтров
        />

        <button
          className="change-btn"
          type="button"
          onClick={swapCitiesClickHandler}
        >
          <span className="visually-hidden">
            Поменять местами &apos;откуда&apos; и &apos;куда&apos;
          </span>
        </button>
      </div>

      <div className="field-wrapper">
        <InputDate title={'Когда летим'} id={'timeTo'} placeholder={'Когда'} />
        <InputDate
          title={'Когда летим обратно'}
          id={'timeBack'}
          placeholder={'Обратно'}
        />
      </div>
    </div>
  );
}

export default Search;

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { setCity } from '../../../store/filters-slice/filters-slice';
import { selectCity } from '../../../store/filters-slice/selectors';
import { selectCities } from '../../../store/tickets-slice/selectors';
import { InputCityType } from './types';

function InputCity({ title, placeholder, id, filterId }: InputCityType) {
  const dispatch = useAppDispatch();

  const availableCities = useSelector(selectCities(id)); // доступные города (откуда и куда в зав. от компонента инпута)
  const chosenCity = useSelector(selectCity(filterId)); // введенный пользователем город

  const inputRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState(false);

  // список городов для выпадающего списка
  const citiesList = availableCities.filter((item) =>
    item.includes(chosenCity)
  );

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();

    if (!value) {
      dispatch(setCity({ city: '', id: filterId }));
      setIsOpened(false);
      return;
    }

    setIsOpened(true);
    dispatch(setCity({ city: value, id: filterId }));
  };

  const handleFormFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();

    if (!value) {
      setIsOpened(false);
      return;
    }

    if (citiesList.length) {
      setIsOpened(true);
    }
  };

  const handleOutsideFormClick = (evt: MouseEvent) => {
    if (inputRef.current && !evt.composedPath().includes(inputRef.current)) {
      setIsOpened(false);
    }
  };

  const itemClickHandler = (city: string) => () => {
    dispatch(setCity({ city, id: filterId }));
    setIsOpened(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideFormClick);

    return () => document.removeEventListener('click', handleOutsideFormClick);
  }, []);

  return (
    <div className="city-label-wrapper" ref={inputRef}>
      <label className="search-label">
        <span className="visually-hidden">{title}</span>
        <input
          className="search-input search-dest"
          type="text"
          placeholder={placeholder}
          form="tickets-form"
          maxLength={3}
          id={id}
          value={chosenCity}
          onInput={handleInputChange}
          onFocus={handleFormFocus}
        />
      </label>
      {isOpened && citiesList.length > 0 && (
        <ul className="search-options-list">
          {citiesList.map((city) => (
            <li
              key={city}
              className="search-options-item"
              onClick={itemClickHandler(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputCity;

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { setCity } from '../../../store/filters-slice/filters-slice';
import { selectCity } from '../../../store/filters-slice/selectors';
import { selectCities } from '../../../store/tickets-slice/selectors';
import { InputCityType } from './types';

function InputCity({ title, placeholder, id, filterId }: InputCityType) {
  const dispatch = useAppDispatch();
  const city = useSelector(selectCity(filterId));

  const [inputCity, setInputCity] = useState('');
  const [isListOpened, setIsListOpened] = useState(false);

  const availableCities = useSelector(selectCities(id)); // доступные города ('откуда' и 'куда' в зав. от компонента инпута)
  const inputRef = useRef<HTMLDivElement>(null);

  // список городов для выпадающего списка
  const citiesList = availableCities.filter((item) => item.includes(inputCity));

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();

    if (!value) {
      setInputCity(value);
      setIsListOpened(false);
      return;
    }

    setIsListOpened(true);
    setInputCity(value);
  };

  // Сабмит по клику Enter
  const onEnterKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      dispatch(setCity({ city: inputCity, id: filterId }));
    }
  };

  const handleOutsideFormClick = (evt: MouseEvent) => {
    if (inputRef.current && !evt.composedPath().includes(inputRef.current)) {
      setIsListOpened(false);
    }
  };

  // Сабмит по клику на элемент выпадающего списка
  const itemClickHandler = (city: string) => () => {
    dispatch(setCity({ city, id: filterId }));
    setInputCity(city);
    setIsListOpened(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideFormClick);

    return () => document.removeEventListener('click', handleOutsideFormClick);
  }, []);

  useEffect(() => {
    setInputCity(city);
  }, [city]);

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
          value={inputCity}
          onInput={handleInputChange}
          onKeyDown={onEnterKeyDown}
        />
      </label>
      {isListOpened && citiesList.length > 0 && (
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

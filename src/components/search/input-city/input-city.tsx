import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { setCity } from '../../../store/filters-slice/filters-slice';
import { selectCities } from '../../../store/tickets-slice/selectors';
import { debounce } from '../../../utils/debounce';
import { InputCityType } from './types';

function InputCity({ title, placeholder, id, filterId }: InputCityType) {
  const dispatch = useAppDispatch();

  const [inputCity, setInputCity] = useState('');
  const [isListOpened, setIsListOpened] = useState(false);

  const availableCities = useSelector(selectCities(id)); // доступные города ('откуда' и 'куда' в зав. от компонента инпута)
  const inputRef = useRef<HTMLDivElement>(null);

  // список городов для выпадающего списка
  const citiesList = availableCities.filter((item) => item.includes(inputCity));

  const debouncedSetCity = useCallback(debounce(dispatch, 2000), []);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();

    if (!value) {
      debouncedSetCity(setCity({ city: '', id: filterId }));
      setInputCity(value);
      setIsListOpened(false);
      return;
    }

    setIsListOpened(true);
    debouncedSetCity(setCity({ city: value, id: filterId }));
    setInputCity(value);
  };

  const handleOutsideFormClick = (evt: MouseEvent) => {
    if (inputRef.current && !evt.composedPath().includes(inputRef.current)) {
      setIsListOpened(false);
    }
  };

  const itemClickHandler = (city: string) => () => {
    dispatch(setCity({ city, id: filterId }));
    setInputCity(city);
    setIsListOpened(false);
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
          value={inputCity}
          onInput={handleInputChange}
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

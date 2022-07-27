/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { setCity } from '../../../store/filters-slice';
import { selectCities, selectCity } from '../../../store/selectors';

/* eslint-disable @typescript-eslint/no-unused-vars */
function InputCity({ title, placeholder, id, cityInputHandler }: any) {
  const dispatch = useAppDispatch();
  const cities = useSelector(selectCities(id));
  const city = useSelector(selectCity(id));

  const inputRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState(false);
  const [searchName, setSearchName] = useState('');

  const filteredCities = cities.filter((city) => city.toLocaleLowerCase().includes(city.toLocaleLowerCase()));

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();

    if (!value) {
      setSearchName(value);
      dispatch(setCity({ city: value, id }))
      setIsOpened(false);
      return;
    }

    setIsOpened(true);
    setSearchName(value);
    dispatch(setCity({ city: value, id }))
  };

  const handleFormFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();

    if (!value) {
      setIsOpened(false);
      return;
    }

    if (filteredCities.length) {
      setIsOpened(true);
    }
  };

  const handleOutsideFormClick = (evt: MouseEvent) => {
    if (inputRef.current && !evt.composedPath().includes(inputRef.current)) {
      setIsOpened(false);
    }
  };

  const itemClickHandler = (city: string) => () => {
    setSearchName(city)
    dispatch(setCity({ city, id }))
    setIsOpened(false);
  }

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
          id={id}
          value={city}
          onInput={handleInputChange}
          onFocus={handleFormFocus}
        />
      </label>
      {isOpened && filteredCities.length > 0 && (
        <ul className="search-options-list">
          {
            filteredCities.map((city) => (
              <li key={city} className="search-options-item" onClick={itemClickHandler(city)}>{city}</li>
            ))
          }
        </ul>
      )}
    </div>
  );
}

export default InputCity;

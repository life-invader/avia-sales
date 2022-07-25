import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
function InputCity({ title, placeholder }: any) {
  const [isOpened, setIsOpened] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.value.trim()) {
      setSearchName(evt.target.value.trim());
      setIsOpened(false);
      return;
    }

    setIsOpened(true);
    setSearchName(evt.target.value.trim());
  };

  return (
    <div className="city-label-wrapper">
      <label className="search-label">
        <span className="visually-hidden">{title}</span>
        <input
          className="search-input search-dest"
          type="text"
          placeholder={placeholder}
          form="tickets-form"
          onInput={handleInputChange}
        />
      </label>
      {isOpened && (
        <ul className="search-options-list">
          <li className="search-options-item">Вариант 1</li>
          <li className="search-options-item">Вариант 2</li>
        </ul>
      )}
    </div>
  );
}

export default InputCity;

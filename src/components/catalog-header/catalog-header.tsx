/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { SortOptions, SortOptionsTitle } from '../../constants/constants';
import './catalog-header.scss';

function CatalogHeader({ setActiveSort }: any) {
  const [activeButton, setActiveButton] = useState<typeof SortOptions[keyof typeof SortOptions]>(SortOptions.Cheap);

  const sortChangeHandler = (value: keyof typeof SortOptions) => () => {
    setActiveButton(SortOptions[value]);
    setActiveSort(SortOptions[value]);
  };

  return (
    <header className="catalog-header">
      <ul className="sort-buttons-list">
        {(Object.keys(SortOptions) as Array<keyof typeof SortOptions>).map((key) => (
          <li key={key} className="sort-buttons-item">
            <button
              className={`sort-button ${SortOptions[key] === activeButton ? 'sort-button-active' : ''
                }`}
              type="button"
              id={SortOptions[key]}
              onClick={sortChangeHandler(key)}
            >
              {SortOptionsTitle[SortOptions[key]]}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default CatalogHeader;

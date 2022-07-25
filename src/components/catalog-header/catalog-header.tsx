import { useState } from 'react';
import { SortOptions } from '../../constants/constants';
import './catalog-header.scss';

function CatalogHeader() {
  const [activeButton, setActiveButton] = useState(0);

  const sortChangeHandler = (id: number) => () => {
    setActiveButton(id);
  };

  return (
    <header className="catalog-header">
      <ul className="sort-buttons-list">
        {Object.entries(SortOptions).map(([key, title], index) => (
          <li key={key} className="sort-buttons-item">
            <button
              className={`sort-button ${
                index === activeButton ? 'sort-button-active' : ''
              }`}
              type="button"
              id={key}
              onClick={sortChangeHandler(index)}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default CatalogHeader;

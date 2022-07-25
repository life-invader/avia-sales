import { SortOptions, SortOptionsTitle } from '../../constants/constants';
import { CatalogHeaderType } from './types';
import './catalog-header.scss';

function CatalogHeader({ activeSort, setActiveSort }: CatalogHeaderType) {
  const sortChangeHandler = (key: keyof typeof SortOptions) => () => {
    setActiveSort(SortOptions[key]);
  };

  return (
    <header className="catalog-header">
      <ul className="sort-buttons-list">
        {(Object.keys(SortOptions) as Array<keyof typeof SortOptions>).map(
          (key) => (
            <li key={key} className="sort-buttons-item">
              <button
                className={`sort-button ${
                  SortOptions[key] === activeSort ? 'sort-button-active' : ''
                }`}
                type="button"
                id={SortOptions[key]}
                onClick={sortChangeHandler(key)}
              >
                {SortOptionsTitle[SortOptions[key]]}
              </button>
            </li>
          )
        )}
      </ul>
    </header>
  );
}

export default CatalogHeader;

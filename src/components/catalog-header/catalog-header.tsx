import './catalog-header.scss';

function CatalogHeader() {
  return (
    <header className="catalog-header">
      <ul className="sort-buttons-list">
        <li className="sort-buttons-item">
          <button
            className="sort-button first-button sort-button-active"
            type="button"
          >
            Самый дешевый
          </button>
        </li>

        <li className="sort-buttons-item">
          <button className="sort-button" type="button">
            Самый быстрый
          </button>
        </li>

        <li className="sort-buttons-item">
          <button className="sort-button last-button" type="button">
            Оптимальный
          </button>
        </li>
      </ul>
    </header>
  );
}

export default CatalogHeader;

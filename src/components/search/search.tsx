import './search.scss';

function Search() {
  return (
    <div className="search">
      <div className="field-wrapper">
        <label className="search-label">
          <span className="visually-hidden">Откуда летим</span>
          <input
            className="search-input"
            type="text"
            placeholder="Откуда"
            form="tickets-form"
          />
        </label>

        <label className="search-label">
          <span className="visually-hidden">Куда летим</span>
          <input
            className="search-input"
            type="text"
            placeholder="Куда"
            form="tickets-form"
          />
        </label>

        <button className="change-btn" type="button">
          <span className="visually-hidden">
            Поменять местами &apos;откуда&apos; и &apos;куда&apos;
          </span>
        </button>
      </div>

      <div className="field-wrapper">
        <label className="search-label">
          <span className="visually-hidden">Когда летим</span>
          <input
            className="search-input search-input-date"
            type="text"
            placeholder="Когда"
            form="tickets-form"
          />
        </label>

        <label className="search-label">
          <span className="visually-hidden">Когда летим обратно</span>
          <input
            className="search-input search-input-date"
            type="text"
            placeholder="Обратно"
            form="tickets-form"
          />
        </label>
      </div>
    </div>
  );
}

export default Search;

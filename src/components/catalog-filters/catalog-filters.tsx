import './catalog-filters.scss';

function CatalogFilters() {
  return (
    <div className="filters">
      <form className="filters-form" action="">
        <fieldset className="filter-group">
          <span className="title-wrapper">
            <legend className="filter-group-title">Количество пересадок</legend>
          </span>

          <ul className="transfer-list">
            <li className="transfer-list-item">
              <label className="filter-label transfer-label">
                <input
                  className="transfer-input visually-hidden"
                  type="checkbox"
                  name="transfer"
                  value="no-transfer"
                />
                Без пересадок
                <span className="transfer-custom-checkbox"></span>
              </label>
            </li>

            <li className="transfer-list-item">
              <label className="filter-label transfer-label">
                <input
                  className="transfer-input visually-hidden"
                  type="checkbox"
                  name="transfer"
                  value="1-transfer"
                />
                1 пересадка
                <span className="transfer-custom-checkbox"></span>
              </label>
            </li>

            <li className="transfer-list-item">
              <label className="filter-label transfer-label">
                <input
                  className="transfer-input visually-hidden"
                  type="checkbox"
                  name="transfer"
                  value="2-transfer"
                />
                2 пересадки
                <span className="transfer-custom-checkbox"></span>
              </label>
            </li>

            <li className="transfer-list-item">
              <label className="filter-label transfer-label">
                <input
                  className="transfer-input visually-hidden"
                  type="checkbox"
                  name="transfer"
                  value="3-transfer"
                />
                3 пересадки
                <span className="transfer-custom-checkbox"></span>
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset className="filter-group">
          <span className="title-wrapper">
            <legend className="filter-group-title">Компания</legend>
          </span>

          <ul className="company-list">
            <li className="company-list-item">
              <label className="filter-label company-label">
                <input
                  className="company-input visually-hidden"
                  type="radio"
                  name="company"
                  value="all"
                />
                Все
                <span className="company-custom-radio"></span>
              </label>
            </li>

            <li className="company-list-item">
              <label className="filter-label company-label">
                <input
                  className="company-input visually-hidden"
                  type="radio"
                  name="company"
                  value="s7-airlines"
                />
                S7 Airlines
                <span className="company-custom-radio"></span>
              </label>
            </li>

            <li className="company-list-item">
              <label className="filter-label company-label">
                <input
                  className="company-input visually-hidden"
                  type="radio"
                  name="company"
                  value="xiamen-air"
                />
                XiamenAir
                <span className="company-custom-radio"></span>
              </label>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  );
}

export default CatalogFilters;

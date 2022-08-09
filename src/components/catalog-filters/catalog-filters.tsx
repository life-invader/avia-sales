import { Transfers } from '../../constants/constants';
import { getTransferName } from '../../utils/ticket';
import { CatalogFiltersType, TransfersType } from './types';
import './catalog-filters.scss';

function CatalogFilters({
  companies,
  stops,
  checkedCompany,
  transfersFilterClickHandler,
  companiesFilterClickHandler,
}: CatalogFiltersType) {
  return (
    <div className="filters">
      <form className="filters-form" id="tickets-form">
        <fieldset className="filter-group">
          <span className="title-wrapper">
            <legend className="filter-group-title">Количество пересадок</legend>
          </span>

          <ul className="transfer-list">
            {Object.keys(stops)
              .sort()
              .map((stop) => (
                <li key={stop} className="transfer-list-item">
                  <label className="filter-label transfer-label" htmlFor={stop}>
                    <input
                      className="transfer-input visually-hidden"
                      type="checkbox"
                      name="transfer"
                      value={stop}
                      id={stop}
                      onChange={transfersFilterClickHandler}
                    />
                    {getTransferName(Transfers, stop as TransfersType)}
                    <span className="transfer-custom-checkbox"></span>
                  </label>
                </li>
              ))}
          </ul>
        </fieldset>

        <fieldset className="filter-group">
          <span className="title-wrapper">
            <legend className="filter-group-title">Компания</legend>
          </span>

          <ul className="company-list">
            <li className="company-list-item">
              <label className="filter-label company-label" htmlFor="all">
                <input
                  className="company-input visually-hidden"
                  type="radio"
                  name="company"
                  value="all"
                  id="all"
                  checked={checkedCompany === 'all'}
                  onChange={companiesFilterClickHandler}
                />
                Все
                <span className="company-custom-radio"></span>
              </label>
            </li>

            {companies.map((company) => (
              <li key={company.id} className="company-list-item">
                <label
                  className="filter-label company-label"
                  htmlFor={company.name}
                >
                  <input
                    className="company-input visually-hidden"
                    type="radio"
                    name="company"
                    value={company.name}
                    id={company.name}
                    checked={checkedCompany === company.name}
                    onChange={companiesFilterClickHandler}
                  />
                  {company.name}
                  <span className="company-custom-radio"></span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </form>
    </div>
  );
}

export default CatalogFilters;

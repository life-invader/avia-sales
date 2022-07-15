import { Transfers } from '../../constants/constants';
import './catalog-filters.scss';
import { CatalogFiltersType, StopsType, TransfersType } from './types';

const getTransferName = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

function CatalogFilters({ tickets, companies }: CatalogFiltersType) {
  const stops = tickets
    .map((item) => item.info.stops)
    .reduce((acc: StopsType, item) => {
      acc[`${item.length === 0 ? 'no' : item.length}-transfer`] = acc[
        `${item.length === 0 ? 'no' : item.length}-transfer`
      ]
        ? (acc[`${item.length === 0 ? 'no' : item.length}-transfer`] += 1)
        : 1;

      return acc;
    }, {});

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
                  <label className="filter-label transfer-label">
                    <input
                      className="transfer-input visually-hidden"
                      type="checkbox"
                      name="transfer"
                      value={stop}
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

            {companies.map((company) => (
              <li key={company.id} className="company-list-item">
                <label className="filter-label company-label">
                  <input
                    className="company-input visually-hidden"
                    type="radio"
                    name="company"
                    value={company.name}
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

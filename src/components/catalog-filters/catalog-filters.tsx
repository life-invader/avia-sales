/* eslint-disable no-console */
import { ICompany, ITicket } from '../../types/tickets';
import './catalog-filters.scss';

const Tranfers: { [key: string]: string } = {
  'no-transfer': 'Без пересадок',
  '1-transfer': '1 пересадки',
  '2-transfer': '2 пересадки',
  '3-transfer': '3 пересадки',
};

type CatalogFiltersType = {
  tickets: ITicket[];
  companies: ICompany[];
};

function CatalogFilters({ tickets, companies }: CatalogFiltersType) {
  const stops = tickets
    .map((item) => item.info.stops)
    .reduce((acc: { [key: string]: number }, item) => {
      acc[`${item.length === 0 ? 'no' : item.length}-transfer`] = acc[
        `${item.length === 0 ? 'no' : item.length}-transfer`
      ]
        ? (acc[`${item.length === 0 ? 'no' : item.length}-transfer`] += 1)
        : 1;

      return acc;
    }, {});
  console.log(stops);

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
              .map((stop: string) => (
                <li key={stop} className="transfer-list-item">
                  <label className="filter-label transfer-label">
                    <input
                      className="transfer-input visually-hidden"
                      type="checkbox"
                      name="transfer"
                      value={stop}
                    />
                    {Tranfers[stop]}
                    <span className="transfer-custom-checkbox"></span>
                  </label>
                </li>
              ))}

            {/* <li className="transfer-list-item">
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
            </li> */}
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

            {/* <li className="company-list-item">
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
            </li> */}
          </ul>
        </fieldset>
      </form>
    </div>
  );
}

export default CatalogFilters;

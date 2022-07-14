/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CatalogHeader from '../catalog-header/catalog-header';
import CatalogList from '../catalog-list/catalog-list';
import CatalogFilters from '../catalog-filters/catalog-filters';
import Search from '../search/search';
import { fetchData } from '../../store/tickets-slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { selectCompanies, selectTickets } from '../../store/selectors';
import './catalog.scss';

const TICKETS_SHOW_AMOUNT = 6;

function Catalog() {
  const dispatch = useAppDispatch();

  const tickets = useSelector(selectTickets);
  const companies = useSelector(selectCompanies);

  const showTickets = tickets.slice(0, TICKETS_SHOW_AMOUNT);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <section className="catalog">
      <h2 className="visually-hidden">Каталог</h2>
      <Search />

      <div className="catalog-wrapper">
        <div>
          <CatalogHeader />
          <CatalogList tickets={showTickets} companies={companies} />

          <button className="more-button" type="button">
            Показать еще 5 билетов
          </button>
        </div>
        <CatalogFilters />
      </div>
    </section>
  );
}

export default Catalog;

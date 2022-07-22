import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CatalogHeader from '../catalog-header/catalog-header';
import CatalogList from '../catalog-list/catalog-list';
import CatalogFilters from '../catalog-filters/catalog-filters';
import Search from '../search/search';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  selectCompanies,
  selectLoadingState,
  selectTickets,
} from '../../store/selectors';
import { fetchData } from '../../store/thunks';
import { TICKETS_SHOW_AMOUNT } from '../../constants/constants';
import './catalog.scss';
import ShowMoreButton from './show-more-button/show-more-button';

function Catalog() {
  const dispatch = useAppDispatch();

  const tickets = useSelector(selectTickets);
  const companies = useSelector(selectCompanies);
  const loadingState = useSelector(selectLoadingState);
  const { isError, isLoading } = loadingState;

  const [ticketsAmount, setTicketsAmount] = useState(TICKETS_SHOW_AMOUNT);
  const showTickets = tickets.slice(0, ticketsAmount);
  const remainingTickets = tickets.length - showTickets.length;

  const showMoreClickHandler = () => {
    setTicketsAmount(ticketsAmount + TICKETS_SHOW_AMOUNT);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <section className="catalog">
      <h2 className="visually-hidden">Каталог</h2>
      <Search />

      <div className="catalog-wrapper">
        <div className="catalog-inner">
          <CatalogHeader />
          <CatalogList
            tickets={showTickets}
            companies={companies}
            isLoading={isLoading}
            isError={isError}
          />

          <ShowMoreButton
            isError={isError}
            isLoading={isLoading}
            remainingTickets={remainingTickets}
            showMoreClickHandler={showMoreClickHandler}
          />
        </div>
        <CatalogFilters tickets={tickets} companies={companies} />
      </div>
    </section>
  );
}

export default Catalog;

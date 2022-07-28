import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CatalogHeader from '../catalog-header/catalog-header';
import CatalogList from '../catalog-list/catalog-list';
import CatalogFilters from '../catalog-filters/catalog-filters';
import Search from '../search/search';
import ShowMoreButton from './show-more-button/show-more-button';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  selectAvailableStops,
  selectCompanies,
  selectFilteredTickets,
  selectLoadingState,
} from '../../store/tickets-slice/selectors';
import { fetchData } from '../../store/thunks';
import { TICKETS_SHOW_AMOUNT } from '../../constants/constants';
import { SortOptionsType } from '../../types/tickets';
import {
  setCompany,
  setSort,
  setTransfers,
} from '../../store/filters-slice/filters-slice';
import './catalog.scss';
import { selectCompany, selectSort } from '../../store/filters-slice/selectors';

function Catalog() {
  const dispatch = useAppDispatch();

  const [ticketsAmount, setTicketsAmount] = useState(TICKETS_SHOW_AMOUNT);

  const selectedCompany = useSelector(selectCompany); // выбранная компания
  const tickets = useSelector(selectFilteredTickets); // все билеты
  const stops = useSelector(selectAvailableStops); // доступные опции пересадок
  const companies = useSelector(selectCompanies); // все компании
  const sort = useSelector(selectSort); // текущая сортировка
  const loadingState = useSelector(selectLoadingState); // состояние загрузки данных
  const { isError, isLoading } = loadingState;

  const showTickets = tickets.slice(0, ticketsAmount); // пачка билетов для показа (по 6 шт)
  const remainingTickets = tickets.length - showTickets.length; // кол-во оставшихся (не показанных на экране) билетов

  const showMoreClickHandler = () => {
    setTicketsAmount(ticketsAmount + TICKETS_SHOW_AMOUNT);
  };

  const transfersFilterClickHandler = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const transfer = evt.target.value;

    dispatch(setTransfers(transfer));
    setTicketsAmount(TICKETS_SHOW_AMOUNT);
  };

  const companiesFilterClickHandler = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketsAmount(TICKETS_SHOW_AMOUNT);
    dispatch(setCompany(evt.target.value));
  };

  const sortChangeHandler = (sort: SortOptionsType) => {
    dispatch(setSort(sort));
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
          <CatalogHeader activeSort={sort} setActiveSort={sortChangeHandler} />

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
        <CatalogFilters
          stops={stops}
          companies={companies}
          checkedCompany={selectedCompany}
          transfersFilterClickHandler={transfersFilterClickHandler}
          companiesFilterClickHandler={companiesFilterClickHandler}
        />
      </div>
    </section>
  );
}

export default Catalog;

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CatalogHeader from '../catalog-header/catalog-header';
import CatalogList from '../catalog-list/catalog-list';
import CatalogFilters from '../catalog-filters/catalog-filters';
import Search from '../search/search';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  selectCompanies,
  selectFilteredTickets,
  selectLoadingState,
  selectTickets,
} from '../../store/selectors';
import { fetchData } from '../../store/thunks';
import { SortFunctions, SortOptions, TICKETS_SHOW_AMOUNT } from '../../constants/constants';
import './catalog.scss';
import ShowMoreButton from './show-more-button/show-more-button';

type FiltersType = {
  transfers: string[];
  company: string;
}

function Catalog() {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<FiltersType>({ transfers: [], company: 'all' });
  const [activeSort, setActiveSort] = useState<typeof SortOptions[keyof typeof SortOptions]>(SortOptions.Cheap);

  const tickets = useSelector(selectTickets);
  const filteredTickets = SortFunctions[activeSort](useSelector(selectFilteredTickets(filters)));
  const companies = useSelector(selectCompanies);
  const loadingState = useSelector(selectLoadingState);
  const { isError, isLoading } = loadingState;

  const [ticketsAmount, setTicketsAmount] = useState(TICKETS_SHOW_AMOUNT);
  const showTickets = filteredTickets.slice(0, ticketsAmount);
  const remainingTickets = filteredTickets.length - showTickets.length;

  const showMoreClickHandler = () => {
    setTicketsAmount(ticketsAmount + TICKETS_SHOW_AMOUNT);
  };

  const transfersFilterClickHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const transfer = evt.target.value;
    const checked = evt.target.checked;

    if (checked) {
      setFilters({ ...filters, transfers: [...filters.transfers, transfer] });
    } else {
      setFilters({ ...filters, transfers: filters.transfers.filter((item) => item !== transfer) });
    }

    setTicketsAmount(TICKETS_SHOW_AMOUNT);
  };

  const companiesFilterClickHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, company: evt.target.value });
    setTicketsAmount(TICKETS_SHOW_AMOUNT);
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
          <CatalogHeader setActiveSort={setActiveSort} />
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
        <CatalogFilters tickets={tickets} companies={companies} transfersFilterClickHandler={transfersFilterClickHandler} companiesFilterClickHandler={companiesFilterClickHandler} />
      </div>
    </section>
  );
}

export default Catalog;

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
} from '../../store/selectors';
import { fetchData } from '../../store/thunks';
import { SortOptions, TICKETS_SHOW_AMOUNT } from '../../constants/constants';
import { FiltersType, SortOptionsType } from '../../types/tickets';
import { setCompany, setTransfers } from '../../store/filters-slice';
import './catalog.scss';

function Catalog() {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<FiltersType>({
    transfers: [],
    company: 'all',
    timeTo: '',
    timeBack: '',
  });
  const [activeSort, setActiveSort] = useState<SortOptionsType>(
    SortOptions.Cheap
  );
  const [ticketsAmount, setTicketsAmount] = useState(TICKETS_SHOW_AMOUNT);

  const tickets = useSelector(selectFilteredTickets(filters, activeSort));
  const stops = useSelector(selectAvailableStops);
  const companies = useSelector(selectCompanies);
  const loadingState = useSelector(selectLoadingState);
  const { isError, isLoading } = loadingState;

  const showTickets = tickets.slice(0, ticketsAmount);
  const remainingTickets = tickets.length - showTickets.length;

  const showMoreClickHandler = () => {
    setTicketsAmount(ticketsAmount + TICKETS_SHOW_AMOUNT);
  };

  const transfersFilterClickHandler = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const transfer = evt.target.value;
    const checked = evt.target.checked;

    if (checked) {
      setFilters({ ...filters, transfers: [...filters.transfers, transfer] });
    } else {
      setFilters({
        ...filters,
        transfers: filters.transfers.filter((item) => item !== transfer),
      });
    }

    dispatch(setTransfers(transfer));
    setTicketsAmount(TICKETS_SHOW_AMOUNT);
  };

  const companiesFilterClickHandler = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters({ ...filters, company: evt.target.value });
    setTicketsAmount(TICKETS_SHOW_AMOUNT);
    dispatch(setCompany(evt.target.value));
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
          <CatalogHeader
            activeSort={activeSort}
            setActiveSort={setActiveSort}
          />
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
          checkedCompany={filters.company}
          transfersFilterClickHandler={transfersFilterClickHandler}
          companiesFilterClickHandler={companiesFilterClickHandler}
        />
      </div>
    </section>
  );
}

export default Catalog;

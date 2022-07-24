import { TICKETS_SHOW_AMOUNT } from '../../constants/constants';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchData } from '../../store/thunks';
import { ICompany, ITicket } from '../../types/tickets';
import Error from '../error/error';
import Loader from '../loader/loader';
import Ticket from '../ticket/ticket';
import { CatalogListType } from './types';
import './catalog-list.scss';

function CatalogList({
  tickets,
  companies,
  isLoading = false,
  isError = false,
}: CatalogListType) {
  const dispatch = useAppDispatch();

  const getCompany = (ticket: ITicket) => {
    return (
      companies.find((item) => item.id === ticket.companyId) ||
      ({
        id: 'default',
        logo: 'default',
        name: 'default',
      } as ICompany)
    );
  };

  const tryAgainClickHandler = () => {
    dispatch(fetchData());
  };

  if (isError) {
    return <Error clickHandler={tryAgainClickHandler} />;
  }

  if (isLoading) {
    return (
      <>
        {new Array(TICKETS_SHOW_AMOUNT).fill(null).map((_, index) => (
          <Loader key={index} />
        ))}
      </>
    );
  }

  return (
    <ul className="catalog-list">
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} {...ticket} company={getCompany(ticket)} />
      ))}
    </ul>
  );
}

export default CatalogList;

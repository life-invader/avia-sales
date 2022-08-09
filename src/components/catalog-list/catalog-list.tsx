import { TICKETS_SHOW_AMOUNT } from '../../constants/constants';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchData } from '../../store/thunks';
import Error from '../error/error';
import Loader from '../loader/loader';
import NoTickets from '../no-tickets/no-tickets';
import Ticket from '../ticket/ticket';
import { CatalogListType } from './types';
import './catalog-list.scss';
import { getCompany } from '../../utils/ticket';

function CatalogList({
  tickets,
  companies,
  isLoading = false,
  isError = false,
}: CatalogListType) {
  const dispatch = useAppDispatch();

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

  if (tickets.length === 0) {
    return <NoTickets />;
  }

  return (
    <ul className="catalog-list">
      {tickets.map((ticket) => (
        <Ticket
          key={ticket.id}
          {...ticket}
          company={getCompany(ticket, companies)}
        />
      ))}
    </ul>
  );
}

export default CatalogList;

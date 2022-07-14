import Ticket from '../ticket/ticket';
import type { ICompany, ITicket } from '../../store/tickets-slice';
import './catalog-list.scss';

type CatalogListType = {
  tickets: ITicket[];
  companies: ICompany[];
};

function CatalogList({ tickets, companies }: CatalogListType) {
  const getCompany = (ticket: ITicket) => {
    return companies.find((item) => item.id === ticket.companyId);
  };

  return (
    <ul className="catalog-list">
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} {...ticket} company={getCompany(ticket)} />
      ))}
    </ul>
  );
}

export default CatalogList;

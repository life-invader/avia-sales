import { ICompany, ITicket } from '../../types/tickets';
import {
  formatDate,
  formatDuration,
  formatGuitarPrice,
  getLandingTime,
} from '../../utils/ticket';
import './ticket.scss';

type TicketType = {
  company: ICompany | undefined;
};

function Ticket({ price, info, company }: ITicket & TicketType) {
  const { origin, destination, dateStart, duration, stops } = info;
  const { logo, name } = company!;

  return (
    <li className="catalog-item">
      <div className="ticket">
        <header className="ticket-header">
          <p className="ticket-price">{formatGuitarPrice(price)} Р </p>
          <img
            src={require(`../../assets/img/${logo}`)}
            width="110"
            height="36"
            alt={`Логотип авиакомпании ${name}.`}
          />
        </header>
        <div className="ticket-info">
          <div className="ticket-info-wrapper">
            <p className="ticket-info-title">
              {origin} – {destination}
            </p>
            <p className="ticket-info-value">
              {formatDate(dateStart)} – {getLandingTime(dateStart, duration)}
            </p>
          </div>

          <div className="ticket-info-wrapper">
            <p className="ticket-info-title">В пути</p>
            <p className="ticket-info-value">{formatDuration(duration)}</p>
          </div>

          <div className="ticket-info-wrapper">
            {stops.length < 1 ? (
              <p className="ticket-info-title">Без пересадок</p>
            ) : (
              <>
                <p className="ticket-info-title">{stops.length} пересадки</p>
                <p className="ticket-info-value">{stops.join(', ')}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Ticket;

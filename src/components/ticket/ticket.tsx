import './ticket.scss';

function Ticket() {
  return (
    <li className="catalog-item">
      <div className="ticket">
        <header className="ticket-header">
          <p className="ticket-price">13 400 Р </p>
          <img
            src="images/s7-logo.png"
            width="110"
            height="36"
            alt="Логотип авиакомпании S7 Airlines."
          />
        </header>
        <div className="ticket-info">
          <div className="ticket-info-wrapper">
            <p className="ticket-info-title">MOW – HKT</p>
            <p className="ticket-info-value">10:45 – 08:00</p>
          </div>

          <div className="ticket-info-wrapper">
            <p className="ticket-info-title">В пути</p>
            <p className="ticket-info-value">21ч 15м</p>
          </div>

          <div className="ticket-info-wrapper">
            <p className="ticket-info-title">Без пересадок</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Ticket;

import Ticket from '../ticket/ticket';
import './catalog-list.scss';

function CatalogList() {
  return (
    <ul className="catalog-list">
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
    </ul>
  );
}

export default CatalogList;

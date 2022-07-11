import CatalogHeader from '../catalog-header/catalog-header';
import CatalogList from '../catalog-list/catalog-list';
import CatalogFilters from '../catalog-filters/catalog-filters';
import './catalog.scss';

function Catalog() {
  return (
    <section className="catalog">
      <h2 className="visually-hidden">Каталог</h2>

      <div className="catalog-wrapper">
        <CatalogHeader />
        <CatalogList />

        <button className="more-button" type="button">
          Показать еще 5 билетов
        </button>
      </div>

      <CatalogFilters />
    </section>
  );
}

export default Catalog;

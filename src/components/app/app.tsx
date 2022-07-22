import Catalog from '../catalog/catalog';
import Header from '../header/header';

function App() {
  return (
    <div className="container">
      <Header />

      <main className="main">
        <h1 className="visually-hidden">Поиск дешевых авиабилетов</h1>
        <Catalog />
      </main>
    </div>
  );
}

export default App;

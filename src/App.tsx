import Header from './components/Header';
import Filters from './components/Filters';
import FoodList from './components/FoodList';

export default function App() {
  return (
    <div className="mx-auto max-w-7xl border-2 px-4 sm:px-6 lg:px-8">
      <Header />
      <Filters />
      <FoodList />
    </div>
  );
}

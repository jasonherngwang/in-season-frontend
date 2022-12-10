import Header from './components/Header';
import FoodList from './components/FoodList';

export default function App() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-2">
      <Header />
      <FoodList />
    </div>
  );
}

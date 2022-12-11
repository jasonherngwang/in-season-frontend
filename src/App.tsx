import { useEffect, useState } from 'react';
import foodService from './services/foods';

import { User, Food, Basket, FilterInput } from './types';

import Header from './components/Header';
import Filters from './components/Filters';
import FoodList from './components/FoodList';

export default function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [basket, setBasket] = useState<Basket>();

  // Filter original data based on user search term and checkbox filters
  const [foodsToShow, setFoodsToShow] = useState<Food[]>([]);
  const [filters, setFilters] = useState<FilterInput>({
    filterTerm: '',
    showVegetable: true,
    showFruit: true,
    showOther: true,
  });

  const filterFoods = (
    foods: Food[],
    { filterTerm, showVegetable, showFruit, showOther }: FilterInput
  ) => {
    const matchesFilterTerm = (name: string) =>
      !filterTerm
        ? true
        : name.toLowerCase().includes(filterTerm.toLowerCase());

    const matchesCategory = (category: string) => {
      switch (category) {
        case 'vegetable':
          return showVegetable;
        case 'fruit':
          return showFruit;
        case 'other':
          return showOther;
        default:
          return false;
      }
    };

    return foods.filter(
      (food) => matchesFilterTerm(food.name) && matchesCategory(food.category)
    );
  };

  const sortAlphabetically = (foods: Food[]) =>
    [...foods].sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foods = await foodService.getAll();
        setFoods(foods);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const foodsToShow = filterFoods(foods, filters);
    setFoodsToShow(sortAlphabetically(foodsToShow));
  }, [foods, filters]);

  console.log(filters);

  return (
    <div className="mx-auto max-w-7xl border-2 px-4 pb-16 sm:px-6 lg:px-8">
      <Header />
      <Filters filters={filters} setFilters={setFilters} />
      <FoodList foods={foodsToShow} />
    </div>
  );
}

import { Food, FilterParams } from '../types';

import { useStateValue } from '../state';

import FoodListSection from './FoodListSection';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';

// Filter and sort array of Foods
const sortAlphabetically = (foods: Food[]) =>
  [...foods].sort((a, b) => a.name.localeCompare(b.name));

const filterFoods = (
  foods: Food[],
  { filterTerm, showVegetable, showFruit, showOther }: FilterParams
): Food[] => {
  const matchesFilterTerm = (name: string) =>
    !filterTerm ? true : name.toLowerCase().includes(filterTerm.toLowerCase());

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

  const filteredFoods = foods.filter(
    (food) => matchesFilterTerm(food.name) && matchesCategory(food.category)
  );

  return sortAlphabetically(filteredFoods);
};

// Retrieve month info
const now = new Date();
const month = now.getMonth(); // Data are already 0-indexed
const monthName = now.toLocaleString('default', { month: 'long' });

const next = new Date();
next.setMonth((month + 1) % 12);
const nextMonth = next.getMonth();
const nextMonthName = next.toLocaleString('default', { month: 'long' });

export default function FoodList() {
  const [{ foods, filterParams }, _] = useStateValue();

  // Partition foods by seasonality based on current and next month
  const foodsInSeason: Food[] = [];
  const foodsUpcoming: Food[] = [];
  const foodsOutOfSeason: Food[] = [];

  filterFoods(foods, filterParams).forEach((food) => {
    if (food.months.includes(month)) {
      foodsInSeason.push(food);
    } else if (food.months.includes(nextMonth)) {
      foodsUpcoming.push(food);
    } else {
      foodsOutOfSeason.push(food);
    }
  });

  return (
    <div>
      {/* Month navigation */}
      <div className="mt-14 sm:mt-20">
        <div className="flex items-center justify-center gap-x-10">
          <a href="">
            <ArrowLeftCircleIcon className="h-10 w-10 stroke-neutral-500 hover:fill-green-50 hover:stroke-green-700" />
          </a>
          <div className="text-center">
            <p className="font-bold tracking-wider text-green-700">
              IN SEASON NOW
            </p>
            <h1 className="mt-1 text-3xl font-medium text-neutral-600">
              {monthName}
            </h1>
          </div>
          <a href="">
            <ArrowRightCircleIcon className="h-10 w-10 stroke-neutral-500 hover:fill-green-50 hover:stroke-green-700" />
          </a>
        </div>
        <FoodListSection foods={foodsInSeason} />
      </div>
      {/* Other food sections */}
      <div className="mt-14 border-t-2 border-neutral-100 pt-10 sm:mt-20">
        <div className="text-center">
          <p className="font-bold tracking-wider text-amber-600">
            IN SEASON NEXT MONTH
          </p>
          <h1 className="mt-1 text-3xl font-medium text-neutral-600">
            {nextMonthName}
          </h1>
        </div>
        <FoodListSection foods={foodsUpcoming} />
      </div>
      <div className="mt-14 border-t-2 border-neutral-100 pt-10 sm:mt-20">
        <h1 className="text-center text-3xl font-medium text-neutral-500">
          Out of Season
        </h1>
        <FoodListSection foods={foodsOutOfSeason} />
      </div>
    </div>
  );
}

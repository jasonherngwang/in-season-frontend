import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Food, FilterParams } from '../types';
import { useStateValue } from '../state';
import FoodListSection from './FoodListSection';
import { sortFoodsAlphabetically } from '../utils/sortUtils';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

// Filter and sort array of Foods
const filterFoods = (
  foods: Food[],
  { filterTerm, showVegetable, showFruit, showOther }: FilterParams
): Food[] => {
  if (foods === undefined) return [];

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

  return sortFoodsAlphabetically(filteredFoods, false);
};

const getMonthInfo = (monthNum: number) => {
  // Normalization
  while (monthNum < 0) monthNum += 12;
  while (monthNum > 11) monthNum -= 12;

  const year = new Date().getFullYear();
  const month = new Date(year, monthNum);

  return {
    number: monthNum,
    name: month.toLocaleString('default', { month: 'long' }),
  };
};

export default function FoodList() {
  const [{ foods, filterParams }, _] = useStateValue();
  const [month, setMonth] = useState(getMonthInfo(new Date().getMonth()));
  const nextMonth = getMonthInfo(month.number + 1);

  const incrementMonth = () => {
    setMonth(getMonthInfo(month.number - 1));
  };

  const decrementMonth = () => {
    setMonth(getMonthInfo(month.number + 1));
  };

  // Partition foods by seasonality based on current and next month
  const foodsInSeason: Food[] = [];
  const foodsUpcoming: Food[] = [];
  const foodsOutOfSeason: Food[] = [];

  filterFoods(foods, filterParams).forEach((food) => {
    if (food.months[month.number]) {
      foodsInSeason.push(food);
    } else if (food.months[nextMonth.number]) {
      foodsUpcoming.push(food);
    } else {
      foodsOutOfSeason.push(food);
    }
  });

  return (
    <div>
      {/* Month navigation */}
      <div className="mt-10 sm:mt-20">
        <div className="grid grid-cols-12">
          {/* Empty div to occupy space for symmetry for Add Food button */}
          <div className="sm:col-span-3"></div>
          <div className="col-span-full flex items-center justify-center gap-x-4 sm:col-span-6 sm:gap-x-10">
            <button onClick={() => incrementMonth()}>
              <ArrowLeftCircleIcon className="h-10 w-10 stroke-neutral-500 hover:fill-green-50 hover:stroke-green-700" />
            </button>
            <div className="text-center">
              <p className="font-bold tracking-wider text-green-700">
                IN SEASON NOW
              </p>
              <h1 className="mt-1 text-2xl font-medium text-neutral-600 sm:text-3xl">
                {month.name}
              </h1>
            </div>
            <button onClick={() => decrementMonth()}>
              <ArrowRightCircleIcon className="h-10 w-10 stroke-neutral-500 hover:fill-green-50 hover:stroke-green-700" />
            </button>
          </div>
          <div className="fixed right-4 bottom-4 z-10 items-center justify-end sm:static sm:right-0 sm:bottom-0 sm:col-span-3 sm:flex">
            <Link
              to="/foods/add"
              className="group flex transform items-center rounded-full bg-green-600 px-3 py-2 shadow-md ring-2 ring-white hover:scale-105 sm:p-2 sm:shadow-none"
            >
              <PlusIcon className="h-5 w-5 text-white" />
              <span className="font-base mx-1 whitespace-nowrap font-medium text-white sm:text-sm">
                Add Food
              </span>
            </Link>
          </div>
        </div>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Click on any food to edit
        </p>
        <FoodListSection foods={foodsInSeason} />
      </div>
      {/* Other food sections */}
      <div className="mt-14 border-t-2 border-neutral-100 pt-10 sm:mt-20">
        <div className="text-center">
          <p className="font-bold tracking-wider text-amber-600">
            IN SEASON NEXT MONTH
          </p>
          <h1 className="mt-1 text-2xl font-medium text-neutral-600 sm:text-3xl">
            {nextMonth.name}
          </h1>
        </div>
        <FoodListSection foods={foodsUpcoming} />
      </div>
      <div className="mt-14 border-t-2 border-neutral-100 pt-10 sm:mt-20">
        <h1 className="text-center text-2xl font-medium text-neutral-500 sm:text-3xl">
          Out of Season
        </h1>
        <FoodListSection foods={foodsOutOfSeason} />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useStateValue, filterFoodsAction } from '../state';
import { FilterParams } from '../types';

export default function Filters() {
  const [, dispatch] = useStateValue();
  const [filterParams, setFilterParams] = useState<FilterParams>({
    filterTerm: '',
    showVegetable: true,
    showFruit: true,
    showOther: true,
  });

  const handleFilterTerm = (filterTerm: string) => {
    setFilterParams({
      ...filterParams,
      filterTerm,
    });
  };

  const handleToggleCategory = (category: string) => {
    switch (category) {
      case 'vegetable':
        setFilterParams({
          ...filterParams,
          showVegetable: !filterParams.showVegetable,
        });
        break;
      case 'fruit':
        setFilterParams({
          ...filterParams,
          showFruit: !filterParams.showFruit,
        });
        break;
      case 'other':
        setFilterParams({
          ...filterParams,
          showOther: !filterParams.showOther,
        });
        break;
      default:
        return false;
    }
  };

  useEffect(() => {
    dispatch(filterFoodsAction(filterParams));
  }, [dispatch, filterParams]);

  return (
    <div className="mt-6 mb-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {/* Search input */}
      <div className="col-span-1">
        <label
          htmlFor="filterTerm"
          className="block text-lg font-medium text-neutral-500"
        >
          Filter by name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="filterTerm"
            id="filterTerm"
            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
            placeholder="Food name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterTerm(e.target.value)
            }
          />
        </div>
      </div>
      {/* Checkboxes */}
      <div className="col-span-1 mt-2 flex flex-col sm:mt-0">
        <p className="block text-lg font-medium text-neutral-500">
          Select categories
        </p>
        <div className="mt-2 flex gap-4 sm:mt-4 sm:text-sm md:gap-12 md:text-base">
          <div className="flex items-center">
            <input
              id="checkVegetable"
              name="checkVegetable"
              type="checkbox"
              checked={filterParams.showVegetable}
              className="h-6 w-6 rounded border-neutral-300 text-green-600 focus:ring-green-600"
              onChange={() => handleToggleCategory('vegetable')}
            />
            <div className="ml-2">
              <label
                htmlFor="checkVegetable"
                className="font-medium text-neutral-600"
              >
                Vegetables
              </label>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="checkFruit"
              name="checkFruit"
              type="checkbox"
              checked={filterParams.showFruit}
              className="h-6 w-6 rounded border-neutral-300 text-green-600 focus:ring-green-600"
              onChange={() => handleToggleCategory('fruit')}
            />
            <div className="ml-2">
              <label
                htmlFor="checkFruit"
                className="font-medium text-neutral-600"
              >
                Fruits
              </label>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="checkOther"
              name="checkOther"
              type="checkbox"
              checked={filterParams.showOther}
              className="h-6 w-6 rounded border-neutral-300 text-green-600 focus:ring-green-600"
              onChange={() => handleToggleCategory('other')}
            />
            <div className="ml-2">
              <label
                htmlFor="checkOther"
                className="font-medium text-neutral-600"
              >
                Other
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

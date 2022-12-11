import { FilterInput } from '../types';

type FiltersProps = {
  filters: FilterInput;
  setFilters: (arg: FilterInput) => void;
};

export default function Filters({ filters, setFilters }: FiltersProps) {
  const handleFilterTerm = (filterTerm: string) => {
    setFilters({
      ...filters,
      filterTerm,
    });
  };

  const handleToggleVegetable = () => {
    setFilters({
      ...filters,
      showVegetable: !filters.showVegetable,
    });
  };

  const handleToggleFruit = () => {
    setFilters({
      ...filters,
      showFruit: !filters.showFruit,
    });
  };

  const handleToggleOther = () => {
    setFilters({
      ...filters,
      showOther: !filters.showOther,
    });
  };

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
              checked={filters.showVegetable}
              className="h-6 w-6 rounded border-neutral-300 text-green-600 focus:ring-green-600"
              onChange={handleToggleVegetable}
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
              checked={filters.showFruit}
              className="h-6 w-6 rounded border-neutral-300 text-green-600 focus:ring-green-600"
              onChange={handleToggleFruit}
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
              checked={filters.showOther}
              className="h-6 w-6 rounded border-neutral-300 text-green-600 focus:ring-green-600"
              onChange={handleToggleOther}
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

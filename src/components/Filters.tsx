import { useStateValue, setFiltersAction } from '../state';

export default function Filters() {
  const [{ filterParams }, dispatch] = useStateValue();

  const handleFilterTerm = (filterTerm: string) => {
    dispatch(
      setFiltersAction({
        ...filterParams,
        filterTerm,
      })
    );
  };

  const handleToggleCategory = (category: string) => {
    switch (category) {
      case 'vegetable':
        dispatch(
          setFiltersAction({
            ...filterParams,
            showVegetable: !filterParams.showVegetable,
          })
        );
        break;
      case 'fruit':
        dispatch(
          setFiltersAction({
            ...filterParams,
            showFruit: !filterParams.showFruit,
          })
        );
        break;
      case 'other':
        dispatch(
          setFiltersAction({
            ...filterParams,
            showOther: !filterParams.showOther,
          })
        );
        break;
      default:
        return false;
    }
  };

  return (
    <div className="my-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:my-10 sm:grid-cols-2">
      {/* Search input */}
      <div className="col-span-1">
        <label
          htmlFor="filterTerm"
          className="block font-medium text-neutral-500 sm:text-lg"
        >
          Filter by name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="filterTerm"
            id="filterTerm"
            className="block w-full rounded-md border-neutral-300 text-sm shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm sm:text-base"
            placeholder="Food name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterTerm(e.target.value)
            }
          />
        </div>
      </div>
      {/* Checkboxes */}
      <div className="col-span-1 mt-2 flex flex-col sm:mt-0">
        <p className="block font-medium text-neutral-500 sm:text-lg">
          Select categories
        </p>
        <div className="mt-2 flex gap-4 text-sm sm:mt-4 md:gap-12 md:text-base">
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

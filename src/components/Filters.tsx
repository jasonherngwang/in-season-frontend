export default function Filters() {
  return (
    <div className="mt-6 mb-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {/* Search input */}
      <div className="col-span-1">
        <label
          htmlFor="searchFilter"
          className="block text-lg font-medium text-gray-500"
        >
          Filter foods
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="searchFilter"
            id="searchFilter"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
            placeholder="Food name"
          />
        </div>
      </div>
      {/* Checkboxes */}
      <div className="col-span-1 flex flex-col">
        <p className="block text-lg font-medium text-gray-500">
          Select categories
        </p>
        <div className="mt-3 flex gap-4 sm:text-sm md:gap-12 md:text-base">
          <div className="flex items-center">
            <input
              id="checkVegetable"
              name="checkVegetable"
              type="checkbox"
              className="h-6 w-6 rounded border-gray-300 text-green-600 focus:ring-green-600"
            />
            <div className="ml-2">
              <label
                htmlFor="checkVegetable"
                className="font-medium text-gray-600"
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
              className="h-6 w-6 rounded border-gray-300 text-green-600 focus:ring-green-600"
            />
            <div className="ml-2">
              <label htmlFor="checkFruit" className="font-medium text-gray-600">
                Fruits
              </label>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="checkOther"
              name="checkOther"
              type="checkbox"
              className="h-6 w-6 rounded border-gray-300 text-green-600 focus:ring-green-600"
            />
            <div className="ml-2">
              <label htmlFor="checkOther" className="font-medium text-gray-600">
                Other
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../state';
import foodService from '../services/foodService';
import dateUtils from '../utils/dateUtils';

// import { Field, Formik, Form } from 'formik';
import { PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function EditFood({ foodId }: { foodId: any }) {
  const [{ foods }, dispatch] = useStateValue();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [months, setMonths] = useState(dateUtils.defaultSeasonality);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const toggleMonth = (monthNum: string, checked: boolean) => {
    setMonths({
      ...months,
      [monthNum]: checked,
    });
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const food = foods.find((f) => f.id === foodId);
        if (food) {
          setName(food.name);
          setCategory(food.category);
          setDescription(food.description || '');
          setMonths({ ...months, ...food.months });
          setImageUrl(food.imageUrl || '');
        }
      } catch (error) {
        console.error(error);
      }
    };
    void fetchFood();
  }, [foods, dispatch]);

  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center md:mt-20">
      <h2 className="text-3xl font-bold text-neutral-700">Edit Food</h2>
      <div className="mt-4 grid w-full gap-8 rounded-md bg-neutral-50 px-8 pt-8 pb-10 shadow-lg sm:grid-cols-5">
        {/* Image Upload */}
        <div className="max-w-[256px] sm:col-span-2">
          <h3 className="text-md font-medium text-neutral-500">Upload image</h3>
          <div className="mt-1 flex aspect-square w-full items-center justify-center rounded-md border-2 bg-white object-cover object-center text-center">
            <div className="flex flex-col items-center">
              <PhotoIcon className="h-16 w-16 stroke-neutral-400" />
              <p className="text-sm text-neutral-500">JPG, PNG, GIF, or WEBP</p>
              <p className="text-sm text-neutral-500">Max size 5 MB</p>
            </div>
          </div>
          <div className="mt-4 flex w-full items-center justify-center">
            <button
              className="font-base flex justify-center rounded-md border-transparent bg-green-600 py-2 px-3 text-sm tracking-wider text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-700"
              type="submit"
            >
              <ArrowUpTrayIcon className="h-4 w-4" />
              <span className="ml-2">Select file</span>
            </button>
          </div>
        </div>
        {/* Form */}
        <div className="sm:col-span-3">
          <form onSubmit={() => {}}>
            <div>
              <label
                htmlFor="name"
                className="text-md block font-medium text-neutral-500"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  required
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                  onChange={(e) => {}}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="category"
                className="text-md block font-medium text-neutral-500"
              >
                Category
              </label>
              <div className="mt-1">
                <select
                  name="category"
                  id="category"
                  value={category}
                  required
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                  onChange={(e) => {}}
                >
                  <option>Vegetable</option>
                  <option>Fruit</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="text-md block font-medium text-neutral-500"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={description}
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                  placeholder="Your notes on selecting and cooking with this ingredient"
                  onChange={(e) => {}}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="month"
                className="text-md block font-medium text-neutral-500"
              >
                Months in Season
              </label>
              <div className="mt-1 grid grid-cols-4 gap-y-2">
                {Object.keys(dateUtils.defaultSeasonality).map((m) => {
                  const { shortName } = dateUtils.monthNumToAbbr(
                    parseInt(m, 10)
                  );

                  return (
                    <div key={m} className="flex items-center">
                      <input
                        id={shortName}
                        name={shortName}
                        type="checkbox"
                        checked={months[m]}
                        className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                        onChange={() => {
                          toggleMonth(m, !months[m]);
                        }}
                      />
                      <div className="ml-2">
                        <label
                          htmlFor={shortName}
                          className="text-sm font-medium text-neutral-600"
                        >
                          {shortName}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {error && (
              <div className="mt-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="mt-8">
              <button
                className="flex w-full justify-center rounded-md border-transparent bg-green-600 py-3 px-4 font-medium tracking-wider text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-700"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

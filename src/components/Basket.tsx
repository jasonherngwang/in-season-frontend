import { useState } from 'react';
import { useStateValue } from '../state';

import { Switch } from '@headlessui/react';

export default function Basket() {
  const [{ foods, filterParams }, _] = useStateValue();
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="mx-auto mt-6 flex max-w-md flex-col items-center md:mt-20">
      <h2 className="text-2xl font-bold text-neutral-700 md:text-3xl">
        Basket
      </h2>
      <ul className=" mt-4 w-full border-b border-neutral-200">
        <li className="mt-3 mb-1 flex justify-end">
          <h3 className="ml-4">Purchased</h3>
        </li>
        {foods.map((food) => (
          <li className="flex items-center border-t border-neutral-200">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="my-2 aspect-square h-16 w-16 object-contain"
            />
            <div className="ml-4 text-xl">{food.name}</div>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? 'bg-green-600' : 'bg-gray-200'
              } relative ml-auto inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Food } from '../types';

import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const formatName = (name: string) => {
  return name
    .split('_')
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(' ');
};

export default function FoodCard({ food }: { food: Food }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg shadow ">
      <Link to={`/foods/${food.id}/edit`}>
        <div className="group relative hover:opacity-80">
          <PencilSquareIcon className="invisible absolute top-1 right-1 h-7 w-7 text-neutral-500 group-hover:visible" />
          <div className="aspect-square">
            {/* <LazyImage src={food.imageUrl} alt={food.imageUrl} /> */}
            <img
              src={`/${food.imageUrl}`}
              className="w-full object-cover object-center sm:h-full sm:w-full"
            />
          </div>
          <div className="px-2 pt-1 text-center ">
            <h3 className="text-lg font-medium text-neutral-700">
              {formatName(food.name)}
            </h3>
            <h4 className="text-sm italic text-neutral-400">
              {formatName(food.category)}
            </h4>
          </div>
        </div>
      </Link>
      <div className="mt-auto">
        <a
          href={'#'}
          className="m-1 mt-2 flex items-center justify-center rounded border border-transparent bg-neutral-100 py-2 px-2 text-sm font-medium text-neutral-800 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Add to Basket
        </a>
      </div>
    </div>
  );
}

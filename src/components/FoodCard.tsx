import { Link } from 'react-router-dom';
import { useStateValue, setBasketAction } from '../state';

import { Food } from '../types';
import basketService from '../services/basketService';
import userService from '../services/userService';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const capitalize = (name: string) => {
  if (!name) {
    return name;
  }
  if (name.length === 1) {
    return name.toUpperCase();
  }
  return name[0].toUpperCase() + name.slice(1);
};

export default function FoodCard({ food }: { food: Food }) {
  const [, dispatch] = useStateValue();

  const addToBasket = async (foodId: string) => {
    await basketService.addFood(foodId);
    const user = await userService.getUserData();
    dispatch(setBasketAction(user.basket));
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg shadow ">
      <Link to={`/foods/${food.id}/edit`}>
        <div className="group relative hover:opacity-80">
          <PencilSquareIcon className="invisible absolute top-1 right-1 h-7 w-7 text-neutral-500 group-hover:visible" />
          <div className="aspect-square">
            <img
              src={`${food.imageUrl}`}
              className="w-full object-cover object-center sm:h-full sm:w-full"
            />
          </div>
          <div className="px-2 pt-1 text-center ">
            <h3 className="text-lg font-medium text-neutral-700">
              {food.name}
            </h3>
            <h4 className="text-sm italic text-neutral-400">
              {capitalize(food.category)}
            </h4>
          </div>
        </div>
      </Link>
      <div className="mt-auto">
        <button
          className="m-1 mt-2 flex items-center justify-center rounded border border-transparent bg-neutral-100 py-2 px-2 text-sm font-medium text-neutral-800 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
          onClick={() => addToBasket(food.id)}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

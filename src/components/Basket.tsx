import { setBasketAction, useStateValue } from '../state';
import basketService from '../services/basketService';
import userService from '../services/userService';
import { Switch } from '@headlessui/react';

export default function Basket() {
  const [{ basket }, dispatch] = useStateValue();

  const toggleAcquiredState = async (
    basketFoodId: string,
    newAcquiredState: boolean
  ) => {
    try {
      const updatedBasket = await basketService.toggleAcquired(
        basketFoodId,
        newAcquiredState
      );
      console.log(newAcquiredState);
      dispatch(setBasketAction(updatedBasket));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-6 flex max-w-md flex-col items-center md:mt-20">
      <h2 className="text-2xl font-bold text-neutral-700 md:text-3xl">
        Basket
      </h2>
      <ul className=" mt-4 w-full border-b border-neutral-200">
        <li className="mt-3 mb-1 flex justify-end">
          <h3 className="ml-4">Acquired</h3>
        </li>
        {basket.map((item) => (
          <li
            key={item.id}
            className="flex items-center border-t border-neutral-200"
          >
            <img
              src={item.food.imageUrl}
              alt={item.food.name}
              className="my-2 aspect-square h-16 w-16 object-contain"
            />
            <div className="ml-4 text-xl">{item.food.name}</div>
            <Switch
              checked={item.acquired}
              onChange={() => toggleAcquiredState(item.id, !item.acquired)}
              className={`${
                item.acquired ? 'bg-green-600' : 'bg-gray-200'
              } relative ml-auto inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  item.acquired ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </li>
        ))}
      </ul>
    </div>
  );
}

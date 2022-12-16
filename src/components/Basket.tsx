import { setBasketAction, useStateValue } from '../state';
import basketService from '../services/basketService';
import { sortBasketFoods } from '../utils/sortUtils';
import { Switch } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';

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

  const deleteFromBasket = async (foodId: string) => {
    try {
      const updatedBasket = await basketService.deleteFood(foodId);
      dispatch(setBasketAction(updatedBasket));
    } catch (error) {
      console.error(error);
    }
  };

  const basketItems = sortBasketFoods(basket, false);

  return (
    <div className="mx-auto mt-6 flex max-w-md flex-col items-center md:mt-20">
      <h2 className="text-2xl font-bold text-neutral-700 md:text-3xl">
        Basket
      </h2>
      {basket.length === 0 ? (
        <div className="text-center">
          <h2 className="mt-8 text-2xl text-neutral-400">
            No foods were found
          </h2>
        </div>
      ) : (
        <table className="mt-4 w-full divide-y divide-neutral-300 border-b border-b-neutral-300">
          <thead className="text-neutral-700">
            <tr>
              <th></th>
              <th></th>
              <th className="text-right font-normal">Acquired</th>
              <th className="text-right font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {basketItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.food.imageUrl}
                    alt={item.food.name}
                    className="my-2 aspect-square h-16 w-16 object-contain"
                  />
                </td>
                <td>
                  <div className="ml-4 text-lg text-neutral-800 sm:text-xl">
                    {item.food.name}
                  </div>
                </td>
                <td className="text-right">
                  <Switch
                    checked={item.acquired}
                    onChange={() =>
                      toggleAcquiredState(item.id, !item.acquired)
                    }
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
                </td>
                <td className="text-right">
                  <button onClick={() => deleteFromBasket(item.food.id)}>
                    <XCircleIcon className="mt-1 ml-3 h-7 w-7 stroke-neutral-700 hover:fill-red-100 hover:stroke-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

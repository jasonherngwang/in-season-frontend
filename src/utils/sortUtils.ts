import { Food, BasketFood } from '../types';

export const sortFoodsAlphabetically = (
  foods: Food[],
  reverse: boolean = false
) => {
  const sorted = [...foods].sort((a, b) => b.name.localeCompare(a.name));

  return reverse ? sorted : sorted.reverse();
};

export const sortBasketFoods = (
  foods: BasketFood[],
  reverse: boolean = false
) => {
  const sorted = [...foods].sort(
    (a, b) =>
      Number(b.acquired) - Number(a.acquired) ||
      b.food.name.localeCompare(a.food.name)
  );

  return reverse ? sorted : sorted.reverse();
};

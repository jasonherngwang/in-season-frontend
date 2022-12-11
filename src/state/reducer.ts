import { State } from './state';
import { Food, FilterParams, User } from '../types';

export type Action =
  | {
      type: 'SET_FOODS';
      payload: Food[];
    }
  | {
      type: 'FILTER_FOODS';
      payload: FilterParams;
    }
  | { type: 'SET_USER'; payload: User };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // Initialize both foods and foodsToShow
    case 'SET_FOODS':
      return {
        ...state,
        foods: action.payload,
        foodsToShow: sortAlphabetically(action.payload),
      };
    case 'FILTER_FOODS':
      return {
        ...state,
        foodsToShow: filterFoods(state.foods, action.payload),
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const setFoodsAction = (foods: Food[]): Action => {
  return {
    type: 'SET_FOODS',
    payload: foods,
  };
};

export const filterFoodsAction = (filterParams: FilterParams): Action => {
  return {
    type: 'FILTER_FOODS',
    payload: filterParams,
  };
};

export const setUserAction = (user: User): Action => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

const sortAlphabetically = (foods: Food[]) =>
  [...foods].sort((a, b) => a.name.localeCompare(b.name));

const filterFoods = (
  foods: Food[],
  { filterTerm, showVegetable, showFruit, showOther }: FilterParams
): Food[] => {
  const matchesFilterTerm = (name: string) =>
    !filterTerm ? true : name.toLowerCase().includes(filterTerm.toLowerCase());

  const matchesCategory = (category: string) => {
    switch (category) {
      case 'vegetable':
        return showVegetable;
      case 'fruit':
        return showFruit;
      case 'other':
        return showOther;
      default:
        return false;
    }
  };

  const filteredFoods = foods.filter(
    (food) => matchesFilterTerm(food.name) && matchesCategory(food.category)
  );

  return sortAlphabetically(filteredFoods);
};

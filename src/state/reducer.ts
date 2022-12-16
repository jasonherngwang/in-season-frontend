import { State } from './state';
import { Food, FilterParams, BasketFood, User } from '../types';

export const initialState: State = {
  foods: [],
  basket: [],
  filterParams: {
    filterTerm: '',
    showVegetable: true,
    showFruit: true,
    showOther: true,
  },
  user: null,
};

export type Action =
  | {
      type: 'SET_FOODS';
      payload: Food[];
    }
  | { type: 'SET_FILTERS'; payload: FilterParams }
  | { type: 'SET_BASKET'; payload: BasketFood[] }
  | { type: 'SET_USER'; payload: User }
  | { type: 'RESET_STATE'; payload: null };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FOODS':
      return {
        ...state,
        foods: action.payload,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filterParams: action.payload,
      };
    case 'SET_BASKET':
      return {
        ...state,
        basket: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'RESET_STATE':
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

// Action creators
export const setFoodsAction = (foods: Food[]): Action => {
  return {
    type: 'SET_FOODS',
    payload: foods,
  };
};

export const setFiltersAction = (filterParams: FilterParams): Action => {
  return {
    type: 'SET_FILTERS',
    payload: filterParams,
  };
};

export const setBasketAction = (basket: BasketFood[]): Action => {
  return {
    type: 'SET_BASKET',
    payload: basket,
  };
};

export const setUserAction = (user: User): Action => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const resetStateAction = (): Action => {
  return {
    type: 'RESET_STATE',
    payload: null,
  };
};

import { State } from './state';
import { Food, FilterParams, User } from '../types';

export type Action =
  | {
      type: 'SET_FOODS';
      payload: Food[];
    }
  | { type: 'SET_FILTERS'; payload: FilterParams }
  | { type: 'SET_USER'; payload: User };

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

export const setFiltersAction = (filterParams: FilterParams): Action => {
  return {
    type: 'SET_FILTERS',
    payload: filterParams,
  };
};

export const setUserAction = (user: User): Action => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

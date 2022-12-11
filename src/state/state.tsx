import React, { createContext, useContext, useReducer } from 'react';
import { Food, FilterParams, User } from '../types';
import { Action } from './reducer';

export type State = {
  foods: Food[];
  filterParams: FilterParams;
  user: User;
};

const initialState: State = {
  foods: [],
  filterParams: {
    filterTerm: '',
    showVegetable: true,
    showFruit: true,
    showOther: true,
  },
  user: null,
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
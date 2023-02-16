import React, { useReducer, createContext } from 'react';
import { StoreContextType, State, Action } from './types';
import { ledger } from '../reducers/ledger';
import { useActions } from '../actions/actions';
import { initialState } from '../state/initialState';
import { applyMiddleware } from '../middleware/middleware';

const combineReducers = (slices: any) => (state: State, action: Action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );

//use combineReducers just like redux so each reducer gets a slice of the state
const rootReducer = combineReducers({
  ledger,
});

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

export const StoreProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const enhancedDispatch = applyMiddleware(dispatch);
  const actions = useActions(enhancedDispatch);

  return (
    <StoreContext.Provider value={{ state, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

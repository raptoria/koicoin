import { Reducer } from 'react';
import { State, Action, ActionTypes } from '../store/types';

export const ledger: Reducer<State['ledger'], Action> = (state, action) => {
  switch (
    action.type
    /*     case ActionTypes.editOrder:
      return { ...state, ...action.payload };
    case ActionTypes.failedOrder:
      return { ...state, error: action.payload.error };
    case ActionTypes.receiveOrder:
      return { ...state, error: null }; */
  ) {
  }
  return state;
};

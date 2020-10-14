import { Reducer } from 'react';
import { State, Action, ActionTypes } from '../store/types';

export const ledger: Reducer<State['ledger'], Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.updateLedger:
      return { ...state, ...action.payload };
    case ActionTypes.receiveTransactionsForAddress:
      return { ...state, ...action.payload };
    case ActionTypes.receiveError:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

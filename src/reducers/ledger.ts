import { Reducer } from 'react';
import { emptyState } from '../state/ledger';
import { State, Action, ActionTypes } from '../store/types';

export const ledger: Reducer<State['ledger'], Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.updateLedger:
      console.log('updating ledger', action.payload.address);
      return { ...state, ...action.payload };
    case ActionTypes.getTransactionsForAddress:
      return { ...state, ...action.payload, loading: true };
    case ActionTypes.receiveTransactionsForAddress:
      console.log('receiving transaction');
      return { ...state, ...action.payload, loading: false, error: null };
    case ActionTypes.receiveError:
      return { ...state, ...action.payload, loading: false };
    case ActionTypes.sendCoins:
      return { ...state, loading: true };
    case ActionTypes.logout:
      console.log('clearing state');
      return {
        ...state,
        ...emptyState,
      };
    default:
      return state;
  }
};

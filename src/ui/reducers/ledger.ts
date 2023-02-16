import { Reducer } from 'react';
import { emptyState } from '@/ui/state/ledger';
import { State, Action, ActionTypes } from '@/ui/store/types';

export const ledger: Reducer<State['ledger'], Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.updateLedger:
      return { ...state, ...action.payload };
    case ActionTypes.getTransactionsForAddress:
      return { ...state, ...action.payload, loading: true };
    case ActionTypes.receiveTransactionsForAddress:
      return { ...state, ...action.payload, loading: false, error: null };
    case ActionTypes.receiveError:
      return { ...state, ...action.payload, loading: false };
    case ActionTypes.sendCoins:
      return { ...state, loading: true };
    case ActionTypes.logout:
      return {
        ...state,
        ...emptyState,
      };
    default:
      return state;
  }
};

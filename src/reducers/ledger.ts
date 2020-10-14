import { Reducer } from 'react';
import { State, Action, ActionTypes } from '../store/types';

export const ledger: Reducer<State['ledger'], Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.updateLedger:
      return { ...state, ...action.payload };
    case ActionTypes.getTransactionsForAddress:
      return { ...state, ...action.payload, loading: true };
    case ActionTypes.receiveTransactionsForAddress:
      console.log('receiving transaction');
      return { ...state, ...action.payload, loading: false, error: null };
    case ActionTypes.receiveError:
      return { ...state, ...action.payload, loading: false };
    case ActionTypes.logout:
      console.log('clearing state');
      return {
        ...state,
        balance: null,
        transactions: null,
        fields: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

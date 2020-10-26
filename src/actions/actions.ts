import { ActionTypes, Action, State, SendJobcoinFields } from '../store/types';
import { Dispatch } from 'react';

export const updateLedger = (payload: State['ledger']): Action => {
  return {
    type: ActionTypes.updateLedger,
    payload,
  };
};

export const getTransactionsForAddress = (payload: State['ledger']): Action => {
  return {
    type: ActionTypes.getTransactionsForAddress,
    payload,
  };
};

export const receiveTransactionsForAddress = (
  payload: State['ledger']
): Action => {
  return {
    type: ActionTypes.receiveTransactionsForAddress,
    payload,
  };
};

export const sendCoins = (payload: SendJobcoinFields): Action => {
  return {
    type: ActionTypes.sendCoins,
    payload,
  };
};

export const receiveError = (payload: State['ledger']): Action => {
  return {
    type: ActionTypes.receiveError,
    payload,
  };
};

export const logout = (): Action => {
  return {
    type: ActionTypes.logout,
  };
};

export const updateTheme = (payload: State['theme']): Action => {
  return {
    type: ActionTypes.updateTheme,
    payload,
  };
};

//synonymous with bindActionCreators in mapDispatchToProps, 2nd arg of connect
export const useActions = (dispatch: Dispatch<Action>) => ({
  updateLedger: (payload: State['ledger']): void =>
    dispatch(updateLedger(payload)),
  getTransactionsForAddress: (payload: State['ledger']): void =>
    dispatch(getTransactionsForAddress(payload)),
  receiveTransactionsForAddress: (payload: State['ledger']): void =>
    dispatch(receiveTransactionsForAddress(payload)),
  sendCoins: (payload: SendJobcoinFields): void => dispatch(sendCoins(payload)),
  receiveError: (payload: State['ledger']): void =>
    dispatch(receiveError(payload)),
  logout: (): void => dispatch(logout()),
  updateTheme: (payload: State['theme']): void =>
    dispatch(updateTheme(payload)),
});

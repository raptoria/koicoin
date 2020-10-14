import { ActionTypes, Action, State, LoginFields } from '../store/types';
import { Dispatch } from 'react';

export const updateLedger = (payload: State['ledger']): Action => {
  return {
    type: ActionTypes.updateLedger,
    payload,
  };
};

export const getTransactionsForAddress = (
  payload: Partial<LoginFields>
): Action => {
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

export const sendCoins = (payload: State['ledger']): Action => {
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

//synonymous with bindActionCreators in mapDispatchToProps, 2nd arg of connect
export const useActions = (dispatch: Dispatch<Action>) => ({
  updateLedger: (payload: State['ledger']): void =>
    dispatch(updateLedger(payload)),
  getTransactionsForAddress: (payload: Partial<LoginFields>): void =>
    dispatch(getTransactionsForAddress(payload)),
  receiveTransactionsForAddress: (payload: State['ledger']): void =>
    dispatch(receiveTransactionsForAddress(payload)),
  sendCoins: (payload: State['ledger']): void => dispatch(sendCoins(payload)),
  receiveError: (payload: State['ledger']): void =>
    dispatch(receiveError(payload)),
  logout: (): void => dispatch(logout()),
});

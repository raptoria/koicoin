import {
  ActionTypes,
  Action,
  State,
  SendKoicoinFields,
} from '@/ui/store/types';
import { Dispatch } from 'react';

export const updateLedger = (payload: State['ledger']): Action => {
  try {
    localStorage.setItem('address', payload.address || 'undefined');
  } catch (error) {
    console.log('error accessing localStorage');
  }

  return {
    type: ActionTypes.updateLedger,
    payload,
  };
};

export const getTransactionsForAddress = (payload: State['ledger']): Action => {
  let coinAddress = payload.address;

  try {
    if (!coinAddress) {
      coinAddress = localStorage.getItem('address') || 'undefined';
    }
  } catch (error) {
    console.log('error accessing localStorage');
  }

  return {
    type: ActionTypes.getTransactionsForAddress,
    payload: { ...payload, address: coinAddress },
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

export const sendCoins = (payload: SendKoicoinFields): Action => {
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
  sendCoins: (payload: SendKoicoinFields): void => dispatch(sendCoins(payload)),
  receiveError: (payload: State['ledger']): void =>
    dispatch(receiveError(payload)),
  logout: (): void => dispatch(logout()),
  updateTheme: (payload: State['theme']): void =>
    dispatch(updateTheme(payload)),
});

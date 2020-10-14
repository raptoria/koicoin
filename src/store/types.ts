import {
  getTransactionsForAddress,
  receiveTransactionsForAddress,
  sendCoins,
  updateLedger,
  receiveError,
  logout,
} from '../actions/actions';

export interface Transaction {
  timestamp: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
}

export interface LoginFields {
  address: string;
}

export interface SendJobcoinFields {
  fromAddress: string;
  amount: string;
  toAddress: string;
}

export interface ApiResponse {
  error: string;
}

export interface Ledger {
  address?: string | null;
  balance?: string | null;
  transactions?: Transaction[] | null;
  error?: string | null;
  loading?: boolean;
}

export interface State {
  ledger: Ledger;
  [index: string]: Ledger;
}

export const enum Pages {
  login = '/login',
  dashboard = '/dashboard',
}

export const enum ActionTypes {
  updateLedger = 'UPDATE_LEDGER',
  getTransactionsForAddress = 'TRANSACTIONS_FOR_ADDRESS',
  receiveTransactionsForAddress = 'RECEIVE_TRANSACTIONS_FOR_ADDRESS',
  sendCoins = 'SEND_COINS',
  receiveError = 'RECEIVE_ERROR',
  logout = 'LOGOUT',
}

export type Action =
  | { type: ActionTypes.updateLedger; payload: State['ledger'] }
  | {
      type: ActionTypes.getTransactionsForAddress;
      payload: State['ledger'];
    }
  | {
      type: ActionTypes.receiveTransactionsForAddress;
      payload: State['ledger'];
    }
  | { type: ActionTypes.sendCoins; payload: SendJobcoinFields }
  | { type: ActionTypes.receiveError; payload: State['ledger'] }
  | { type: ActionTypes.logout };

export interface Actions {
  updateLedger: (...p: Parameters<typeof updateLedger>) => void;
  getTransactionsForAddress: (
    ...p: Parameters<typeof getTransactionsForAddress>
  ) => void;
  receiveTransactionsForAddress: (
    ...p: Parameters<typeof receiveTransactionsForAddress>
  ) => void;
  sendCoins: (...p: Parameters<typeof sendCoins>) => void;
  receiveError: (...p: Parameters<typeof receiveError>) => void;
  logout: () => void;
}

export interface StoreContext {
  state: State;
  actions: Actions;
}

export interface StoreContextType {
  state: State;
  actions: Actions;
}

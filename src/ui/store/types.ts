import {
  getTransactionsForAddress,
  receiveTransactionsForAddress,
  sendCoins,
  updateLedger,
  receiveError,
  logout,
  updateTheme,
} from '@/ui/actions/actions';

export interface Error {
  message: string;
}

export interface Transaction {
  timestamp: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
}

export interface LoginFields {
  address: string;
}

export interface SendKoicoinFields {
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

export interface Theme {
  dark: boolean;
}

export interface State {
  ledger: Ledger;
  theme: Theme;
  [index: string]: Ledger | Theme;
}

export const enum Pages {
  login = '/login',
  dashboard = '/dashboard',
}

export const enum ActionTypes {
  updateTheme = 'UPDATE_THEME',
  updateLedger = 'UPDATE_LEDGER',
  getTransactionsForAddress = 'TRANSACTIONS_FOR_ADDRESS',
  receiveTransactionsForAddress = 'RECEIVE_TRANSACTIONS_FOR_ADDRESS',
  sendCoins = 'SEND_COINS',
  receiveError = 'RECEIVE_ERROR',
  logout = 'LOGOUT',
}

export interface ActionIdentity {
  type: string;
  payload?: Partial<Ledger & SendKoicoinFields & Theme>;
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
  | { type: ActionTypes.sendCoins; payload: SendKoicoinFields }
  | { type: ActionTypes.receiveError; payload: State['ledger'] }
  | { type: ActionTypes.updateTheme; payload: State['theme'] }
  | { type: ActionTypes.logout };

export interface Actions {
  updateTheme: (...p: Parameters<typeof updateTheme>) => void;
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

import {
  submitOrder,
  editOrder,
  receiveOrder,
  filteredSymbols,
  failedOrder,
} from '../actions/actions';

/* export interface FieldData {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
}

export type OrderKeys = keyof Fields;

type FieldError = {
  [key in OrderKeys]?: string[];
};

export interface Fields {
  action: string;
  symbol: string | undefined;
  qty: number;
  price: number;
  stopPrice: number;
  tif: string;
  comment: string;
  errors: FieldError;
} */

export interface Ledger {
  address: string;
  balance: number;
  error?: string;
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
  submitOrder = 'SUBMIT_ORDER',
  receiveOrder = 'RECEIVE_ORDER',
  editOrder = 'EDIT_ORDER',
  filteredSymbols = 'FILTER_SYMBOLS',
  failedOrder = 'FAILED_ORDER',
}

export type Action =
  | { type: ActionTypes.filteredSymbols; payload: State['order'] }
  | { type: ActionTypes.submitOrder; payload: State['order'] }
  | { type: ActionTypes.receiveOrder; payload: State['order'] }
  | { type: ActionTypes.editOrder; payload: State['order'] }
  | { type: ActionTypes.failedOrder; payload: State['order'] };

export interface Actions {
  failedOrder: (...p: Parameters<typeof failedOrder>) => void;
  submitOrder: (...p: Parameters<typeof submitOrder>) => void;
  receiveOrder: (...p: Parameters<typeof receiveOrder>) => void;
  editOrder: (...p: Parameters<typeof editOrder>) => void;
  filteredSymbols: (...p: Parameters<typeof filteredSymbols>) => void;
}

export interface StoreContext {
  state: State;
  actions: Actions;
}

export interface StoreContextType {
  state: State;
  actions: Actions;
}

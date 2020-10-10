import { updateLedger } from '../actions/actions';

export interface FieldData {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
}

export type LoginFieldKeys = keyof LoginFields;

type FieldError = {
  [key in LoginFieldKeys]?: string[];
};

export interface LoginFields {
  address: string;
  errors: FieldError;
}

export interface Ledger {
  fields: LoginFields;
  balance?: number;
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
}

export type Action = {
  type: ActionTypes.updateLedger;
  payload: State['ledger'];
};

export interface Actions {
  updateLedger: (...p: Parameters<typeof updateLedger>) => void;
}

export interface StoreContext {
  state: State;
  actions: Actions;
}

export interface StoreContextType {
  state: State;
  actions: Actions;
}

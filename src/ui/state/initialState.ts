import { State } from '../store/types';
import { ledger } from '../state/ledger';

export const initialState: State = {
  ledger,
  theme: {
    dark: true,
  },
};

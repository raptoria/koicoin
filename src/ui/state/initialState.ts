import { State } from '@/ui/store/types';
import { ledger } from '@/ui/state/ledger';

export const initialState: State = {
  ledger,
  theme: {
    dark: true,
  },
};

import { Ledger } from '../store/types';

export const ledger: Ledger = {
  fields: {
    address: '',
    errors: {}, //{ qty: ['oops!'] },
  },
  balance: 0,
};

import { ActionTypes, Action, State } from '../store/types';
import { Dispatch } from 'react';

export const updateLedger = (payload: State['ledger']): Action => {
  return {
    type: ActionTypes.updateLedger,
    payload,
  };
};

//synonymous with bindActionCreators in mapDispatchToProps, 2nd arg of connect
export const useActions = (dispatch: Dispatch<Action>) => ({
  updateLedger: (payload: State['ledger']): void =>
    dispatch(updateLedger(payload)),
});

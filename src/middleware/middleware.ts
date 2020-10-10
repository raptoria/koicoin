import { Action, ActionTypes } from '../store/types';
import { Dispatch } from 'react';
import moment from 'moment';

let count = 0; //hack to mimic a failing API

export const applyMiddleware = (dispatch: Dispatch<Action>) => async (
  action: Action
) => {
  dispatch(action);

  switch (action.type) {
    case ActionTypes.updateLedger:
      console.log('submitted');
      break;
    default:
      return null;
  }
};

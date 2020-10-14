import { Action, ActionTypes } from '../store/types';
import { Dispatch } from 'react';
import fetchJsonp, { Response } from 'fetch-jsonp';

export const applyMiddleware = (dispatch: Dispatch<Action>) => async (
  action: Action
) => {
  dispatch(action);

  switch (action.type) {
    case ActionTypes.getTransactionsForAddress:
      console.log('getting transaction');
      const address = action.payload.address;
      try {
        const response: Response = await fetchJsonp(
          `https://jobcoin.gemini.com/germinate-deepness/api/addresses/${address}`
        );
        const transactions = await response.json();

        dispatch({
          type: ActionTypes.receiveTransactionsForAddress,
          payload: transactions,
        });
      } catch (e) {
        dispatch({
          type: ActionTypes.receiveError,
          payload: { error: 'There was an error fetching data.' },
        });
      }

    default:
      return null;
  }
};

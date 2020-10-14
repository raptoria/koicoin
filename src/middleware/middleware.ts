import { Action, ActionTypes, ApiResponse } from '../store/types';
import { Dispatch } from 'react';
import fetchJsonp, { Response as JsonpResponse } from 'fetch-jsonp';

const proxy = 'https://cors-anywhere.herokuapp.com/';

export const applyMiddleware = (dispatch: Dispatch<Action>) => async (
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getTransactionsForAddress:
      console.log('getting transaction');
      const address = action.payload.address;

      try {
        const response: JsonpResponse = await fetchJsonp(
          `https://jobcoin.gemini.com/germinate-deepness/api/addresses/${address}`
        );
        const result: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(result.error);
        }
        dispatch({
          type: ActionTypes.receiveTransactionsForAddress,
          payload: result,
        });
      } catch (error) {
        dispatch({
          type: ActionTypes.receiveError,
          payload: { error: error.message },
        });
      }
      break;

    case ActionTypes.sendCoins:
      try {
        const response: Response = await fetch(
          proxy +
            'http://jobcoin.gemini.com/germinate-deepness/api/transactions',
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(result.error);
        }
        console.log('sending coins');
        setTimeout(() => {
          console.log('inside timeout');
          dispatch({
            type: ActionTypes.getTransactionsForAddress,
            payload: { address: action.payload.fromAddress },
          });
        }, 2000);
      } catch (error) {
        dispatch({
          type: ActionTypes.receiveError,
          payload: { error: error.message },
        });
      }
      break;
    default:
      dispatch(action);
      break;
  }
};

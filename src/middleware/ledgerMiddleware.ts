import {
  Action,
  ActionIdentity,
  ActionTypes,
  ApiResponse,
} from '../store/types';
import fetchJsonp, { Response as JsonpResponse } from 'fetch-jsonp';
import { takeEvery } from './middleware';

const proxy = 'https://cors-anywhere.herokuapp.com/';

export async function getTransactionForAddress<T extends ActionIdentity>(
  action: T
): Promise<Action> {
  console.log('getting transaction for address', action);
  const address = action.payload!.address;

  try {
    const response: JsonpResponse = await fetchJsonp(
      `https://jobcoin.gemini.com/germinate-deepness/api/addresses/${address}`
    );
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return {
      type: ActionTypes.receiveTransactionsForAddress,
      payload: result,
    };
  } catch (error) {
    return {
      type: ActionTypes.receiveError,
      payload: { error: error.message },
    };
  }
}

export async function sendCoins<T extends ActionIdentity>(
  action: T
): Promise<Action> {
  try {
    const response: Response = await fetch(
      proxy + 'http://jobcoin.gemini.com/germinate-deepness/api/transactions',
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

    return {
      type: ActionTypes.getTransactionsForAddress,
      payload: { address: action.payload!.fromAddress },
    };
  } catch (error) {
    return {
      type: ActionTypes.receiveError,
      payload: { error: error.message },
    };
  }
}

export function* ledgerMiddleware() {
  yield takeEvery(
    ActionTypes.getTransactionsForAddress,
    getTransactionForAddress
  );
  yield takeEvery(ActionTypes.sendCoins, sendCoins);
}

import {
  Action,
  ActionIdentity,
  ActionTypes,
  ApiResponse,
  ApiError,
} from '@/ui/store/types';
import { takeEvery } from './middleware';

export async function getTransactionForAddress<T extends ActionIdentity>(
  action: T,
): Promise<Action> {
  const address = action.payload!.address;

  try {
    const response: Response = await fetch(`/api/addresses/${address}`);
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return {
      type: ActionTypes.receiveTransactionsForAddress,
      payload: result,
    };
  } catch (err: unknown) {
    const error = err as ApiError;
    return {
      type: ActionTypes.receiveError,
      payload: { error: error.message },
    };
  }
}

export async function sendCoins<T extends ActionIdentity>(
  action: T,
): Promise<Action> {
  try {
    const response: Response = await fetch(`/api/transactions`, {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return {
      type: ActionTypes.getTransactionsForAddress,
      payload: { address: action.payload!.fromAddress },
    };
  } catch (err: unknown) {
    const error = err as ApiError;
    return {
      type: ActionTypes.receiveError,
      payload: { error: error.message },
    };
  }
}

export function* ledgerMiddleware() {
  yield takeEvery(
    ActionTypes.getTransactionsForAddress,
    getTransactionForAddress,
  );
  yield takeEvery(ActionTypes.sendCoins, sendCoins);
}

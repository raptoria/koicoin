import match from 'conditional-expression';
import { Action } from '../store/types';
import { ledgerMiddleware } from './ledgerMiddleware';

interface TakeEvery {
  actionName: string;
  functionCall: (action: Action) => Promise<Action>;
}
const middlewares = [ledgerMiddleware];

export const takeEvery = (
  actionName: string,
  functionCall: (action: Action) => Promise<Action>
): TakeEvery => {
  return {
    actionName,
    functionCall,
  };
};

/***
 * applyMiddleware: the function that will be executed before any dispatched event
 */
export const applyMiddleware = (dispatch: any) => (action: Action) =>
  dispatch(action) ||
  middlewares.forEach((useMiddleware) => {
    let value = null;
    const middleWare = useMiddleware();

    do {
      console.log('middleware has a new value');
      value = middleWare.next().value as TakeEvery;

      if (value !== undefined) {
        match(value)
          .on((take: TakeEvery) => take.actionName === action.type)
          .then((takeEveryResult: TakeEvery) =>
            takeEveryResult.functionCall(action).then((callResult) => {
              if (callResult) {
                applyMiddleware(dispatch)(callResult);
              }
            })
          );
      }
    } while (value !== undefined);
  });

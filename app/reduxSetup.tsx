import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, Store, Reducer} from 'redux';

let reducer = {};

interface NewReducers {
  [reducerKey: string]: Reducer;
}
export const registerReducer = (newReducers: NewReducers) => {
  reducer = {
    ...reducer,
    ...newReducers,
  };
};
let store;

interface Props {
  children?: JSX.Element;
}

const ReduxProvider: React.FC<Props> = ({children}) => {
  const [storeState, setStoreState] = useState<Store | null>(null);
  useEffect(() => {
    store = createStore(combineReducers<() => void>(reducer), {});
    setStoreState(store);
  }, []);
  if (!storeState) {
    return null;
  }
  return <Provider store={storeState}>{children}</Provider>;
};
export {ReduxProvider};

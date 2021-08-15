import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

let reducer = {};

export const registerReducer = newReducers => {
  reducer = {
    ...reducer,
    ...newReducers,
  };
};
let store;

const ReduxProvider = ({children}) => {
  const [storeState, setStoreState] = useState(null);
  useEffect(() => {
    store = createStore(combineReducers(reducer), {});
    setStoreState(store);
  }, []);
  if (!storeState) {
    return null;
  }
  return <Provider store={storeState}>{children}</Provider>;
};
export {ReduxProvider};

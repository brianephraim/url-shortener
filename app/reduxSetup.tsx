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
  const [ready, setIsReady] = useState(false);
  useEffect(() => {
    store = createStore(combineReducers(reducer), {});
    window.reduxStore = store;
    setIsReady(store);
  }, []);
  if (!ready) {
    return null;
  }
  return <Provider store={ready}>{children}</Provider>;
};
export {ReduxProvider};

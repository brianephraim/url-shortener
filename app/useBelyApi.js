import {useState, useEffect, useReducer, useCallback} from 'react';
import isUrl from 'is-url-superb';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        errorType: null,
        timestamp: Date.now(),
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorType: null,
        timestamp: Date.now(),
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorType: action.errorType,
        timestamp: Date.now(),
      };
    case 'REMOVE_ITEM':
      if (!state.data) {
        return state;
      }
      return {
        ...state,
        data: state.data.filter(({slug}) => slug !== action.slug),
      };
    case 'ADD_ITEM':
      if (!state.data) {
        return state;
      }
      return {
        ...state,
        data: [
          ...state.data.filter(({slug}) => action.data.slug !== slug),
          {
            ...action.data,
            added: Date.now(),
          },
        ],
      };
    default:
      throw new Error();
  }
};

function delay(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const emptyObj = {};
const emptyArray = [];
let submitId = 0;
const purposeToFetchMethodMap = {
  shorten: 'POST',
  history: 'GET',
  showSpecific: 'GET',
  remove: 'DELETE',
};
const purposeToInitialDataMap = {
  shorten: emptyObj,
  history: emptyArray,
  showSpecific: emptyObj,
  remove: false,
};
const useBellyApi = purpose => {
  const [param, setParam] = useState('');
  const [lastSubmitId, setSubmitId] = useState('');

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    errorType: null,
    data: purposeToInitialDataMap[purpose],
  });
  const setParamWithTimestamp = useCallback(
    async (...args) => {
      setParam(...args);
      submitId += 1;
      setSubmitId(submitId);
    },
    [setParam]
  );
  const removeItemBySlug = useCallback(slug => {
    dispatch({
      type: 'REMOVE_ITEM',
      slug,
    });
  }, []);

  const addItem = useCallback(data => {
    dispatch({
      type: 'ADD_ITEM',
      data,
    });
  }, []);

  useEffect(() => {
    const effectRequiresParam = ['shorten', 'showSpecifc', 'remove'].includes(
      purpose
    );
    if (effectRequiresParam && !param) {
      return null;
    }
    if (effectRequiresParam && !isUrl(param)) {
      return dispatch({type: 'FETCH_FAILURE', errorType: 'invalid'});
    }
    console.log(purpose, 'SUBMIT', param, lastSubmitId);
    let didCancel = false;

    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'});
      try {
        const method = purposeToFetchMethodMap[purpose];
        const paramPath = param && method !== 'POST' ? `/${param}` : '';
        const belyApiPath = 'https://api.bely.me/links';
        const fetchUrl = `${belyApiPath}${paramPath}`;
        console.log(purpose, 'fetchUrl', fetchUrl);
        const fetchPromise = fetch(fetchUrl, {
          method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'GB-Access-Token': '8d1a453fe3d93b9f7eabbeed18645d8c',
          },
          ...(method !== 'POST'
            ? {}
            : {
                body: JSON.stringify({
                  url: param,
                }),
              }),
        }).then(r => (purpose === 'remove' ? r : r.json()));
        const [result] = await Promise.all([fetchPromise, delay(0)]);
        console.log(purpose, 'result', result);
        if (!didCancel) {
          if (purpose === 'remove') {
            return dispatch(
              result.status === 204
                ? {
                    type: 'FETCH_SUCCESS',
                    payload: true,
                  }
                : {
                    type: 'FETCH_ERROR',
                    payload: false,
                  }
            );
          }
          return dispatch({type: 'FETCH_SUCCESS', payload: result});
        }
        return null;
      } catch (error) {
        console.log(purpose, 'error', error);
        if (didCancel) {
          return dispatch({type: 'FETCH_FAILURE', errorType: 'cancel'});
        }
        return dispatch({type: 'FETCH_FAILURE', errorType: 'fetch'});
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [param, lastSubmitId, purpose]);
  const methodToReturn =
    purpose === 'history' ? removeItemBySlug : setParamWithTimestamp;
  return [state, methodToReturn, addItem];
};

export default useBellyApi;

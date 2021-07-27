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
        timestamp: Date.now(),
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorType: action.errorType,
        timestamp: Date.now(),
      };
    default:
      throw new Error();
  }
};

function delay(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const emptyObj = {};
let submitId = 0;
const useBellyApi = () => {
  const [urlToShorten, setUrlToShorten] = useState('');
  const [lastSubmitId, setSubmitId] = useState('');
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    errorType: null,
    data: emptyObj,
  });
  const setUrlToShortenWithTimestamp = useCallback(
    (...args) => {
      setUrlToShorten(...args);
      submitId += 1;
      setSubmitId(submitId);
    },
    [setUrlToShorten]
  );
  useEffect(() => {
    if (!urlToShorten) {
      return null;
    }
    if (!isUrl(urlToShorten)) {
      return dispatch({type: 'FETCH_FAILURE', errorType: 'invalid'});
    }
    console.log('SUBMIT', urlToShorten, lastSubmitId);
    let didCancel = false;

    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'});
      try {
        const fetchPromise = fetch('https://api.bely.me/links', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'GB-Access-Token': '8d1a453fe3d93b9f7eabbeed18645d8c',
          },
          body: JSON.stringify({
            url: urlToShorten,
          }),
        }).then(r => r.json());
        const [result] = await Promise.all([fetchPromise, delay(2000)]);
        console.log('result', result);
        if (!didCancel) {
          dispatch({type: 'FETCH_SUCCESS', payload: result});
        }
        return null;
      } catch (error) {
        console.log('error', error);
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
  }, [urlToShorten, lastSubmitId]);

  return [state, setUrlToShortenWithTimestamp];
};

export default useBellyApi;

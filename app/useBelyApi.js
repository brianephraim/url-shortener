import {useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import isUrl from 'is-url-superb';
import {registerReducer} from './reduxSetup';

const stateDefault = {
  initialized: false,
  data: [],
  errorType: null,
  timestamp: 0,
};
registerReducer({
  shortenedUrls: (state = stateDefault, action) => {
    const now = Date.now();
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          errorType: null,
          timestamp: now,
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          initialized: true,
          data: action.payload,
          errorType: null,
          timestamp: now,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          errorType: action.errorType,
          timestamp: now,
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
          errorType: null,
          timestamp: now,
          data: [
            ...state.data.filter(({slug}) => action.data.slug !== slug),
            {
              ...action.data,
              added: now,
            },
          ],
        };
      default:
        return state;
    }
  },
});

function shortenedUrlsSelector({shortenedUrls}) {
  return shortenedUrls;
}
const purposeToFetchMethodMap = {
  shorten: 'POST',
  refresh: 'GET',
  showSpecific: 'GET',
  remove: 'DELETE',
};

function delay(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function fetchBely(purpose, param) {
  try {
    const method = purposeToFetchMethodMap[purpose];
    const paramPath = param && method !== 'POST' ? `/${param}` : '';
    const belyApiPath = 'https://api.bely.me/links';
    const fetchUrl = `${belyApiPath}${paramPath}`;
    return fetch(fetchUrl, {
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
  } catch (error) {
    /* eslint-disable no-console */
    console.warn('fetchBely error', purpose, param, error);
    /* eslint-enable no-console */
    throw error;
  }
}

const emptyObj = {};
const useBellyApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState(emptyObj);
  const dispatch = useDispatch();
  const shortenedUrls = useSelector(shortenedUrlsSelector);

  const removeItem = useCallback(
    slug => {
      dispatch({
        type: 'REMOVE_ITEM',
        slug,
      });
      fetchBely('remove', slug);
    },
    [dispatch]
  );

  const addItem = useCallback(
    async url => {
      if (!isUrl(url)) {
        return setErrorData({errorType: 'invalidUrl'});
      }
      setIsLoading(true);
      try {
        const fetchPromise = fetchBely('shorten', url);
        const [result] = await Promise.all([fetchPromise, delay(1000)]);
        dispatch({
          type: 'ADD_ITEM',
          data: result,
        });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
      return null;
    },
    [dispatch]
  );

  const refreshShortenedUrl = useCallback(async () => {
    const fetchPromise = fetchBely('refresh');
    const [result] = await Promise.all([fetchPromise, delay(0)]);
    return dispatch({type: 'FETCH_SUCCESS', payload: result});
  }, [dispatch]);

  return {
    shortenedUrls,
    isLoading,
    errorData,
    addItem,
    removeItem,
    refreshShortenedUrl,
  };
};

export default useBellyApi;

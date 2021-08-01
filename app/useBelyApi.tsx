import {useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {registerReducer} from './reduxSetup';

export interface ShortenedUrlsData {
  short_url: string;
  url: string;
  slug: string;
  added: number;
}
export interface ShortenedUrls {
  data: ShortenedUrlsData[];
  initialized: boolean;
}
interface ErrorData {
  errorType?: string;
}
interface BellyApiObj {
  isLoading: boolean;
  errorData: ErrorData;
  refreshShortenedUrl: () => void;
  shortenedUrls: ShortenedUrls;
  addItem: (url: string) => void;
  removeItem: (url: string) => void;
}

export const addItemDelayTime = 1000;
export const refreshDelayTime = 2000;
/* eslint-disable no-useless-escape */
const validateUrlExpression =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
/* eslint-enable no-useless-escape */
const isUrl = (url: string) => !!url.match(validateUrlExpression);
const stateDefault = {
  initialized: false,
  data: [],
  errorType: null,
};

const mergeArraysRemovingUrlDupesFromSecond = (
  arrayToPreserve: ShortenedUrlsData[] = [],
  arrayToRemoveDupesFrom = []
) => {
  return [
    ...arrayToRemoveDupesFrom.filter(({url}) => {
      const f = arrayToPreserve.some(({url: addedUrl}) => url === addedUrl);
      return !f;
    }),
    ...arrayToPreserve,
  ];
};

registerReducer({
  shortenedUrls: (state: ShortenedUrls = stateDefault, action) => {
    const now = Date.now();
    switch (action.type) {
      case 'REFRESH_SUCCESS':
        return {
          ...state,
          initialized: true,
          errorType: null,
          data: mergeArraysRemovingUrlDupesFromSecond(
            state.data,
            action.payload
          ),
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
          data: [
            ...state.data.filter(({url}) => action.data.url !== url),
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

interface StoreWithShortenedUrls {
  shortenedUrls: ShortenedUrls;
}

const shortenedUrlsSelector = ({shortenedUrls}: StoreWithShortenedUrls) => {
  return shortenedUrls;
};

interface PurposeToFetchMethodMap {
  [key: string]: string;
}
const purposeToFetchMethodMap: PurposeToFetchMethodMap = {
  shorten: 'POST',
  refresh: 'GET',
  showSpecific: 'GET',
  remove: 'DELETE',
};

function delay(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}
async function fetchBely(purpose: string, param?: string) {
  try {
    const method = purposeToFetchMethodMap[purpose];
    const paramPath = param && method !== 'POST' ? `/${param}` : '';
    const belyApiPath = 'https://api.bely.me/links';
    const fetchUrl = `${belyApiPath}${paramPath}`;
    const result = await fetch(fetchUrl, {
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
    return result;
  } catch (error) {
    /* eslint-disable no-console */
    console.warn('fetchBely error', purpose, param, error);
    /* eslint-enable no-console */
    throw error;
  }
}

const emptyObj = {};
const useBellyApi: () => BellyApiObj = () => {
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
    async urlOriginal => {
      let url = urlOriginal;
      if (!url.includes('://')) {
        url = `https://${url}`;
      }
      if (!isUrl(url)) {
        return setErrorData({errorType: 'invalidUrl'});
      }
      const preExistingShortenedUrl = shortenedUrls.data.find(
        ({url: oldUrl}) => url === oldUrl
      );
      dispatch({
        type: 'ADD_ITEM',
        data: {
          url,
          short_url: 'loading...',
          slug: null,
        },
      });
      if (preExistingShortenedUrl) {
        setIsLoading(true);
        await delay(addItemDelayTime);
        dispatch({
          type: 'ADD_ITEM',
          data: preExistingShortenedUrl,
        });
        setIsLoading(false);
        return null;
      }

      try {
        setIsLoading(true);
        const fetchPromise = fetchBely('shorten', url);
        const [result] = await Promise.all([
          fetchPromise,
          delay(addItemDelayTime),
        ]);
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
    [dispatch, shortenedUrls]
  );

  const refreshShortenedUrl = useCallback(async () => {
    const fetchPromise = fetchBely('refresh');
    const [result] = await Promise.all([fetchPromise, delay(refreshDelayTime)]);
    return dispatch({type: 'REFRESH_SUCCESS', payload: result});
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

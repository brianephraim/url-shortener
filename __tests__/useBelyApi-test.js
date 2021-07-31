import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';
import useBelyApi, {
  addItemDelayTime,
  refreshDelayTime,
} from '../app/useBelyApi';
import {ReduxProvider} from '../app/reduxSetup';
import {mockGet, mockPost, mockPostPreexisting} from './utility/fixtures';
import belyApiTestPrep from './utility/belyApiTestPrep';

describe('useBelyApi', () => {
  belyApiTestPrep();
  describe('refreshShortenedUrl method', () => {
    it('should populate shortenedUrls.data with a successful call', async () => {
      const {result} = renderHook(() => useBelyApi(), {wrapper: ReduxProvider});
      expect(result.current.shortenedUrls.data.length).toStrictEqual(0);
      await act(async () => {
        result.current.refreshShortenedUrl();
        jest.advanceTimersByTime(refreshDelayTime);
      });
      expect(result.current.shortenedUrls).toStrictEqual({
        initialized: true,
        data: mockGet.response,
        errorType: null,
      });
    });
  });

  describe('addItem method', () => {
    it('should add an item to shortenedUrls data after a temporary placeholder', async () => {
      const {result} = renderHook(() => useBelyApi(), {wrapper: ReduxProvider});
      const addItemDelayTimeHalf = addItemDelayTime / 2;
      await act(async () => {
        result.current.addItem(mockPost.body.url);
        jest.advanceTimersByTime(addItemDelayTimeHalf);
      });
      const {data} = result.current.shortenedUrls;
      expect(data[data.length - 1].short_url).toStrictEqual('loading...');
      await act(async () => {
        jest.advanceTimersByTime(addItemDelayTimeHalf);
      });
      expect(result.current.shortenedUrls.data[0].short_url).toStrictEqual(
        mockPost.response.short_url
      );
    });

    it('should preserve added items even after a pending refreshShortenedUrl resolves', async () => {
      const {result} = renderHook(() => useBelyApi(), {wrapper: ReduxProvider});
      await act(async () => {
        result.current.refreshShortenedUrl();
        // jest.advanceTimersByTime(100);
      });
      const {data: data1} = result.current.shortenedUrls;
      expect(data1.length).toStrictEqual(0);
      expect(refreshDelayTime).toBeGreaterThan(addItemDelayTime);
      await act(async () => {
        result.current.addItem(mockPost.body.url);
        jest.advanceTimersByTime(addItemDelayTime);
      });
      const {data: data2} = result.current.shortenedUrls;
      expect(data2.length).toStrictEqual(1);
      await act(async () => {
        jest.advanceTimersByTime(refreshDelayTime);
      });
      const {data: data3} = result.current.shortenedUrls;

      expect(data3.length).toBeGreaterThan(1);
      expect(data3[data3.length - 1].short_url).toStrictEqual(
        mockPost.response.short_url
      );
    });

    it('should move a preexisting shortenedUrls.data item to end of that array when its url is added', async () => {
      const {result} = renderHook(() => useBelyApi(), {wrapper: ReduxProvider});
      await act(async () => {
        result.current.refreshShortenedUrl();
        jest.advanceTimersByTime(refreshDelayTime);
      });
      expect(result.current.shortenedUrls.data.length).toStrictEqual(
        mockGet.response.length
      );
      const preexistingIndexSelector = arr => ({
        preexistingIndex: arr.findIndex(
          ({url}) => url === mockPostPreexisting.body.url
        ),
        preexistingItem: arr.find(
          ({url}) => url === mockPostPreexisting.body.url
        ),
      });
      const {preexistingIndex: preexistingIndex1} = preexistingIndexSelector(
        result.current.shortenedUrls.data
      );
      expect(preexistingIndex1).toBeLessThan(mockGet.response.length - 1);
      expect(preexistingIndex1).toBeGreaterThan(-1);
      await act(async () => {
        result.current.addItem(mockPostPreexisting.body.url);
      });
      const {
        preexistingIndex: preexistingIndex2,
        preexistingItem: preexistingItem2,
      } = preexistingIndexSelector(result.current.shortenedUrls.data);
      expect(preexistingIndex2).toEqual(
        result.current.shortenedUrls.data.length - 1
      );
      expect(preexistingItem2.short_url).toEqual('loading...');
      await act(async () => {
        jest.advanceTimersByTime(addItemDelayTime);
      });
      const {
        preexistingIndex: preexistingIndex3,
        preexistingItem: preexistingItem3,
      } = preexistingIndexSelector(result.current.shortenedUrls.data);

      expect(preexistingIndex3).toEqual(
        result.current.shortenedUrls.data.length - 1
      );
      expect(preexistingItem3.short_url).toEqual(
        mockPostPreexisting.response.short_url
      );
    });
  });

  describe('removeItem method', () => {
    it('should remove an item specified by a slug from shortenedUrls.data', async () => {
      const {result} = renderHook(() => useBelyApi(), {wrapper: ReduxProvider});
      await act(async () => {
        result.current.refreshShortenedUrl();
        jest.advanceTimersByTime(refreshDelayTime);
      });
      expect(result.current.shortenedUrls.data.length).toStrictEqual(
        mockGet.response.length
      );
      const someItem = result.current.shortenedUrls.data[5];
      expect(result.current.shortenedUrls.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            slug: someItem.slug,
          }),
        ])
      );
      await act(async () => {
        result.current.removeItem(someItem.slug);
      });
      const fixtureDataLengthAfterRemovingOne = mockGet.response.length - 1;
      expect(result.current.shortenedUrls.data.length).toStrictEqual(
        fixtureDataLengthAfterRemovingOne
      );
      expect(result.current.shortenedUrls.data).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            slug: someItem.slug,
          }),
        ])
      );
    });
  });
});

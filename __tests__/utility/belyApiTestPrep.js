import fetchMock from 'fetch-mock';
import 'whatwg-fetch';
import {mockGet, mockPost, mockDelete} from './fixtures';

const belyApiTestPrep = () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  beforeEach(() => {
    jest.useFakeTimers('legacy');
    fetchMock.mock(mockGet.url, mockGet.response, {
      method: mockGet.method,
    });
    fetchMock.mock(mockPost.url, mockPost.response, {
      method: mockPost.method,
      body: mockPost.body,
    });
    fetchMock.mock(mockDelete.url, mockDelete.response, {
      method: mockDelete.method,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    fetchMock.restore();
  });
};

export default belyApiTestPrep;

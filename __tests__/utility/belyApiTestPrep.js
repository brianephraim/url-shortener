import fetchMock from 'fetch-mock';
import 'whatwg-fetch';

import {mockGet, mockPost, mockDelete} from './fixtures';
import setupSafeTimers from './setupSafeTimers';

const belyApiTestPrep = () => {
  setupSafeTimers();
  beforeAll(() => {
    global.fetch = fetch;
  });
  beforeEach(() => {
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
  // //
  afterEach(async () => {
    fetchMock.restore();
  });
};

export default belyApiTestPrep;

import React from 'react';
import 'react-native';
import {act} from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import AppEntry from '../app/AppEntry';
import belyApiTestPrep from './utility/belyApiTestPrep';
import UrlShortenerScreen from '../app/UrlShortenerScreen';
import setupSafeTimers from './utility/setupSafeTimers';

describe('UrlShortenerScreen', () => {
  describe('list', () => {
    belyApiTestPrep();
    setupSafeTimers();
    it('should retrieve data when mounted', async () => {
      const {queryAllByTestId} = render(
        <AppEntry>
          <UrlShortenerScreen />
        </AppEntry>
      );
      expect(queryAllByTestId('ShortenedUrlItem').length).toStrictEqual(0);
      await act(async () => {
        jest.runAllTimers();
      });
      expect(queryAllByTestId('ShortenedUrlItem').length).toBeGreaterThan(0);
    });
  });
});

import React from 'react';
import 'react-native';
import {act} from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import AppEntry from '../app/AppEntry';
import {mockPost} from './utility/fixtures';
import belyApiTestPrep from './utility/belyApiTestPrep';
import ShortenUrlForm, {
  testIDTextInput,
  testIDButton,
  testIDButtonText,
  textButtonLoading,
  textButtonNormal,
  textInvalidUrl,
} from '../app/ShortenUrlForm';
import {toastEntireTime, testIDToastText} from '../app/Toast';
import setupSafeTimers, {timeTravel} from './utility/setupSafeTimers';

describe('ShortenedUrlForm', () => {
  describe('button press', () => {
    belyApiTestPrep();
    setupSafeTimers();

    it('should display in a loading state when initially pressed and resumes to its original state', async () => {
      const {getByTestId} = render(
        <AppEntry>
          <ShortenUrlForm />
        </AppEntry>
      );
      fireEvent.changeText(getByTestId(testIDTextInput), mockPost.body.url);
      fireEvent.press(getByTestId(testIDButton));
      expect(getByTestId(testIDButtonText).props.children).toEqual(
        textButtonLoading
      );
      await act(async () => {
        jest.runAllTimers();
      });
      expect(getByTestId(testIDButtonText).props.children).toEqual(
        textButtonNormal
      );
      jest.runOnlyPendingTimers();
    });

    it('should spawn a temporary toast error element when an invalid url is submitted', async () => {
      const {getByTestId, queryByTestId} = render(
        <AppEntry>
          <ShortenUrlForm />
        </AppEntry>
      );
      const someInvalidUrl = 'some-invalid-url';
      expect(queryByTestId(testIDToastText)).toBeNull(); // toBeNull toBeTruthy
      fireEvent.changeText(getByTestId(testIDTextInput), someInvalidUrl);
      fireEvent.press(getByTestId(testIDButton));
      expect(queryByTestId(testIDToastText)).toBeTruthy();
      expect(getByTestId(testIDToastText).props.children).toEqual(
        `${textInvalidUrl}${someInvalidUrl}`
      );
      await act(async () => {
        timeTravel(toastEntireTime);
      });
      expect(queryByTestId(testIDToastText)).toBeNull();
    });
  });
});

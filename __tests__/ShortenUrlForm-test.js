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
} from '../app/ShortenUrlForm';
import {toastEntireTime} from '../app/Toast';
import jestAnimationSetup, {timeTravel} from './utility/jestAnimationSetup';

describe('ShortenedUrlForm', () => {
  jestAnimationSetup();
  belyApiTestPrep();

  describe('button press', () => {
    it('should display in a loading state when initially pressed and resumes to its original state', async () => {
      const {getByTestId} = render(
        <AppEntry>
          <ShortenUrlForm />
        </AppEntry>
      );
      act(() => {
        fireEvent.changeText(getByTestId(testIDTextInput), mockPost.body.url);
      });
      act(() => {
        fireEvent.press(getByTestId(testIDButton));
      });
      expect(getByTestId(testIDButtonText).props.children).toEqual(
        textButtonLoading
      );
      await act(async () => {
        jest.runAllTimers();
      });
      expect(getByTestId(testIDButtonText).props.children).toEqual(
        textButtonNormal
      );
    });
  });
});

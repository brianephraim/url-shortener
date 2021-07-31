/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/AppEntry';
import belyApiTestPrep from './utility/belyApiTestPrep';

describe('app', () => {
  belyApiTestPrep();
  it('renders correctly', () => {
    renderer.create(<App />);
  });
});

import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import './matchers';
import 'jest-location-mock';

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
});

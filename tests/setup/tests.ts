import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import './matchers';
import 'jest-location-mock';
import {matchMedia} from '@shopify/jest-dom-mocks';

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
  matchMedia.restore();
});

// eslint-disable-next-line jest/require-top-level-describe
beforeEach(() => {
  matchMedia.mock();
});

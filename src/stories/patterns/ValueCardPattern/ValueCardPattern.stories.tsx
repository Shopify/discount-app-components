import React from 'react';
import {Provider} from '../../foundation/Provider';
import ValueCard from './ValueCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'ValueCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const ValueCardPattern = () => (
  <Provider>
    <ValueCard />
  </Provider>
);

export {ValueCardPattern};

import React from 'react';
import {Provider} from '../../foundation/Provider';
import MethodCard from './MethodCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'MethodCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const MethodCardPattern = () => (
  <Provider>
    <MethodCard />
  </Provider>
);

export {MethodCardPattern};

import React from 'react';
import {Provider} from './foundation/Provider';
import {Playground as PlaygroundInner} from './Playground';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'Playground/Playground',
  parameters: {
    layout: 'fullscreen',
  },
};

const Playground = () => (
  <Provider>
    <PlaygroundInner />
  </Provider>
);

export {Playground};

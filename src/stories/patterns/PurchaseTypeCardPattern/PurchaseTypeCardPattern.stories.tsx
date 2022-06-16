import React from 'react';
import {Provider} from '../../foundation/Provider';
import PurchaseTypeCard from './PurchaseTypeCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'PurchaseTypeCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const PurchaseTypeCardPattern = () => (
  <Provider>
    <PurchaseTypeCard />
  </Provider>
);

export {PurchaseTypeCardPattern};

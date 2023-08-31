import React from 'react';
import {Provider} from '../../foundation/Provider';
import CombinationCard from './CombinationCardPattern';
import {DiscountClass} from '../../..';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'CombinationCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
  component: CombinationCard,
  argTypes: {
    discountClass: {
      control: {
        type: 'select',
        options: [
          DiscountClass.Product,
          DiscountClass.Order,
          DiscountClass.Shipping,
        ],
      },
    },
  },
};

interface Props {
  discountClass: DiscountClass;
  discountDescriptor: string;
}

const Template = (args: Props) => (
  <Provider>
    <CombinationCard {...args} />
  </Provider>
);

interface TemplateProps {
  discountDescriptor?: string;
  discountClass?: DiscountClass;
}

export const ProductDiscount = (args: TemplateProps) => (
  <Template
    discountDescriptor="My cool product discount"
    {...args}
    discountClass={DiscountClass.Product}
  />
);
export const OrderDiscount = (args: TemplateProps) => (
  <Template
    discountDescriptor="My cool order discount"
    {...args}
    discountClass={DiscountClass.Order}
  />
);
export const ShippingDiscount = (args: TemplateProps) => (
  <Template
    discountDescriptor="My cool shipping discount"
    {...args}
    discountClass={DiscountClass.Shipping}
  />
);

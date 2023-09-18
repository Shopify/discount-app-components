import React, {ReactNode} from 'react';
import {
  createMount,
  mount,
  Element as ReactTestingElement,
  CustomRoot,
} from '@shopify/react-testing';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  DiscountAppComponentsTestProvider,
  DiscountAppComponentsTestProviderProps,
} from '../../src/components/DiscountAppComponentsTestProvider';
import type {Field} from '../../src';

export {createMount, mount, ReactTestingElement, CustomRoot};

jest.mock('@shopify/polaris', () => ({
  ...jest.requireActual('@shopify/polaris'),
  Frame: ({children}: {children?: ReactNode}) => <div>{children}</div>,
}));

export const mountWithApp = (
  component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: DiscountAppComponentsTestProviderProps,
) =>
  createMount<
    DiscountAppComponentsTestProviderProps,
    DiscountAppComponentsTestProviderProps
  >({
    context(options) {
      return options;
    },
    render(element, context?: DiscountAppComponentsTestProviderProps) {
      return (
        <DiscountAppComponentsTestProvider {...context}>
          {element}
        </DiscountAppComponentsTestProvider>
      );
    },
  })(component, {...options});

export function mockField<T = string>(
  value: T = '' as any,
  overrides: Partial<Field<T>> = {},
) {
  return {
    error: undefined,
    onBlur: jest.fn(),
    onChange: jest.fn(),
    value,
    ...overrides,
  };
}

import React from 'react';
import {Button, TextField} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {DiscountCodeGenerator} from '../DiscountCodeGenerator';

jest.mock('../utilities', () => ({
  ...jest.requireActual('../utilities'),
  generateRandomDiscountCode: jest.fn(),
}));

const generateRandomDiscountCode = jest.requireMock('../utilities')
  .generateRandomDiscountCode as jest.Mock;

describe('<DiscountCodeGenerator />', () => {
  const mockDiscountCode = mockField('SPRING_SALE');

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a TextField', () => {
    const discountCodeGenerator = mountWithApp(
      <DiscountCodeGenerator
        discountCode={mockDiscountCode}
        defaultLength={10}
      />,
    );

    expect(discountCodeGenerator).toContainReactComponent(TextField, {
      label: 'Discount code',
      helpText: 'Customers must enter this code at checkout.',
      ...mockDiscountCode,
      connectedRight: expect.any(Object),
    });

    expect(discountCodeGenerator.find(TextField)).toContainReactComponent(
      Button,
      {
        onClick: expect.any(Function),
        children: 'Generate',
      },
    );
  });

  it('generates a discount code when the generate discount button is clicked', () => {
    const mockGeneratedDiscountCode = 'AABBCCDDEE';
    generateRandomDiscountCode.mockReturnValue(mockGeneratedDiscountCode);

    const discountCodeGenerator = mountWithApp(
      <DiscountCodeGenerator
        discountCode={mockDiscountCode}
        defaultLength={10}
      />,
    );

    discountCodeGenerator.find(Button)!.trigger('onClick');

    expect(mockDiscountCode.onChange).toHaveBeenLastCalledWith(
      mockGeneratedDiscountCode,
    );
  });

  it('calls discountCode.onChange when text field onChange occurs', () => {
    const mockCode = 'AABBCCDDEE';

    const discountCodeGenerator = mountWithApp(
      <DiscountCodeGenerator
        discountCode={mockDiscountCode}
        defaultLength={10}
      />,
    );

    discountCodeGenerator.find(TextField)!.trigger('onChange', mockCode);

    expect(mockDiscountCode.onChange).toHaveBeenLastCalledWith(mockCode);
  });

  it('calls discountCode.onBlur when text field onBlur occurs', () => {
    const discountCodeGenerator = mountWithApp(
      <DiscountCodeGenerator
        discountCode={mockDiscountCode}
        defaultLength={10}
      />,
    );

    discountCodeGenerator.find(TextField)!.trigger('onBlur');
    expect(mockDiscountCode.onBlur).toHaveBeenCalled();
  });
});

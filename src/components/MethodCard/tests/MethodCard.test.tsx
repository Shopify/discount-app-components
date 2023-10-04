import React from 'react';
import {Card, ChoiceList, Text, TextField, InlineStack} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {MethodCard} from '../MethodCard';
import {DiscountCodeGenerator} from '../../DiscountCodeGenerator';
import {DiscountClass, DiscountMethod} from '../../../constants';

describe('<MethodCard />', () => {
  const mockProps = {
    title: 'Test card title',
    discountClass: DiscountClass.Shipping,
    discountMethod: mockField(DiscountMethod.Automatic),
    discountTitle: mockField('Test discount title'),
    discountCode: mockField('SPRING_SALE'),
    defaultDiscountCodeLength: 10,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a DiscountCodeGenerator if the method is Code', () => {
    const methodCard = mountWithApp(
      <MethodCard
        {...mockProps}
        discountMethod={{
          ...mockProps.discountMethod,
          value: DiscountMethod.Code,
        }}
      />,
    );

    expect(methodCard).toContainReactComponent(DiscountCodeGenerator, {
      discountCode: mockProps.discountCode,
      defaultLength: mockProps.defaultDiscountCodeLength,
    });
    expect(methodCard).not.toContainReactComponent(TextField, {
      label: 'Title',
    });
  });

  it('renders the title align start and blockAlign center', () => {
    const methodCard = mountWithApp(<MethodCard {...mockProps} />);

    expect(methodCard).toContainReactComponent(Card, {
      padding: '400',
    });
    expect(methodCard).toContainReactComponent(InlineStack, {
      align: 'start',
      blockAlign: 'center',
      gap: '100',
    });
  });

  it('renders the discount title input if the method is Automatic', () => {
    const methodCard = mountWithApp(
      <MethodCard
        {...mockProps}
        discountMethod={{
          ...mockProps.discountMethod,
          value: DiscountMethod.Automatic,
        }}
      />,
    );

    expect(methodCard).toContainReactComponent(TextField, {
      label: 'Title',
      helpText: 'Customers will see this in their cart and at checkout.',
      maxLength: 255,
      ...mockProps.discountTitle,
    });
    expect(methodCard).not.toContainReactComponent(DiscountCodeGenerator);
  });

  it('displays a Heading with title prop as the content', () => {
    const methodCard = mountWithApp(<MethodCard {...mockProps} />);

    expect(methodCard).toContainReactComponent(Text, {
      children: mockProps.title,
    });
  });

  it.each`
    discountClass             | subtitle
    ${DiscountClass.Product}  | ${'Product discount'}
    ${DiscountClass.Order}    | ${'Order discount'}
    ${DiscountClass.Shipping} | ${'Shipping discount'}
  `(
    'renders a subtitle based on the discount class $discountClass',
    ({discountClass, subtitle}) => {
      const methodCard = mountWithApp(
        <MethodCard {...mockProps} discountClass={discountClass} />,
      );

      expect(methodCard).toContainReactText(subtitle);
    },
  );

  it('does not render discountMethod choice list when discountMethodHidden is true', () => {
    const methodCard = mountWithApp(
      <MethodCard
        {...mockProps}
        discountMethodHidden
        discountMethod={{
          ...mockProps.discountMethod,
          value: DiscountMethod.Automatic,
        }}
      />,
    );
    expect(methodCard).not.toContainReactComponent(ChoiceList);
    expect(methodCard).not.toContainReactComponent(Text, {
      children: 'Method',
    });
  });

  it('renders discountMethod choice list when discountMethodHidden is false', () => {
    const methodCard = mountWithApp(
      <MethodCard
        {...mockProps}
        discountMethod={{
          ...mockProps.discountMethod,
          value: DiscountMethod.Automatic,
        }}
      />,
    );
    expect(methodCard).toContainReactComponent(ChoiceList);
    expect(methodCard).toContainReactComponent(Card);
  });

  it('toggling the discount method calls onChange for the discountMethod', () => {
    const methodCard = mountWithApp(
      <MethodCard
        {...mockProps}
        discountMethod={{
          ...mockProps.discountMethod,
          value: DiscountMethod.Automatic,
        }}
      />,
    );

    methodCard.find(ChoiceList)?.trigger('onChange', [DiscountMethod.Code]);

    expect(mockProps.discountMethod.onChange).toHaveBeenLastCalledWith(
      DiscountMethod.Code,
    );
  });
});

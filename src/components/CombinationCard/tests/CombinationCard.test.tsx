import React from 'react';
import {Banner, Card, ChoiceList, Text} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {CombinationCard} from '../CombinationCard';
import type {CombinationCardProps} from '../CombinationCard';
import {DiscountClass} from '../../../constants';

describe('<CombinationCard />', () => {
  const mockProps: CombinationCardProps = {
    discountClass: DiscountClass.Product,
    discountDescriptor: 'My cool discount',
    combinableDiscountTypes: mockField({
      orderDiscounts: false,
      productDiscounts: true,
      shippingDiscounts: false,
    }),
  };

  const mockProductOtherOption = {
    label: 'Other product discounts',
    value: DiscountClass.Product,
  };

  const mockOrderOption = {
    label: 'Order discounts',
    value: DiscountClass.Order,
  };
  const mockShippingOption = {
    label: 'Shipping discounts',
    value: DiscountClass.Shipping,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders <Card />', () => {
    const combinationCard = mountWithApp(<CombinationCard {...mockProps} />);

    expect(combinationCard).toContainReactComponent(Card);
    expect(combinationCard).toContainReactComponent(Text, {
      children: 'Combinations',
    });
  });

  it('renders <ChoiceList />', () => {
    const combinationCard = mountWithApp(<CombinationCard {...mockProps} />);

    expect(combinationCard).toContainReactComponent(ChoiceList, {
      title: 'Combines with',
      titleHidden: true,
      allowMultiple: true,
    });
  });

  it('renders a label when the discountDescriptor has a value', () => {
    const combinationCard = mountWithApp(<CombinationCard {...mockProps} />);

    expect(combinationCard).toContainReactText(
      `${mockProps.discountDescriptor} can be combined with:`,
    );
  });

  it.each`
    discountClass
    ${DiscountClass.Product}
    ${DiscountClass.Order}
    ${DiscountClass.Shipping}
  `(
    'renders a default label based on the discount class $discountClass when the discountDescriptor has a value',
    ({discountClass}) => {
      const combinationCard = mountWithApp(
        <CombinationCard
          {...mockProps}
          discountDescriptor=""
          discountClass={discountClass}
        />,
      );

      expect(combinationCard).toContainReactText(
        `This ${discountClass.toLowerCase()} discount can be combined with:`,
      );
    },
  );

  it('renders a default label when the discountDescriptor has a blank value', () => {
    const combinationCard = mountWithApp(
      <CombinationCard
        {...mockProps}
        discountDescriptor="            "
        discountClass={DiscountClass.Shipping}
      />,
    );

    expect(combinationCard).toContainReactText(
      `This ${DiscountClass.Shipping.toLowerCase()} discount can be combined with:`,
    );
  });

  it.each`
    discountClass             | expectedChoiceOptions
    ${DiscountClass.Product}  | ${[{label: 'Product discounts', value: 'PRODUCT'}, {label: 'Order discounts', value: 'ORDER'}, {label: 'Shipping discounts', value: 'SHIPPING'}]}
    ${DiscountClass.Order}    | ${[{label: 'Product discounts', value: 'PRODUCT'}, {label: 'Order discounts', value: 'ORDER'}, {label: 'Shipping discounts', value: 'SHIPPING'}]}
    ${DiscountClass.Shipping} | ${[{label: 'Product discounts', value: 'PRODUCT'}, {label: 'Order discounts', value: 'ORDER'}]}
  `(
    'renders choices for $discountClass discount',
    ({discountClass, expectedChoiceOptions}) => {
      const combinationCard = mountWithApp(
        <CombinationCard {...mockProps} discountClass={discountClass} />,
      );

      expect(combinationCard).toContainReactComponent(ChoiceList, {
        choices: expect.arrayContaining(
          expectedChoiceOptions.map((choice: {label: string; value: string}) =>
            expect.objectContaining({
              value: choice.value,
              label: choice.label,
            }),
          ),
        ),
      });
    },
  );

  it.each`
    combinesWithProduct | combinesWithOrder | combinesWithShipping | selected
    ${true}             | ${false}          | ${false}             | ${[mockProductOtherOption.value]}
    ${false}            | ${true}           | ${false}             | ${[mockOrderOption.value]}
    ${false}            | ${false}          | ${true}              | ${[mockShippingOption.value]}
  `(
    'sets selected state value in <ChoiceList /> for each combination option selected',
    ({
      combinesWithProduct,
      combinesWithOrder,
      combinesWithShipping,
      selected,
    }) => {
      const combinationCard = mountWithApp(
        <CombinationCard
          {...mockProps}
          combinableDiscountTypes={mockField({
            productDiscounts: combinesWithProduct,
            orderDiscounts: combinesWithOrder,
            shippingDiscounts: combinesWithShipping,
          })}
        />,
      );

      expect(combinationCard.find(ChoiceList)).toHaveReactProps({
        selected,
      });
    },
  );

  it('calls combinesWith.onChange when choicelist is modified', () => {
    const combinationCard = mountWithApp(<CombinationCard {...mockProps} />);

    combinationCard
      .find(ChoiceList)!
      .trigger('onChange', [DiscountClass.Shipping]);

    expect(mockProps.combinableDiscountTypes.onChange).toHaveBeenCalledWith({
      productDiscounts: false,
      orderDiscounts: false,
      shippingDiscounts: true,
    });
  });

  it.each`
    discountClass             | selectedChoices            | bannerCount
    ${DiscountClass.Order}    | ${['PRODUCT']}             | ${1}
    ${DiscountClass.Order}    | ${['ORDER']}               | ${1}
    ${DiscountClass.Order}    | ${['SHIPPING']}            | ${0}
    ${DiscountClass.Product}  | ${['ORDER']}               | ${1}
    ${DiscountClass.Product}  | ${['PRODUCT', 'SHIPPING']} | ${0}
    ${DiscountClass.Shipping} | ${['PRODUCT', 'ORDER']}    | ${0}
  `(
    'renders warning banner conditionally for $discountClass discount and selected choices $selectedChoices',
    ({discountClass, selectedChoices, bannerCount}) => {
      const mockPropsWithSelectedChoices = {
        ...mockProps,
        discountClass,
        combinableDiscountTypes: mockField({
          productDiscounts: selectedChoices.includes('PRODUCT'),
          orderDiscounts: selectedChoices.includes('ORDER'),
          shippingDiscounts: selectedChoices.includes('SHIPPING'),
        }),
      };

      const combinationCard = mountWithApp(
        <CombinationCard {...mockPropsWithSelectedChoices} />,
      );

      expect(combinationCard.findAll(Banner)).toHaveLength(bannerCount);
    },
  );
});

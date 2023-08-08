import React from 'react';
import {Banner, LegacyCard as Card, ChoiceList} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';
import {composeGid} from '@shopify/admin-graphql-api-utilities';

import {CombinationCard} from '../CombinationCard';
import {HelpText} from '../components';
import type {CombinationCardProps} from '../CombinationCard';

import {DiscountClass} from '~/constants';

describe('<CombinationCard />', () => {
  const mockProps: CombinationCardProps = {
    discountClass: DiscountClass.Product,
    discountDescriptor: 'My cool discount',
    combinableDiscountTypes: mockField({
      orderDiscounts: false,
      productDiscounts: true,
      shippingDiscounts: false,
    }),
    combinableDiscountCounts: {
      orderDiscountsCount: 0,
      productDiscountsCount: 3,
      shippingDiscountsCount: 0,
    },
    discountId: composeGid('DiscountNode', '1'),
  };

  const mockProductOtherOption = {
    label: 'Other product discounts',
    value: DiscountClass.Product,
    renderChildren: (isSelected: boolean) =>
      isSelected ? (
        <HelpText
          currentDiscountClass={mockProps.discountClass}
          targetDiscountClass={DiscountClass.Product}
          count={mockProps.combinableDiscountCounts!.productDiscountsCount}
          currentDiscountName={mockProps.discountDescriptor}
          currentDiscountId={mockProps.discountId}
        />
      ) : null,
  };

  const mockOrderOption = {
    label: 'Order discounts',
    value: DiscountClass.Order,
    renderChildren: (isSelected: boolean) =>
      isSelected ? (
        <HelpText
          currentDiscountClass={mockProps.discountClass}
          targetDiscountClass={DiscountClass.Order}
          count={mockProps.combinableDiscountCounts!.orderDiscountsCount}
          currentDiscountName={mockProps.discountDescriptor}
          currentDiscountId={mockProps.discountId}
        />
      ) : null,
  };
  const mockShippingOption = {
    label: 'Shipping discounts',
    value: DiscountClass.Shipping,
    renderChildren: (isSelected: boolean) =>
      isSelected ? (
        <HelpText
          currentDiscountClass={mockProps.discountClass}
          targetDiscountClass={DiscountClass.Shipping}
          count={mockProps.combinableDiscountCounts!.shippingDiscountsCount}
          currentDiscountName={mockProps.discountDescriptor}
          currentDiscountId={mockProps.discountId}
        />
      ) : null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders <Card />', () => {
    const combinationCard = mountWithApp(<CombinationCard {...mockProps} />);

    expect(combinationCard).toContainReactComponent(Card, {
      sectioned: true,
      title: 'Combinations',
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
              renderChildren: expect.any(Function),
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

  it('does not render help text when combinableDiscountCounts is not passed', () => {
    const combinationCard = mountWithApp(
      <CombinationCard
        combinableDiscountTypes={mockProps.combinableDiscountTypes}
        discountClass={mockProps.discountClass}
        discountDescriptor={mockProps.discountDescriptor}
      />,
    );

    expect(combinationCard).not.toContainReactComponent(HelpText);
  });

  it.each`
    currentDiscountClass      | targetDiscountClass       | expectedCount
    ${DiscountClass.Product}  | ${DiscountClass.Product}  | ${1}
    ${DiscountClass.Product}  | ${DiscountClass.Shipping} | ${2}
    ${DiscountClass.Order}    | ${DiscountClass.Shipping} | ${2}
    ${DiscountClass.Shipping} | ${DiscountClass.Product}  | ${2}
    ${DiscountClass.Shipping} | ${DiscountClass.Order}    | ${2}
  `(
    'adjusts the HelpText count to $expectedCount based on the currentDiscountClass of $currentDiscountClass and targetDiscountClass of $targetDiscountClass',
    ({currentDiscountClass, targetDiscountClass, expectedCount}) => {
      const combinationCard = mountWithApp(
        <CombinationCard
          {...mockProps}
          discountClass={currentDiscountClass}
          combinableDiscountCounts={{
            orderDiscountsCount: 2,
            productDiscountsCount: 2,
            shippingDiscountsCount: 2,
          }}
          combinableDiscountTypes={mockField({
            productDiscounts: true,
            orderDiscounts: true,
            shippingDiscounts: true,
          })}
        />,
      );

      expect(combinationCard).toContainReactComponent(HelpText, {
        targetDiscountClass,
        count: expectedCount,
      });
    },
  );

  it('passes the discount id to HelpText if present', () => {
    const mockDiscountId = composeGid('DiscountNode', '123');
    const combinationCard = mountWithApp(
      <CombinationCard {...mockProps} discountId={mockDiscountId} />,
    );

    expect(combinationCard).toContainReactComponent(HelpText, {
      currentDiscountId: mockDiscountId,
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

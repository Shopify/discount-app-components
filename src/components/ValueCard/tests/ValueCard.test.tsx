import React from 'react';
import {
  Button,
  Checkbox,
  ChoiceList,
  InlineError,
  TextField,
} from '@shopify/polaris';
import {CurrencyCode} from '@shopify/react-i18n';
import {mockField, mountWithApp} from 'tests/utilities';

import {ValueCard} from '../ValueCard';
import {CurrencyField} from '../../CurrencyField';
import {
  DiscountClass,
  DiscountValueType,
  PurchaseType,
} from '../../../constants';

describe('<ValueCard />', () => {
  const mockProps = {
    fixedAmountDiscountValue: mockField(''),
    percentageDiscountValue: mockField(''),
    discountValueType: mockField(DiscountValueType.Percentage),
    discountClass: DiscountClass.Order,
    purchaseType: mockField(PurchaseType.OneTimePurchase),
    selectedCollections: mockField([]),
    selectedProductVariantsDescriptors: mockField([]),
    currencyCode: CurrencyCode.Cad,
    sellsSubscriptions: false,
    isSubscriptionPurchase: false,
    oncePerOrder: mockField(true),
    isCodeDiscount: true,
  };

  it('sets max length on currency field', () => {
    const valueCard = mountWithApp(
      <ValueCard
        {...mockProps}
        discountValueType={mockField(DiscountValueType.FixedAmount)}
      />,
    );

    expect(valueCard).toContainReactComponent(CurrencyField, {
      maxLength: 15,
    });
  });

  describe('discount value type', () => {
    it('renders discount fixed amount value text field for type fixed amount', () => {
      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
        />,
      );

      expect(valueCard).toContainReactComponent(CurrencyField);
      expect(valueCard.find(TextField)).not.toHaveReactProps({
        suffix: '%',
      });
    });

    it('renders discount percentage value text field for type percentage', () => {
      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.Percentage)}
        />,
      );

      expect(valueCard.find(TextField)).toHaveReactProps({
        suffix: '%',
      });
      expect(valueCard).not.toContainReactComponent(CurrencyField);
    });

    it('emits changes when switching discount value types', () => {
      const discountValueType = mockField(DiscountValueType.Percentage);

      const valueCard = mountWithApp(
        <ValueCard {...mockProps} discountValueType={discountValueType} />,
      );

      expect(valueCard).toContainReactComponent(Button, {
        children: 'Percentage',
        pressed: true,
      });

      valueCard.find(Button, {children: 'Fixed amount'})!.trigger('onClick');

      expect(discountValueType.onChange).toHaveBeenCalledWith(
        DiscountValueType.FixedAmount,
      );

      valueCard.find(Button, {children: 'Percentage'})!.trigger('onClick');

      expect(discountValueType.onChange).toHaveBeenCalledWith(
        DiscountValueType.Percentage,
      );
    });
  });

  describe('fixedAmountValue', () => {
    it('sets fixed amount text field value', () => {
      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
          fixedAmountDiscountValue={mockField('20')}
        />,
      );

      expect(valueCard).toContainReactComponent(CurrencyField, {
        value: '20',
      });
    });

    it('passes currencyCode to currency field', () => {
      const currencyCode = CurrencyCode.Aud;

      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
          currencyCode={currencyCode}
        />,
      );

      expect(valueCard).toContainReactComponent(CurrencyField, {currencyCode});
    });

    it('emits changes when discount fixed amount value is updated', () => {
      const fixedAmountValue = mockField('');
      const nextDiscountValue = '49';

      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
          fixedAmountDiscountValue={fixedAmountValue}
        />,
      );

      valueCard.find(CurrencyField)?.trigger('onChange', nextDiscountValue);

      expect(fixedAmountValue.onChange).toHaveBeenCalledWith(nextDiscountValue);
    });

    it('displays InlineError and sets field error prop to true when error is passed and type is fixed amount', () => {
      const error = 'foo';
      const fixedAmountValue = mockField('', {error});

      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
          fixedAmountDiscountValue={fixedAmountValue}
        />,
      );

      expect(valueCard).toContainReactComponent(InlineError, {
        message: error,
      });
      expect(valueCard).toContainReactComponent(CurrencyField, {error: true});
    });
  });

  describe('percentageValue', () => {
    it('sets percentage text field value', () => {
      const percentageValue = mockField('10');

      const valueCard = mountWithApp(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      expect(valueCard).toContainReactComponent(TextField, {
        value: percentageValue.value,
        suffix: '%',
      });
    });

    it('does not let user enter decimal values by removing "." when emitting changes', () => {
      const percentageValue = mockField('10');
      const invalidPercentageValue = '11.';

      const valueCard = mountWithApp(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', invalidPercentageValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith('11');
    });

    it('does not let user enter decimal values by removing "," when emitting changes', () => {
      const percentageValue = mockField('10');
      const invalidPercentageValue = '11,';

      const valueCard = mountWithApp(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', invalidPercentageValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith('11');
    });

    it('forces numeric values by removing non-numeric characters when emitting changes', () => {
      const percentageValue = mockField('10');
      const invalidPercentageValue = 'abc!$%*@#^';

      const valueCard = mountWithApp(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', invalidPercentageValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith('');
    });

    it('displays InlineError and sets field error prop to true when error is passed and type is percentage', () => {
      const error = 'foo';
      const percentageValue = mockField('10', {error});

      const valueCard = mountWithApp(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      expect(valueCard).toContainReactComponent(InlineError, {message: error});
      expect(valueCard).toContainReactComponent(TextField, {error: true});
    });

    it('emits changes when discount percentage value is updated', () => {
      const percentageValue = mockField('');
      const nextDiscountValue = '29';

      const valueCard = mountWithApp(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', nextDiscountValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith(nextDiscountValue);
    });
  });

  describe('purchaseType', () => {
    it('does not render PurchaseTypeList if sellsSubscriptions is false', () => {
      const valueCard = mountWithApp(<ValueCard {...mockProps} />);

      expect(valueCard).not.toContainReactComponent(ChoiceList);
    });

    it('renders PurchaseTypeList if sellsSubscriptions is true', () => {
      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          sellsSubscriptions
          purchaseType={mockField(PurchaseType.OneTimePurchase)}
        />,
      );

      expect(valueCard).toContainReactComponent(ChoiceList, {
        title: 'Select purchase type',
      });
    });

    it.each([
      PurchaseType.OneTimePurchase,
      PurchaseType.Subscription,
      PurchaseType.Both,
    ])('renders PurchaseTypeList with purchase type field', (purchaseType) => {
      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          sellsSubscriptions
          purchaseType={mockField(purchaseType)}
        />,
      );

      expect(valueCard).toContainReactComponent(ChoiceList, {
        title: 'Select purchase type',
        selected: [purchaseType],
      });
    });
  });

  describe('oncePerOrder', () => {
    it('renders the once per order checkbox if the discount is a fixed amount off of products or collections', () => {
      const discountValueTypeField = mockField(DiscountValueType.FixedAmount);
      const valueCard = mountWithApp(
        <ValueCard
          {...mockProps}
          discountValueType={discountValueTypeField}
          discountClass={DiscountClass.Product}
        />,
      );

      expect(valueCard).toContainReactComponent(Checkbox, {
        id: 'oncePerOrderCheckbox',
      });
    });
  });
});

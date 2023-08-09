import {
  Button,
  Checkbox,
  ChoiceList,
  InlineError,
  TextField,
} from '@shopify/polaris';
import {CurrencyCode} from '@shopify/react-i18n';
import {mockI18n} from '@shopify/react-i18n-next';

import {CurrencyField} from 'shared/components/CurrencyField';
import {mockField, mountWithAppContext} from 'tests/modern';
import {DiscountValueType} from 'shared/discounts';

import {AppliesTo, DiscountClass, PurchaseType} from '../../../types';
import {ValueCard} from '../ValueCard';
import {AppliesToSection} from '../components/AppliesToSection';
import LocaleTranslations from '../translations/en.json';

describe('<ValueCard />', () => {
  const mockProps = {
    fixedAmountDiscountValue: mockField(''),
    percentageDiscountValue: mockField(''),
    discountValueType: mockField(DiscountValueType.Percentage),
    discountClass: DiscountClass.Order,
    appliesTo: mockField(AppliesTo.Order),
    purchaseType: mockField(PurchaseType.OneTimePurchase),
    selectedCollections: mockField([]),
    selectedProductVariantsDescriptors: mockField([]),
    currencyCode: CurrencyCode.Cad,
    sellsSubscriptions: false,
    isSubscriptionPurchase: false,
    oncePerOrder: mockField(true),
    isCodeDiscount: true,
  };
  const i18n = mockI18n([LocaleTranslations]);

  it('sets max length on currency field', async () => {
    const valueCard = await mountWithAppContext(
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
    it('renders discount fixed amount value text field for type fixed amount', async () => {
      const valueCard = await mountWithAppContext(
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

    it('renders discount percentage value text field for type percentage', async () => {
      const valueCard = await mountWithAppContext(
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

    it('emits changes when switching discount value types', async () => {
      const discountValueType = mockField(DiscountValueType.Percentage);

      const valueCard = await mountWithAppContext(
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
    it('sets fixed amount text field value', async () => {
      const valueCard = await mountWithAppContext(
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

    it('passes currencyCode to currency field', async () => {
      const currencyCode = CurrencyCode.Aud;

      const valueCard = await mountWithAppContext(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
          currencyCode={currencyCode}
        />,
      );

      expect(valueCard).toContainReactComponent(CurrencyField, {currencyCode});
    });

    it('emits changes when discount fixed amount value is updated', async () => {
      const fixedAmountValue = mockField('');
      const nextDiscountValue = '49';

      const valueCard = await mountWithAppContext(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
          fixedAmountDiscountValue={fixedAmountValue}
        />,
      );

      valueCard.find(CurrencyField)?.trigger('onChange', nextDiscountValue);

      expect(fixedAmountValue.onChange).toHaveBeenCalledWith(nextDiscountValue);
    });

    it('emits changes with normalized fixed amount value when onBlurUnformatted is triggered on CurrencyField', async () => {
      const fixedAmountValue = mockField('');
      const nextNormalizedDiscountValue = '49';

      const valueCard = await mountWithAppContext(
        <ValueCard
          {...mockProps}
          discountValueType={mockField(DiscountValueType.FixedAmount)}
          fixedAmountDiscountValue={fixedAmountValue}
        />,
      );

      valueCard
        .find(CurrencyField)!
        .trigger('onBlurUnformatted', nextNormalizedDiscountValue);

      expect(fixedAmountValue.onChange).toHaveBeenCalledWith(
        nextNormalizedDiscountValue,
      );
    });

    it('displays InlineError and sets field error prop to true when error is passed and type is fixed amount', async () => {
      const error = 'foo';
      const fixedAmountValue = mockField('', {error});

      const valueCard = await mountWithAppContext(
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
    it('sets percentage text field value', async () => {
      const percentageValue = mockField('10');

      const valueCard = await mountWithAppContext(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      expect(valueCard).toContainReactComponent(TextField, {
        value: percentageValue.value,
        suffix: '%',
      });
    });

    it('does not let user enter decimal values by removing "." when emitting changes', async () => {
      const percentageValue = mockField('10');
      const invalidPercentageValue = '11.';

      const valueCard = await mountWithAppContext(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', invalidPercentageValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith('11');
    });

    it('does not let user enter decimal values by removing "," when emitting changes', async () => {
      const percentageValue = mockField('10');
      const invalidPercentageValue = '11,';

      const valueCard = await mountWithAppContext(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', invalidPercentageValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith('11');
    });

    it('forces numeric values by removing non-numeric characters when emitting changes', async () => {
      const percentageValue = mockField('10');
      const invalidPercentageValue = 'abc!$%*@#^';

      const valueCard = await mountWithAppContext(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', invalidPercentageValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith('');
    });

    it('displays InlineError and sets field error prop to true when error is passed and type is percentage', async () => {
      const error = 'foo';
      const percentageValue = mockField('10', {error});

      const valueCard = await mountWithAppContext(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      expect(valueCard).toContainReactComponent(InlineError, {message: error});
      expect(valueCard).toContainReactComponent(TextField, {error: true});
    });

    it('emits changes when discount percentage value is updated', async () => {
      const percentageValue = mockField('');
      const nextDiscountValue = '29';

      const valueCard = await mountWithAppContext(
        <ValueCard {...mockProps} percentageDiscountValue={percentageValue} />,
      );

      valueCard.find(TextField)?.trigger('onChange', nextDiscountValue);

      expect(percentageValue.onChange).toHaveBeenCalledWith(nextDiscountValue);
    });
  });

  describe('purchaseType', () => {
    it('does not render PurchaseTypeList if sellsSubscriptions is false', async () => {
      const valueCard = await mountWithAppContext(<ValueCard {...mockProps} />);

      expect(valueCard).not.toContainReactComponent(ChoiceList);
    });

    it('renders PurchaseTypeList if sellsSubscriptions is true', async () => {
      const valueCard = await mountWithAppContext(
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

    it.each`
      discountClass             | expectedWarning
      ${DiscountClass.Product}  | ${i18n.translate('ValueCard.purchaseType.warning.product')}
      ${DiscountClass.Order}    | ${i18n.translate('ValueCard.purchaseType.warning.order')}
      ${DiscountClass.Shipping} | ${i18n.translate('ValueCard.purchaseType.warning.shipping')}
    `(
      'renders purchase type support warning if isCodeDiscount is false',
      async ({discountClass, expectedWarning}) => {
        const props = {
          ...mockProps,
          isCodeDiscount: false,
          discountClass,
        };
        const valueCard = await mountWithAppContext(
          <ValueCard
            {...props}
            sellsSubscriptions
            purchaseType={mockField(PurchaseType.OneTimePurchase)}
          />,
        );

        expect(valueCard).toContainReactText(expectedWarning);
      },
    );

    it.each([
      PurchaseType.OneTimePurchase,
      PurchaseType.Subscription,
      PurchaseType.Both,
    ])(
      'renders PurchaseTypeList with purchase type field',
      async (purchaseType) => {
        const valueCard = await mountWithAppContext(
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
      },
    );
  });

  describe('appliesTo', () => {
    it('does not render AppliesToSection if the type is moneyOffOrder', async () => {
      const valueCard = await mountWithAppContext(<ValueCard {...mockProps} />);

      expect(valueCard).not.toContainReactComponent(AppliesToSection);
    });

    it('renders AppliesToSection if the type is moneyOffOrder', async () => {
      const valueCard = await mountWithAppContext(
        <ValueCard {...mockProps} discountClass={DiscountClass.Product} />,
      );

      expect(valueCard).toContainReactComponent(AppliesToSection);
    });
  });

  describe('oncePerOrder', () => {
    it('renders the once per order checkbox if the discount is a fixed amount off of products or collections', async () => {
      const discountValueTypeField = mockField(DiscountValueType.FixedAmount);
      const valueCard = await mountWithAppContext(
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

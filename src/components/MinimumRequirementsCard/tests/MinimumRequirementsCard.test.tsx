import React from 'react';
import {ChoiceList, InlineError, TextField} from '@shopify/polaris';
import {CurrencyCode} from '@shopify/react-i18n';
import {mockField, mountWithApp} from 'tests/utilities';

import {MinimumRequirementsCard} from '../MinimumRequirementsCard';
import {CurrencyField} from '../../CurrencyField';
import {forcePositiveInteger} from '../../../utilities/numbers';
import {
  AppliesToType,
  DiscountMethod,
  RequirementType,
} from '../../../constants';

describe('<MinimumRequirementsCard>', () => {
  const mockProps = {
    appliesTo: AppliesToType.Products,
    requirementType: mockField(RequirementType.None),
    subtotal: mockField(''),
    quantity: mockField(''),
    discountMethod: DiscountMethod.Code,
    isRecurring: false,
    currencyCode: CurrencyCode.Cad,
  };
  const currencySymbol = '$';

  it('renders list of minimum requirements', () => {
    const minimumRequirementsCard = mountWithApp(
      <MinimumRequirementsCard {...mockProps} />,
    );

    const choiceList = minimumRequirementsCard.find(ChoiceList);

    expect(choiceList).toHaveReactProps({
      choices: expect.arrayContaining([
        expect.objectContaining({
          label: 'No minimum requirements',
        }),
        expect.objectContaining({
          label: `Minimum purchase amount (${currencySymbol})`,
          renderChildren: expect.any(Function),
        }),
        expect.objectContaining({
          label: 'Minimum quantity of items',
          renderChildren: expect.any(Function),
        }),
      ]),
    });
  });

  it('passes currencyCode to currency field', () => {
    const currencyCode = CurrencyCode.Cad;

    const minimumRequirementsCard = mountWithApp(
      <MinimumRequirementsCard
        {...mockProps}
        requirementType={mockField(RequirementType.Subtotal)}
      />,
    );

    expect(minimumRequirementsCard.find(CurrencyField)).toHaveReactProps({
      currencyCode,
    });
  });

  it('sets max length on currency field', () => {
    const minimumRequirementsCard = mountWithApp(
      <MinimumRequirementsCard
        {...mockProps}
        requirementType={mockField(RequirementType.Subtotal)}
      />,
    );

    expect(minimumRequirementsCard.find(CurrencyField)).toHaveReactProps({
      maxLength: 15,
    });
  });

  it('sets max length on prerequisite quantity field', () => {
    const minimumRequirementsCard = mountWithApp(
      <MinimumRequirementsCard
        {...mockProps}
        requirementType={mockField(RequirementType.Quantity)}
        quantity={mockField('')}
      />,
    );

    expect(minimumRequirementsCard.find(TextField)).toHaveReactProps({
      maxLength: 10,
    });
  });

  describe('appliesTo', () => {
    it('renders help text for subtotal field when discount applies to entire order', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Order}
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies to all products.',
      );
    });

    it('renders help text for subtotal field when discount applies to collections', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Collections}
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to selected collections.',
      );
    });

    it('renders help text for subtotal field when discount applies to products', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Products}
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to selected products.',
      );
    });

    it('renders help text for subtotal field when discount applies to subscription products', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Products}
          isRecurring
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to selected subscription products.',
      );
    });

    it('renders help text for subtotal field when discount applies to subscription collections', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Collections}
          isRecurring
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to subscription products in selected collections.',
      );
    });

    it('renders help text for subtotal field when discount applies to all subscription products', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Order}
          isRecurring
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to subscription products.',
      );
    });

    it('renders help text for quantity field when discount applies to entire order', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Order}
          requirementType={mockField(RequirementType.Quantity)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies to all products.',
      );
    });

    it('renders help text for quantity field when discount applies to collections', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Collections}
          requirementType={mockField(RequirementType.Quantity)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to selected collections.',
      );
    });

    it('renders help text for quantity field when discount applies to products', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Products}
          requirementType={mockField(RequirementType.Quantity)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to selected products.',
      );
    });

    it('renders help text for quantity field when discount applies to subscription products', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Products}
          isRecurring
          requirementType={mockField(RequirementType.Quantity)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to selected subscription products.',
      );
    });

    it('renders help text for quantity field when discount applies to subscription collections', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Collections}
          isRecurring
          requirementType={mockField(RequirementType.Quantity)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to subscription products in selected collections.',
      );
    });

    it('renders help text for quantity field when discount applies to all subscription products', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          appliesTo={AppliesToType.Order}
          isRecurring
          requirementType={mockField(RequirementType.Quantity)}
        />,
      );

      expect(minimumRequirementsCard).toContainReactText(
        'Applies only to subscription products.',
      );
    });
  });

  describe('requirementType', () => {
    it('selects no prerequisite option by default when requirementType is missing', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard {...mockProps} />,
      );

      expect(minimumRequirementsCard.find(ChoiceList)).toHaveReactProps({
        selected: [RequirementType.None],
      });
    });

    it('selects subtotal prerequisite option', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      expect(minimumRequirementsCard.find(ChoiceList)).toHaveReactProps({
        selected: [RequirementType.Subtotal],
      });
    });

    it('selects quantity prerequisite option', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Quantity)}
        />,
      );

      expect(minimumRequirementsCard.find(ChoiceList)).toHaveReactProps({
        selected: [RequirementType.Quantity],
      });
    });

    it('calls requirementType onChange when selection changes', () => {
      const requirementType = mockField(RequirementType.None);

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={requirementType}
        />,
      );

      minimumRequirementsCard
        .find(ChoiceList)!
        .trigger('onChange', [RequirementType.Quantity]);

      expect(requirementType.onChange).toHaveBeenCalledWith(
        RequirementType.Quantity,
      );

      minimumRequirementsCard
        .find(ChoiceList)!
        .trigger('onChange', [RequirementType.Subtotal]);

      expect(requirementType.onChange).toHaveBeenCalledWith(
        RequirementType.Subtotal,
      );
    });
  });

  describe('subtotal', () => {
    it('sets the subtotal prerequisite', () => {
      const mockSubtotal = '12345.67';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
          subtotal={mockField(mockSubtotal)}
        />,
      );

      expect(minimumRequirementsCard.find(CurrencyField)).toHaveReactProps({
        value: mockSubtotal,
      });
    });

    it('renders InlineError when error is received', () => {
      const error = 'Oh no!';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
          subtotal={mockField('', {error})}
        />,
      );

      expect(minimumRequirementsCard.find(InlineError)).toHaveReactProps({
        message: error,
      });
    });

    it('sets error prop to true on subtotal field when error is received', () => {
      const error = 'Oh no!';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
          subtotal={mockField('', {error})}
        />,
      );

      expect(minimumRequirementsCard.find(CurrencyField)).toHaveReactProps({
        error: true,
      });
    });

    it('calls subtotal when subtotal prerequisite changes', () => {
      const subtotal = mockField('');
      const nextSubtotal = '5432.10';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
          subtotal={subtotal}
        />,
      );

      minimumRequirementsCard
        .find(CurrencyField)!
        .trigger('onChange', nextSubtotal);

      expect(subtotal.onChange).toHaveBeenCalledWith(nextSubtotal);
    });

    it('calls subtotal with normalized subtotal prerequisite when onBlurUnformatted is triggered on CurrencyField', () => {
      const subtotal = mockField('');
      const nextNormalizedPrerequisiteSubtotal = '12345.67';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
          subtotal={subtotal}
        />,
      );
      minimumRequirementsCard
        .find(CurrencyField)!
        .trigger('onChange', nextNormalizedPrerequisiteSubtotal);

      expect(subtotal.onChange).toHaveBeenCalledWith(
        nextNormalizedPrerequisiteSubtotal,
      );
    });

    it('calls onBlur', () => {
      const subtotal = mockField('', {onBlur: jest.fn()});

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
          subtotal={subtotal}
        />,
      );

      minimumRequirementsCard.find(CurrencyField)!.trigger('onBlur');

      expect(subtotal.onBlur).toHaveBeenCalled();
    });
  });

  describe('quantity', () => {
    it('sets the quantity prerequisite', () => {
      const quantity = '7';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Quantity)}
          quantity={mockField(quantity)}
        />,
      );

      expect(minimumRequirementsCard.find(TextField)).toHaveReactProps({
        value: quantity,
      });
    });

    it('renders InlineError when error is received', () => {
      const error = 'Oh no!';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Quantity)}
          quantity={mockField('', {error})}
        />,
      );

      expect(minimumRequirementsCard.find(InlineError)).toHaveReactProps({
        message: error,
      });
    });

    it('sets error prop to true on quantity field when error is received', () => {
      const error = 'Oh no!';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Quantity)}
          quantity={mockField('', {error})}
        />,
      );

      expect(minimumRequirementsCard.find(TextField)).toHaveReactProps({
        error: true,
      });
    });

    it('calls quantity onChange when quantity prerequisite changes', () => {
      const quantity = mockField('');
      const nextPrerequisiteQuantity = '7';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Quantity)}
          quantity={quantity}
        />,
      );

      minimumRequirementsCard
        .find(TextField)!
        .trigger('onChange', nextPrerequisiteQuantity);

      expect(quantity.onChange).toHaveBeenCalledWith(nextPrerequisiteQuantity);
    });

    it('forces numeric values by removing non-numeric characters when emitting changes', () => {
      const quantity = mockField('');
      const invalidPrerequisiteQuantity = '12,.abc!$%*@#^';

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Quantity)}
          quantity={quantity}
        />,
      );

      minimumRequirementsCard
        .find(TextField)!
        .trigger('onChange', invalidPrerequisiteQuantity);

      expect(quantity.onChange).toHaveBeenCalledWith(
        forcePositiveInteger(invalidPrerequisiteQuantity),
      );
    });

    it('calls onBlur', () => {
      const quantity = mockField('Test', {onBlur: jest.fn()});

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Quantity)}
          quantity={quantity}
        />,
      );

      minimumRequirementsCard.find(TextField)!.trigger('onBlur');

      expect(quantity.onBlur).toHaveBeenCalled();
    });
  });

  describe('supportedRequirementTypes', () => {
    it('renders supported choices when discount method is automatic', () => {
      const supportedRequirementTypes = [
        RequirementType.Subtotal,
        RequirementType.Quantity,
      ];

      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          discountMethod={DiscountMethod.Automatic}
        />,
      );

      const renderedRequirementTypes = minimumRequirementsCard
        .find(ChoiceList)!
        .prop('choices')
        .map(({value}) => value);

      expect(renderedRequirementTypes).toStrictEqual(supportedRequirementTypes);
    });
  });

  describe('CurrencyField', () => {
    it('has positiveOnly prop', () => {
      const minimumRequirementsCard = mountWithApp(
        <MinimumRequirementsCard
          {...mockProps}
          requirementType={mockField(RequirementType.Subtotal)}
        />,
      );

      const currencyField = minimumRequirementsCard.find(CurrencyField);

      expect(currencyField).toHaveReactProps({
        positiveOnly: true,
      });
    });
  });
});

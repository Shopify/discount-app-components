import React from 'react';
import {CurrencyCode} from '@shopify/react-i18n';
import {mountWithApp} from 'tests/utilities';

import {MinimumRequirements} from '../MinimumRequirements';
import {RequirementType} from '../../../../../constants';

describe('<MinimumRequirements />', () => {
  const mockProps = {
    requirementType: RequirementType.None,
    quantity: '',
    subtotal: '',
    currencyCode: CurrencyCode.Usd,
  };

  it('displays no requirements when minimum requirement is set to none', () => {
    const minimumRequirements = mountWithApp(
      <MinimumRequirements
        {...mockProps}
        requirementType={RequirementType.None}
      />,
    );

    expect(minimumRequirements).toContainReactText(
      'No minimum purchase requirement',
    );
  });

  it('displays subtotal requirement with minimum purchase amount value', () => {
    const minimumRequirements = mountWithApp(
      <MinimumRequirements
        {...mockProps}
        requirementType={RequirementType.Subtotal}
        subtotal="7"
        currencyCode={CurrencyCode.Usd}
      />,
    );

    expect(minimumRequirements).toContainReactText('Minimum purchase of $7.00');
  });

  it('displays quantity requirement with minimum quantity of items value', () => {
    const minimumRequirements = mountWithApp(
      <MinimumRequirements
        {...mockProps}
        requirementType={RequirementType.Quantity}
        quantity="7"
      />,
    );

    expect(minimumRequirements).toContainReactText(
      'Minimum purchase of 7 items',
    );
  });

  it('does not display subtotal requirement without minimum purchase amount value', () => {
    const minimumRequirements = mountWithApp(
      <MinimumRequirements
        {...mockProps}
        requirementType={RequirementType.Subtotal}
      />,
    );

    expect(minimumRequirements.find(MinimumRequirements)).toBeNull();
  });

  it('does not display quantity requirement without minimum quantity value', () => {
    const minimumRequirements = mountWithApp(
      <MinimumRequirements
        {...mockProps}
        requirementType={RequirementType.Quantity}
      />,
    );

    expect(minimumRequirements.find(MinimumRequirements)).toBeNull();
  });
});

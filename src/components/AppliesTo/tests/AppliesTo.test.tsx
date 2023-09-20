import React from 'react';
import {ChoiceList, Text, Box} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {SelectedItemsList} from '../../SelectedItemsList';
import {AppliesTo} from '../AppliesTo';
import type {AppliesToProps} from '../AppliesTo';
import {AppliesToEligibility} from '../../../constants';
import {ALL_COLLECTIONS_IN_SHOP, ALL_PRODUCTS_IN_SHOP} from '../../../data';

describe('<AppliesTo />', () => {
  const mockProps: AppliesToProps = {
    eligibility: mockField(AppliesToEligibility.Products),
    selectedItems: mockField(ALL_PRODUCTS_IN_SHOP),
    productSelector: <div />,
    collectionSelector: null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders <AppliesTo />', () => {
    const appliesTo = mountWithApp(<AppliesTo {...mockProps} />);

    expect(appliesTo).toContainReactComponent(Box);
    expect(appliesTo).toContainReactComponent(Text, {
      children: 'Applies to',
    });
  });

  it('does not render <AppliesTo /> when productSelector and collectionSelector are null', () => {
    const props = {
      ...mockProps,
      productSelector: null,
      collectionSelector: null,
    };
    const appliesTo = mountWithApp(<AppliesTo {...props} />);

    expect(appliesTo).not.toContainReactComponent(Box);
    expect(appliesTo).not.toContainReactComponent(Text, {
      children: 'Applies to',
    });
  });

  it('renders <AppliesTo /> with productSelector only', () => {
    const appliesTo = mountWithApp(
      <AppliesTo {...mockProps} productSelector={<div />} />,
    );

    expect(appliesTo).toContainReactComponent(ChoiceList, {
      disabled: true,
      selected: [AppliesToEligibility.Products],
      choices: [
        {
          label: 'Products',
          value: AppliesToEligibility.Products,
        },
        {
          label: 'Collections',
          value: AppliesToEligibility.Collections,
        },
      ],
    });

    expect(appliesTo).toContainReactComponent(SelectedItemsList, {
      items: ALL_PRODUCTS_IN_SHOP,
    });
    expect(appliesTo.findAll(SelectedItemsList)).toHaveLength(1);
  });

  it('renders <AppliesTo /> with collectionSelector only', () => {
    const props = {
      ...mockProps,
      eligibility: mockField(AppliesToEligibility.Collections),
      selectedItems: mockField(ALL_COLLECTIONS_IN_SHOP),
      productSelector: null,
      collectionSelector: <div />,
    };
    const appliesTo = mountWithApp(<AppliesTo {...props} />);

    expect(appliesTo).toContainReactComponent(ChoiceList, {
      disabled: true,
      selected: [AppliesToEligibility.Collections],
      choices: [
        {
          label: 'Products',
          value: AppliesToEligibility.Products,
        },
        {
          label: 'Collections',
          value: AppliesToEligibility.Collections,
        },
      ],
    });

    expect(appliesTo).toContainReactComponent(SelectedItemsList, {
      items: ALL_COLLECTIONS_IN_SHOP,
    });
    expect(appliesTo.findAll(SelectedItemsList)).toHaveLength(1);
  });

  it('renders <AppliesTo /> with productSelector and collectionSelector', () => {
    const props = {
      ...mockProps,
      eligibility: mockField(AppliesToEligibility.Collections),
      selectedItems: mockField(ALL_COLLECTIONS_IN_SHOP),
      productSelector: <div />,
      collectionSelector: <div />,
    };
    const appliesTo = mountWithApp(<AppliesTo {...props} />);

    expect(appliesTo).toContainReactComponent(ChoiceList, {
      disabled: false,
      selected: [AppliesToEligibility.Collections],
      choices: [
        {
          label: 'Products',
          value: AppliesToEligibility.Products,
        },
        {
          label: 'Collections',
          value: AppliesToEligibility.Collections,
        },
      ],
    });

    expect(appliesTo).toContainReactComponent(SelectedItemsList, {
      items: ALL_COLLECTIONS_IN_SHOP,
    });
    expect(appliesTo.findAll(SelectedItemsList)).toHaveLength(1);
  });

  describe('AppliesTo', () => {
    const testCases = [
      {
        eligibility: AppliesToEligibility.Products,
        selectedItems: ALL_PRODUCTS_IN_SHOP,
        expected: AppliesToEligibility.Collections,
      },
      {
        eligibility: AppliesToEligibility.Collections,
        selectedItems: ALL_COLLECTIONS_IN_SHOP,
        expected: AppliesToEligibility.Products,
      },
    ];

    it.each(testCases)(
      `calls eligibility onChange when ChoiceList is clicked`,
      ({eligibility, selectedItems, expected}) => {
        const props = {
          ...mockProps,
          eligibility: mockField(eligibility),
          selectedItems: mockField(selectedItems),
          productSelector: <div />,
          collectionSelector: <div />,
        };
        const appliesTo = mountWithApp(<AppliesTo {...props} />);

        expect(appliesTo).toContainReactComponent(ChoiceList, {
          disabled: false,
          selected: [eligibility],
          choices: [
            {
              label: 'Products',
              value: AppliesToEligibility.Products,
            },
            {
              label: 'Collections',
              value: AppliesToEligibility.Collections,
            },
          ],
        });

        appliesTo.find(ChoiceList)!.trigger('onChange', [expected]);

        expect(props.eligibility.onChange).toHaveBeenCalledWith(expected);
      },
    );
  });

  describe('SelectedItemsList', () => {
    const testCases = [
      {
        eligibility: AppliesToEligibility.Products,
        selectedItems: ALL_PRODUCTS_IN_SHOP,
        expected: ALL_PRODUCTS_IN_SHOP.slice(1),
      },
      {
        eligibility: AppliesToEligibility.Collections,
        selectedItems: ALL_COLLECTIONS_IN_SHOP,
        expected: ALL_COLLECTIONS_IN_SHOP.slice(1),
      },
    ];

    it.each(testCases)(
      `calls selectedItems onChange when SelectedItemsList onRemoveItem is clicked`,
      ({eligibility, selectedItems, expected}) => {
        const props = {
          ...mockProps,
          eligibility: mockField(eligibility),
          selectedItems: mockField(selectedItems),
          productSelector: <div />,
          collectionSelector: <div />,
        };
        const appliesTo = mountWithApp(<AppliesTo {...props} />);

        expect(appliesTo).toContainReactComponent(SelectedItemsList, {
          items: selectedItems,
        });

        appliesTo.find(SelectedItemsList)!.trigger('onRemoveItem', '1');

        expect(props.selectedItems.onChange).toHaveBeenCalledWith(expected);
      },
    );
  });
});

import React from 'react';
import {Button} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';
import {Action} from '@shopify/app-bridge/actions/Modal';
import {composeGid} from '@shopify/admin-graphql-api-utilities';

import {HelpText} from '../HelpText';
import {DiscountClass} from '../../../../../constants';

jest.mock('@shopify/app-bridge-react', () => ({
  ...jest.requireActual('@shopify/app-bridge-react'),
  useAppBridge: jest.fn(),
}));

jest.mock('@shopify/app-bridge/actions', () => ({
  ...jest.requireActual('@shopify/app-bridge/actions'),
  Modal: {
    Action: {
      OPEN: 'OPEN',
      CLOSE: 'CLOSE',
    },
    create: jest.fn(),
  },
}));

describe('<HelpText />', () => {
  const defaultProps = {
    isHidden: false,
    currentDiscountClass: DiscountClass.Shipping,
    targetDiscountClass: DiscountClass.Product,
    count: 0,
    currentDiscountName: 'my cool discount',
    currentDiscountId: composeGid('DiscountNode', '1'),
  };

  it('does not render when isHidden is true', () => {
    const helpText = mountWithApp(<HelpText {...defaultProps} />);

    expect(helpText.find(HelpText)).toBeNull();
  });

  describe('when count is greater than 0', () => {
    const countProps = {
      ...defaultProps,
      count: 3,
    };

    it('renders supporting copy', () => {
      const helpText = mountWithApp(
        <HelpText
          {...countProps}
          currentDiscountClass={DiscountClass.Product}
        />,
      );

      expect(helpText).toContainReactText(
        '3 product discounts are set to combine.If an item is eligible for multiple discounts, only the largest will apply.',
      );
    });
  });

  describe('when count is 0', () => {
    const emptyStateProps = {
      ...defaultProps,
      count: 0,
    };

    it.each([
      [
        DiscountClass.Product,
        'No product discounts are set to combine. To let customers use more than one discount, set up at least one product discount that combines with product discounts. Learn more',
      ],
      [
        DiscountClass.Order,
        'No product discounts are set to combine. To let customers use more than one discount, set up at least one product discount that combines with order discounts. Learn more',
      ],
      [
        DiscountClass.Shipping,
        'No product discounts are set to combine. To let customers use more than one discount, set up at least one product discount that combines with shipping discounts. Learn more',
      ],
    ])(
      'renders empty state content when no %s discounts are set to combine with current discount',
      (combinesWith, expectedText) => {
        const helpText = mountWithApp(
          <HelpText {...emptyStateProps} currentDiscountClass={combinesWith} />,
        );
        expect(helpText).toContainReactText(expectedText);
      },
    );
  });

  describe('Combinations Modal', () => {
    it('renders a modal trigger when count > 0', () => {
      const helpText = mountWithApp(<HelpText {...defaultProps} count={2} />);

      expect(helpText).toContainReactComponent(Button, {
        children: `2 product discounts`,
        onClick: expect.any(Function),
        variant: 'plain',
      });
    });

    it('does not render a modal trigger when count is 0', () => {
      const helpText = mountWithApp(<HelpText {...defaultProps} count={0} />);

      expect(helpText).not.toContainReactComponent(Button);
    });

    it('dispatches a modal data and open action when triggered', () => {
      const modalMock = jest.requireMock('@shopify/app-bridge/actions').Modal
        .create as jest.Mock;

      const mockModalCreate = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
      };
      modalMock.mockReturnValue(mockModalCreate);

      const helpText = mountWithApp(<HelpText {...defaultProps} count={2} />);

      helpText.find(Button)?.trigger('onClick');

      expect(mockModalCreate.dispatch).toHaveBeenCalledWith(Action.DATA, {
        discountOptions: {
          currentDiscountClass: defaultProps.currentDiscountClass,
          targetDiscountClass: defaultProps.targetDiscountClass,
          currentDiscountName: defaultProps.currentDiscountName,
          currentDiscountId: defaultProps.currentDiscountId,
        },
      });

      expect(mockModalCreate.dispatch).toHaveBeenCalledWith(Action.DATA, {
        discountOptions: expect.objectContaining({
          currentDiscountClass: defaultProps.currentDiscountClass,
          targetDiscountClass: defaultProps.targetDiscountClass,
          currentDiscountName: defaultProps.currentDiscountName,
          currentDiscountId: defaultProps.currentDiscountId,
        }),
      });
    });
  });
});

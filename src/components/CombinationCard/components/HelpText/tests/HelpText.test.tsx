import React from 'react';
import {Button, Icon} from '@shopify/polaris';
import {InfoMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';
import {Action} from '@shopify/app-bridge/actions/Modal';
import {composeGid} from '@shopify/admin-graphql-api-utilities';

import {HelpText} from '../HelpText';

import {DiscountClass} from '~/constants';

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
      const helpText = mountWithApp(<HelpText {...countProps} />);

      expect(helpText).toContainReactText(
        '3 product discounts can be combined in the same purchase. If an item is eligible for multiple discounts, only the largest discount will apply.',
      );
    });
  });

  describe('when count is 0', () => {
    const emptyStateProps = {
      ...defaultProps,
      count: 0,
    };

    it('renders <Icon />', () => {
      const helpText = mountWithApp(<HelpText {...emptyStateProps} />);

      expect(helpText).toContainReactComponent(Icon, {
        color: 'subdued',
        source: InfoMinor,
      });
    });

    it('renders empty state content', () => {
      const helpText = mountWithApp(<HelpText {...emptyStateProps} />);

      expect(helpText).toContainReactText(
        'Currently, no product discounts are set up to combine.',
      );
      expect(helpText).toContainReactText(
        'To let customers use more than one discount, set up at least one product discount that combines with shipping discounts.',
      );
    });
  });

  describe('Combinations Modal', () => {
    it('renders a modal trigger when count > 0', () => {
      const helpText = mountWithApp(<HelpText {...defaultProps} count={2} />);

      expect(helpText).toContainReactComponent(Button, {
        children: `2 product discounts`,
        onClick: expect.any(Function),
        plain: true,
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

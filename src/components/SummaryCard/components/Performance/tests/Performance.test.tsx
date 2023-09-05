import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {CurrencyCode} from '@shopify/react-i18n';
import {Redirect} from '@shopify/app-bridge/actions';

import {Performance} from '../Performance';
import {DiscountMethod, DiscountStatus} from '../../../../../constants';
import {AppBridgeLink} from '../../../../AppBridgeLink';

describe('<Performance />', () => {
  const mockProps = {
    status: DiscountStatus.Expired,
    usageCount: 0,
    isEditing: true,
  };

  describe('when discount is scheduled', () => {
    it('renders copy for inactive discount', () => {
      const performance = mountWithApp(
        <Performance {...mockProps} status={DiscountStatus.Scheduled} />,
      );

      expect(performance).toContainReactText('Discount is not active yet.');
    });
  });

  describe('when discount is active or expired', () => {
    it.each([DiscountStatus.Active, DiscountStatus.Expired])(
      'displays usage count',
      (status) => {
        const usageCount = 10;
        const performance = mountWithApp(
          <Performance
            {...mockProps}
            status={status}
            usageCount={usageCount}
          />,
        );

        expect(performance).toContainReactText(`${usageCount} used`);
      },
    );

    it('displays total sales for discount when provided', () => {
      const totalSales = {
        amount: '10',
        currencyCode: CurrencyCode.Cad,
      };
      const performance = mountWithApp(
        <Performance {...mockProps} totalSales={totalSales} />,
      );

      expect(performance).toContainReactText('$10.00 in total sales');
    });

    describe('Report link', () => {
      it('renders a report link when discountMethod is code and the shop has reports', () => {
        const performance = mountWithApp(
          <Performance
            {...mockProps}
            discountMethod={DiscountMethod.Code}
            hasReports
          />,
        );

        expect(performance).toContainReactComponent(AppBridgeLink, {
          action: Redirect.Action.ADMIN_PATH,
          url: '/reports/sales_by_discount',
          children: 'View the sales by discount report',
        });
      });

      it('does not render a report link when discountMethod is code and the shop does not have reports', () => {
        const performance = mountWithApp(
          <Performance {...mockProps} discountMethod={DiscountMethod.Code} />,
        );

        expect(performance).not.toContainReactComponent(AppBridgeLink);
      });

      it('does not render a report link when discountMethod is automatic', () => {
        const performance = mountWithApp(
          <Performance
            {...mockProps}
            discountMethod={DiscountMethod.Automatic}
            hasReports
          />,
        );

        expect(performance).not.toContainReactComponent(AppBridgeLink);
      });
    });
  });
});

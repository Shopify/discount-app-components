import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {CurrencyCode} from '@shopify/react-i18n';
import {Link} from '@shopify/polaris';

import {Performance} from '../Performance';
import {DiscountStatus} from '../../../../../constants';

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
      it('renders a report link when report url is passed in', () => {
        const performance = mountWithApp(
          <Performance
            {...mockProps}
            reportsUrl="shopify://admin/reports/sales_by_discount"
          />,
        );

        expect(performance).toContainReactComponent(Link, {
          url: 'shopify://admin/reports/sales_by_discount',
          target: '_top',
          children: 'View the sales by discount report',
        });
      });

      it('does not render a report link when no report url is passed in', () => {
        const performance = mountWithApp(<Performance {...mockProps} />);

        expect(performance).not.toContainReactComponent(Link);
      });
    });
  });
});

import React from 'react';
import {Badge} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';

import {BadgeStatus, Header, HeaderProps} from '../Header';
import {DiscountMethod, DiscountStatus} from '../../../../../constants';

describe('<Header />', () => {
  const mockProps: HeaderProps = {
    appDiscountType: 'Custom 3p discount',
    discountMethod: DiscountMethod.Automatic,
    discountDescriptor: '',
  };

  it('renders discount descriptor when it is not empty', () => {
    const mockDescriptor = 'SPRING_SALE';

    const header = mountWithApp(
      <Header {...mockProps} discountDescriptor={mockDescriptor} />,
    );

    expect(header).toContainReactText(mockDescriptor);
  });

  describe('status badge', () => {
    it('renders a status badge when discount status is Active', () => {
      const header = mountWithApp(
        <Header
          {...mockProps}
          discountDescriptor="SPRING_SALE"
          isEditing
          discountStatus={DiscountStatus.Active}
        />,
      );

      expect(header).toContainReactComponent(Badge, {
        status: BadgeStatus.Success,
        children: 'Active',
      });
    });

    it('renders a status badge when discount status is Expired', () => {
      const header = mountWithApp(
        <Header
          {...mockProps}
          discountDescriptor="SPRING_SALE"
          isEditing
          discountStatus={DiscountStatus.Expired}
        />,
      );

      expect(header).toContainReactComponent(Badge, {
        children: 'Expired',
      });
    });

    it('renders a status badge when discount status is Scheduled', () => {
      const header = mountWithApp(
        <Header
          {...mockProps}
          discountDescriptor="SPRING_SALE"
          isEditing
          discountStatus={DiscountStatus.Scheduled}
        />,
      );

      expect(header).toContainReactComponent(Badge, {
        status: BadgeStatus.Attention,
        children: 'Scheduled',
      });
    });

    it('does not render a status badge when isEditing is false', () => {
      const header = mountWithApp(
        <Header {...mockProps} discountDescriptor="SPRING_SALE" />,
      );

      expect(header).not.toContainReactComponent(Badge);
    });

    it('does not render a status badge when discountDescriptor is empty', () => {
      const header = mountWithApp(
        <Header {...mockProps} discountDescriptor="      " />,
      );

      expect(header).not.toContainReactComponent(Badge);
    });
  });

  it('renders default text for automatic discount when discount descriptor is empty', () => {
    const header = mountWithApp(
      <Header
        {...mockProps}
        discountMethod={DiscountMethod.Automatic}
        discountDescriptor=""
      />,
    );

    expect(header).toContainReactText('No title yet.');
  });

  it('renders default text for code discount when discount descriptor is empty', () => {
    const header = mountWithApp(
      <Header
        {...mockProps}
        discountMethod={DiscountMethod.Code}
        discountDescriptor=""
      />,
    );

    expect(header).toContainReactText('No discount code yet.');
  });

  it('renders discount type', () => {
    const header = mountWithApp(<Header {...mockProps} />);

    expect(header).toContainReactText(mockProps.appDiscountType);
  });

  it('renders automatic discount method', () => {
    const header = mountWithApp(
      <Header {...mockProps} discountMethod={DiscountMethod.Automatic} />,
    );

    expect(header).toContainReactText('Automatic');
  });

  it('renders code discount method', () => {
    const header = mountWithApp(
      <Header {...mockProps} discountMethod={DiscountMethod.Code} />,
    );

    expect(header).toContainReactText('Code');
  });
});

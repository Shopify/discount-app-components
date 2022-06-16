import React from 'react';
import {Redirect} from '@shopify/app-bridge/actions';
import {mountWithApp} from 'tests/utilities';
import {Link} from '@shopify/polaris';

import {AppBridgeLink} from '../AppBridgeLink';

jest.mock('@shopify/app-bridge-react', () => ({
  ...jest.requireActual('@shopify/app-bridge-react'),
  useAppBridge: jest.fn(),
}));

jest.mock('@shopify/app-bridge/actions', () => ({
  ...jest.requireActual('@shopify/app-bridge/actions'),
  Redirect: {
    create: jest.fn(),
    Action: {
      ADMIN_PATH: 'ADMIN_PATH',
    },
  },
}));

describe('<AppBridgeLink />', () => {
  const Child = () => <div>Hello discounts</div>;

  it('renders a Link', () => {
    const appBridgeLink = mountWithApp(
      <AppBridgeLink url="/discounts" action={Redirect.Action.ADMIN_PATH}>
        <Child />
      </AppBridgeLink>,
    );

    expect(appBridgeLink).toContainReactComponent(Link, {
      onClick: expect.any(Function),
    });

    expect(appBridgeLink).toContainReactComponent(Child);
  });
});

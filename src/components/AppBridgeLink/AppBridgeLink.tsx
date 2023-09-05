import React from 'react';
import {useAppBridge} from '@shopify/app-bridge-react';
import {Redirect} from '@shopify/app-bridge/actions';
import {Link} from '@shopify/polaris';

import {handleRedirect} from '../../utilities/navigation';
import type {LinkAction} from '../../types';

export interface AppBridgeLinkProps {
  children?: React.ReactNode;
  external?: boolean;
}

export const AppBridgeLink = ({
  children,
  ...rest
}: AppBridgeLinkProps & LinkAction) => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  return (
    <Link
      onClick={() =>
        handleRedirect({
          redirect,
          ...rest,
        })
      }
      {...rest}
    >
      {children}
    </Link>
  );
};

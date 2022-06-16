import {Redirect} from '@shopify/app-bridge/actions';

import type {LinkAction} from '../types';

/**
 * Redirects to the Admin Discounts page if isAdmin is true, otherwise redirects to the app root or a specified fallbackPath within the app.
 */
export function onBreadcrumbAction(
  redirect: Redirect.Redirect,
  isAdmin: boolean,
  fallbackPath?: string,
) {
  if (isAdmin) {
    handleRedirect({
      redirect,
      url: '/discounts',
      action: Redirect.Action.ADMIN_PATH,
    });
  } else {
    handleRedirect({
      redirect,
      url: fallbackPath || '/',
      action: Redirect.Action.APP,
    });
  }
}

/**
 * Convenience wrapper for AppBridge [Redirect](https://shopify.dev/apps/tools/app-bridge/actions/navigation/redirect#redirect-to-a-specific-resource-in-shopify-admin) actions
 */
export function handleRedirect({
  redirect,
  ...props
}: {
  redirect: Redirect.Redirect;
} & LinkAction) {
  switch (props.action) {
    case Redirect.Action.ADMIN_PATH:
      redirect.dispatch(Redirect.Action.ADMIN_PATH, {
        path: props.url,
        newContext: Boolean(props.newContext),
      });
      break;
    case Redirect.Action.APP:
      redirect.dispatch(Redirect.Action.APP, props.url);
      break;
    case Redirect.Action.REMOTE:
      redirect.dispatch(Redirect.Action.REMOTE, {
        url: props.url,
        newContext: Boolean(props.newContext),
      });
      break;
    case Redirect.Action.ADMIN_SECTION:
      redirect.dispatch(Redirect.Action.ADMIN_SECTION, props.payload);
      break;
    default:
      throw new Error(
        'Unsupported redirect action. Please refer to https://shopify.dev/apps/tools/app-bridge/actions/navigation/redirect for usage.',
      );
  }
}

import {Redirect} from '@shopify/app-bridge/actions';
import {ResourceType} from '@shopify/app-bridge/actions/Navigation/Redirect';

import {handleRedirect, onBreadcrumbAction} from '../navigation';

describe('navigation', () => {
  const mockRedirect = {
    dispatch: jest.fn(),
  } as unknown as Redirect.Redirect;

  beforeEach(() => {
    (mockRedirect.dispatch as jest.Mock).mockReset();
  });

  describe('#onBreadcrumbAction', () => {
    it('redirects to admin discounts page when isAdmin is true', () => {
      onBreadcrumbAction(mockRedirect, true);

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.ADMIN_PATH,
        {
          path: '/discounts',
          newContext: false,
        },
      );
    });

    it('redirects to app when isAdmin is false', () => {
      onBreadcrumbAction(mockRedirect, false);

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.APP,
        '/',
      );
    });

    it('redirects to app fallback path when provided', () => {
      onBreadcrumbAction(mockRedirect, false, '/my-discount');

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.APP,
        '/my-discount',
      );
    });
  });

  describe('#handleRedirect', () => {
    it('redirects to an admin path', () => {
      handleRedirect({
        redirect: mockRedirect,
        action: Redirect.Action.ADMIN_PATH,
        url: '/discounts',
      });

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.ADMIN_PATH,
        {
          path: '/discounts',
          newContext: false,
        },
      );
    });

    it('redirects to an admin path in a new context', () => {
      handleRedirect({
        redirect: mockRedirect,
        action: Redirect.Action.ADMIN_PATH,
        url: '/discounts',
        newContext: true,
      });

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.ADMIN_PATH,
        {
          path: '/discounts',
          newContext: true,
        },
      );
    });

    it('redirects to an app', () => {
      handleRedirect({
        redirect: mockRedirect,
        action: Redirect.Action.APP,
        url: '/',
      });

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.APP,
        '/',
      );
    });

    it('redirects to a remote url', () => {
      const mockUrl = 'https://shopify.com';

      handleRedirect({
        redirect: mockRedirect,
        action: Redirect.Action.REMOTE,
        url: mockUrl,
      });

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.REMOTE,
        {
          url: mockUrl,
          newContext: false,
        },
      );
    });

    it('redirects to a remote url in a new context', () => {
      const mockUrl = 'https://shopify.com';

      handleRedirect({
        redirect: mockRedirect,
        action: Redirect.Action.REMOTE,
        url: mockUrl,
        newContext: true,
      });

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.REMOTE,
        {
          url: mockUrl,
          newContext: true,
        },
      );
    });

    it('redirects to an admin section with payload', () => {
      const payload = {
        name: ResourceType.Discount,
      };

      handleRedirect({
        redirect: mockRedirect,
        action: Redirect.Action.ADMIN_SECTION,
        payload,
      });

      expect(mockRedirect.dispatch).toHaveBeenCalledWith(
        Redirect.Action.ADMIN_SECTION,
        payload,
      );
    });
  });
});

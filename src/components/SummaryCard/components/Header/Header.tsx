import React from 'react';
import {I18n, useI18n} from '@shopify/react-i18n';
import {Badge, List, LegacyStack as Stack, Text} from '@shopify/polaris';

import {DiscountMethod, DiscountStatus} from '~/constants';

interface BaseProps {
  /**
   * The method (e.g. code, automatic) of the current discount
   */
  discountMethod: DiscountMethod;

  /**
   * The discount type of the current discount, this should be the `appDiscountType.title` value returned by the API.
   */
  appDiscountType: string;

  /**
   * The discount title for Automatic discounts, or discount code for Code discounts.
   */
  discountDescriptor: string;

  /**
   * (optional) Whether the current discount is being created or edited. See {@link EditingDiscountProps} for behavior when the value is true.
   */
  isEditing?: false;
}

/**
 * When `isEditing` is true, the `discountStatus` must also be provided
 */
interface EditingDiscountProps extends Omit<BaseProps, 'isEditing'> {
  isEditing: true;

  /**
   * The status of the current discount
   */
  discountStatus: DiscountStatus;
}

export type HeaderProps = BaseProps | EditingDiscountProps;

export enum BadgeStatus {
  Success = 'success',
  Attention = 'attention',
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.Header',
};

export function Header(props: HeaderProps) {
  const {discountMethod, discountDescriptor} = props;
  const [i18n] = useI18n();

  const trimmedDescriptor = discountDescriptor.trim();

  return (
    <Stack vertical spacing="loose">
      {trimmedDescriptor ? (
        <Stack distribution="equalSpacing" alignment="center" wrap>
          <Text variant="headingMd" as="h3">
            {trimmedDescriptor}
          </Text>

          {isEditing(props) && renderBadgeForStatus(props.discountStatus, i18n)}
        </Stack>
      ) : (
        <Text as="span" fontWeight="semibold" color="subdued">
          {i18n.translate(`emptyState.${discountMethod}`, I18N_SCOPE)}
        </Text>
      )}

      <Stack vertical spacing="tight">
        <Text variant="headingXs" as="h3">
          {i18n.translate('typeAndMethod', I18N_SCOPE)}
        </Text>
        <List type="bullet">
          <List.Item>{props.appDiscountType}</List.Item>
          <List.Item>
            {i18n.translate(`discountMethod.${discountMethod}`, I18N_SCOPE)}
          </List.Item>
        </List>
      </Stack>
    </Stack>
  );
}

function renderBadgeForStatus(status: DiscountStatus, i18n: I18n) {
  switch (status) {
    case DiscountStatus.Active:
      return (
        <Badge status={BadgeStatus.Success}>
          {i18n.translate('badge.active', I18N_SCOPE)}
        </Badge>
      );
    case DiscountStatus.Expired:
      return <Badge>{i18n.translate('badge.expired', I18N_SCOPE)}</Badge>;
    case DiscountStatus.Scheduled:
      return (
        <Badge status={BadgeStatus.Attention}>
          {i18n.translate('badge.scheduled', I18N_SCOPE)}
        </Badge>
      );
    default:
      return null;
  }
}

function isEditing(props: HeaderProps): props is EditingDiscountProps {
  return Boolean(props.isEditing);
}

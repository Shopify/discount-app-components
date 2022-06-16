import React, {useRef} from 'react';
import {Button, Icon, Stack, TextStyle} from '@shopify/polaris';
import {InfoMinor} from '@shopify/polaris-icons';
import {useI18n} from '@shopify/react-i18n';
import {useAppBridge} from '@shopify/app-bridge-react';
import {Modal} from '@shopify/app-bridge/actions';
import {Action} from '@shopify/app-bridge/actions/Modal';

import styles from './HelpText.scss';

import type {DiscountClass} from '~/constants';

const DISCOUNT_COMBINATION_MODAL_APP_BRIDGE_URL =
  'shopify://app-bridge/modal/discounts-combinations';

interface Props {
  currentDiscountClass: DiscountClass;
  targetDiscountClass: DiscountClass;
  count: number;
  currentDiscountName: string;
  currentDiscountId?: string;
}

export function HelpText({
  currentDiscountClass,
  targetDiscountClass,
  currentDiscountId,
  count,
  currentDiscountName,
}: Props) {
  const buttonWrapperRef = useRef<HTMLSpanElement>(null);
  const [i18n] = useI18n();
  const app = useAppBridge();
  const myModal = Modal.create(app, {
    url: DISCOUNT_COMBINATION_MODAL_APP_BRIDGE_URL,
  });

  const targetDiscountClassLabel = targetDiscountClass.toLocaleLowerCase();
  const scope = `DiscountAppComponents.CombinationCard.HelpText`;

  const handleModalOpen = () => {
    myModal.dispatch(Action.DATA, {
      discountOptions: {
        currentDiscountName,
        currentDiscountClass,
        currentDiscountId,
        targetDiscountClass,
      },
    });

    myModal.dispatch(Modal.Action.OPEN);

    const closeUnsubscribe = myModal.subscribe(Modal.Action.CLOSE, () => {
      buttonWrapperRef.current?.getElementsByTagName('button')[0]?.focus();

      closeUnsubscribe();
    });
  };

  return count > 0 ? (
    <TextStyle variation="subdued">
      {i18n.translate(
        'combinations.info',
        {scope},
        {
          count,
          discountCountLink: (
            <span ref={buttonWrapperRef}>
              <Button onClick={handleModalOpen} plain>
                {i18n.translate(
                  `combinations.counts.${targetDiscountClassLabel}`,
                  {scope},
                  {
                    count,
                  },
                )}
              </Button>
            </span>
          ),
        },
      )}
    </TextStyle>
  ) : (
    <Stack spacing="tight" wrap={false}>
      <Icon source={InfoMinor} color="subdued" />
      <Stack.Item fill>
        <p className={styles.WarningContent}>
          <span className={styles.WarningTitle}>
            {i18n.translate('title', {
              scope: `${scope}.emptyState.${targetDiscountClassLabel}`,
            })}
          </span>
          <span>
            {i18n.translate(
              `warning.with${currentDiscountClass.toLowerCase()}`,
              {
                scope: `${scope}.emptyState.${targetDiscountClassLabel}`,
              },
            )}
          </span>
        </p>
      </Stack.Item>
    </Stack>
  );
}

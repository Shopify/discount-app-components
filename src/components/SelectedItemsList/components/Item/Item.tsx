import React from 'react';
import {Button} from '@shopify/polaris';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import styles from './Item.scss';

interface Props {
  children: React.ReactNode;
  onRemove?: () => void;
}

export function Item({children, onRemove}: Props) {
  return (
    <li className={styles.Item}>
      <div className={styles.Content}>{children}</div>
      {onRemove && (
        <div className={styles.Actions}>
          <Button
            icon={CancelSmallMinor}
            variant="plain"
            onClick={() => onRemove()}
          />
        </div>
      )}
    </li>
  );
}

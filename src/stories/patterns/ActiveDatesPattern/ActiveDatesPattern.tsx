import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {ActiveDatesCard} from '../../../components/ActiveDatesCard';
import type {DateTime} from '../../../types';

export default function ActiveDatesPattern() {
  const [startTime, setStartTime] = useState<DateTime>(
    '2022-06-13T04:30:00.000Z',
  );
  const [endTime, setEndTime] = useState<DateTime | null>(
    '2022-06-14T03:30:00.000Z',
  );

  return (
    <Page>
      <ActiveDatesCard
        startDate={{
          value: startTime,
          onChange: setStartTime,
        }}
        endDate={{
          value: endTime,
          onChange: setEndTime,
        }}
        timezoneAbbreviation="EST"
      />
      selected values are: {startTime} - {endTime}
    </Page>
  );
}

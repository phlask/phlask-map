import { useMemo } from 'react';
import type { ResourceEntry } from 'types/ResourceEntry';
import { Stack, Typography } from '@mui/material';
import { isWithinInterval } from 'date-fns';

type ResourceHoursProps = {
  resource: ResourceEntry;
};

const ResourceHours = ({ resource }: ResourceHoursProps) => {
  const closingTime = useMemo(() => {
    const hours = resource.hours;
    if (!hours) {
      return null;
    }

    const now = new Date();
    const today = now.getDay();
    const hoursToday = hours[today];
    if (!hoursToday) {
      return null;
    }

    const closingTime = hoursToday.close;
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: true
    }).format(closingTime.date);
  }, [resource]);

  const isPlaceOpen = useMemo(() => {
    const hours = resource.hours;
    if (!hours) {
      return null;
    }

    const now = new Date();
    const today = now.getDay();
    const hoursToday = hours[today];
    if (!hoursToday) {
      return null;
    }

    return isWithinInterval(now, {
      start: hoursToday.open.date,
      end: hoursToday.close.date
    });
  }, [resource.hours]);

  const placeOpeningInfo = useMemo(() => {
    if (isPlaceOpen) {
      return { color: 'green', label: 'Open' };
    }
    if (typeof isPlaceOpen === 'undefined' || isPlaceOpen === null) {
      return { color: 'orange', label: 'Open times unavailable' };
    }

    return { color: 'red', label: 'Closed' };
  }, [isPlaceOpen]);

  return (
    <Stack direction="row">
      <Typography sx={{ fontSize: '0.875rem' }} color={placeOpeningInfo.color}>
        {placeOpeningInfo.label}
        {closingTime ? (
          <>
            <span>&nbsp;- Closes {closingTime}</span>
          </>
        ) : null}
      </Typography>
    </Stack>
  );
};

export default ResourceHours;

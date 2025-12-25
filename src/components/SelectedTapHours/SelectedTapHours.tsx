import { useMemo } from 'react';
import hours from 'helpers/hours';
import type { ResourceEntry } from 'types/ResourceEntry';
import { Stack, Typography } from '@mui/material';

type SelectedTapHoursProps = {
  selectedPlace: ResourceEntry;
};

const SelectedTapHours = ({ selectedPlace }: SelectedTapHoursProps) => {
  const closingTime = useMemo(() => {
    const currentDay = new Date().getDay();
    if (!selectedPlace.hours?.[currentDay]?.close.hour) {
      return null;
    }

    return hours.getSimpleHours(selectedPlace.hours[currentDay].close.hour);
  }, [selectedPlace]);
  const isPlaceOpen = useMemo(() => {
    const currentDay = new Date().getDay();

    if (!selectedPlace.hours?.[currentDay]) {
      return null;
    }

    return hours.checkOpen(
      selectedPlace.hours[currentDay].open.hour,
      selectedPlace.hours[currentDay].close.hour
    );
  }, [selectedPlace.hours]);

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

export default SelectedTapHours;

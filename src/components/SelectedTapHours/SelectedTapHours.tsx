import { useMemo } from 'react';
import hours from 'helpers/hours';
import styles from './SelectedTapHours.module.scss';
import type { ResourceEntry } from 'types/ResourceEntry';

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
  }, []);

  const placeOpeningInfo = useMemo(() => {
    if (isPlaceOpen) {
      return { color: 'green', label: 'Open' };
    }
    if (typeof isPlaceOpen === 'undefined' || isPlaceOpen === null) {
      return { color: 'orange', label: 'Open times unavailable' };
    }

    return { color: 'red', label: 'Closed' };
  }, []);

  return (
    <div className={styles.tapHoursMobile}>
      <div id="tap-info-org-status">
        <p style={{ color: placeOpeningInfo.color }}>
          {placeOpeningInfo.label}
        </p>
      </div>

      {closingTime && (
        <p>
          <span>&nbsp;-</span> <span>closes {closingTime}</span>
        </p>
      )}
    </div>
  );
};

export default SelectedTapHours;

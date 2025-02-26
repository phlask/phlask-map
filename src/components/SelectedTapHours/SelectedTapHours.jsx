import { useState, useEffect } from 'react';
import hours from 'helpers/hours';
import styles from './SelectedTapHours.module.scss';

/**
 *
 * @param {object} props
 * @param {import('types/ResourceEntry').ResourceEntry} [props.selectedPlace]
 * @param {boolean} [props.infoIsExpanded]
 * @returns
 */
const SelectedTapHours = ({ selectedPlace }) => {
  const currentDay = new Date().getDay();
  const [currentOrgHours, setCurrentOrgHours] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // update hoursList, currentOrgHours, and isOpen when selectedPlace changes

    // There are multiple formats that the hours can be in, so we need to check for each one
    // In the 7 entries case...
    if (selectedPlace.hours && selectedPlace.hours.length === 7) {
      const updatedHoursList = [];

      selectedPlace.hours.forEach((orgHours, index) => ({
        day: hours.getDays(index),
        open:
          orgHours.open !== undefined &&
          orgHours.open !== '' &&
          orgHours.open !== null
            ? hours.getSimpleHours(orgHours.open)
            : null,
        close:
          orgHours.close !== undefined &&
          orgHours.close !== '' &&
          orgHours.close !== null
            ? hours.getSimpleHours(orgHours.close)
            : null
      }));

      // Shift array so current day is first
      const date = new Date();
      const day = date.getDay();
      for (let x = 0; x < day; x += 1) {
        updatedHoursList.push(updatedHoursList.shift());
      }

      if (selectedPlace.hours[currentDay] !== undefined) {
        if (
          (selectedPlace.hours[currentDay].open !== undefined ||
            !selectedPlace.hours[currentDay].open) &&
          (selectedPlace.hours[currentDay].close !== undefined ||
            selectedPlace.hours[currentDay].close)
        ) {
          setCurrentOrgHours({
            day: hours.getDays(currentDay),
            open: hours.getSimpleHours(selectedPlace.hours[currentDay].open),
            close: hours.getSimpleHours(selectedPlace.hours[currentDay].close)
          });
          setIsOpen(
            hours.checkOpen(
              selectedPlace.hours[currentDay].open,
              selectedPlace.hours[currentDay].close
            )
          );
        } else {
          setCurrentOrgHours(false);
        }
      }
    } else {
      setCurrentOrgHours(false);
      setIsOpen(null);
    }
  }, [currentDay, selectedPlace]);

  let placeOpeningInfo;
  if (isOpen) {
    placeOpeningInfo = { color: 'green', label: 'Open' };
  } else if (typeof isOpen === 'undefined' || isOpen === null) {
    placeOpeningInfo = { color: 'orange', label: 'Open times unavailable' };
  } else if (!isOpen) {
    placeOpeningInfo = { color: 'red', label: 'Closed' };
  }

  return (
    <div className={styles.tapHoursMobile}>
      <div id="tap-info-org-status">
        <p style={{ color: placeOpeningInfo.color }}>
          {placeOpeningInfo.label}
        </p>
      </div>

      {currentOrgHours && (
        <p>
          <span>&nbsp;-</span> <span>closes {currentOrgHours.close}</span>
        </p>
      )}
    </div>
  );
};

export default SelectedTapHours;

import { useState, useEffect } from 'react';
import { hours } from '../../helpers/hours';
import styles from './SelectedTapHours.module.scss';
import useIsMobile from 'hooks/useIsMobile';

const SelectedTapHours = ({ infoIsExpanded, selectedPlace }) => {
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [currentOrgHours, setCurrentOrgHours] = useState(false);
  const [hoursList, setHoursList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // update hoursList, currentOrgHours, and isOpen when selectedPlace changes

    // There are multiple formats that the hours can be in, so we need to check for each one
    // In the 7 entries case...
    if (selectedPlace.hours && selectedPlace.hours.length === 7) {
      const hoursList = [];

      selectedPlace.hours.map((orgHours, index) => {
        const formattedHours = {
          day: hours.getDays(index),
          open:
            orgHours.open !== undefined && orgHours.open !== ''
              ? hours.getSimpleHours(orgHours.open)
              : null,
          close:
            orgHours.close !== undefined && orgHours.close !== ''
              ? hours.getSimpleHours(orgHours.close)
              : null
        };
        hoursList.push(formattedHours);
      });

      // Shift array so current day is first
      const date = new Date();
      const day = date.getDay();
      for (let x = 0; x < day; x++) {
        hoursList.push(hoursList.shift());
      }

      setHoursList(hoursList);

      setCurrentDay(new Date().getDay());

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
      setHoursList([]);
      setCurrentOrgHours(false);
      setIsOpen(null);
    }
  }, [currentDay, selectedPlace]);

  return (
    <>
      <div className={styles.tapHoursMobile}>
        <div id="tap-info-org-status">
          <p
            style={
              isOpen
                ? { color: 'green' }
                : isOpen !== null
                ? { color: 'red' }
                : { color: 'orange' }
            }
          >
            {isOpen
              ? 'Open'
              : isOpen !== null
              ? 'Closed'
              : 'Open times unavailable'}
          </p>
        </div>

        {currentOrgHours && (
          <p>
            <span>&nbsp;-</span> <span>closes {currentOrgHours.close}</span>
          </p>
        )}
      </div>
    </>
  );
};

export default SelectedTapHours;

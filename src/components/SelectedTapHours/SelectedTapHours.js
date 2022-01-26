import React, { useState, useEffect } from "react";
import { hours } from "../../helpers/hours";
import { isMobile } from "react-device-detect";
import styles from "./SelectedTapHours.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectedTapHours = ({ infoIsExpanded, selectedPlace }) => {
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [currentOrgHours, setCurrentOrgHours] = useState(false);
  const [hoursList, setHoursList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // update hoursList, currentOrgHours, and isOpen when selectedPlace changes
    if (selectedPlace.hours && selectedPlace.hours.length === 7) {
      const hoursList = [];

      selectedPlace.hours.map((orgHours, index) => {
        console.log(orgHours.open);
        const formattedHours = {
          day: hours.getDays(index),
          open:
            orgHours.open !== undefined && orgHours.open !== ""
              ? hours.getSimpleHours(orgHours.open)
              : null,
          close:
            orgHours.close !== undefined && orgHours.close !== ""
              ? hours.getSimpleHours(orgHours.close)
              : null
        };
        console.log(formattedHours);
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
  }, [selectedPlace]);

  return (
    <div id="org-hours">
      <div
        id="tap-info-org-status"
        style={
          isOpen
            ? { color: "green" }
            : isOpen !== null
            ? { color: "red" }
            : { color: "orange" }
        }
      >
        {isOpen ? "Open" : isOpen !== null ? "Closed" : "unavailable"}
      </div>
      {currentOrgHours && (
        <div id="hours-area">
          {/* Placeholder for Dropdown */}

          <div
            id="tap-info-hours-container-placeholder"
            style={
              currentOrgHours !== null ? { border: "1px solid #c4c4c4" } : {}
            }
          >
            <div className="tap-hours-list-item">Placeholder</div>
          </div>

          {/* Container of all visible hours elements */}
          <div
            id="tap-info-hours-container"
            style={
              currentOrgHours !== null ? { border: "1px solid #c4c4c4" } : {}
            }
          >
            {/* Placeholder for Dropdown */}
            <div id="current-hours-placeholder">
              <div className="tap-hours-list-item">
                {currentOrgHours !== null
                  ? currentOrgHours !== false
                    ? `${currentOrgHours.day} ${currentOrgHours.open} - ${currentOrgHours.close}`
                    : ""
                  : ""}
              </div>
              {(infoIsExpanded || !isMobile) &&
                hoursList !== null &&
                currentOrgHours !== false && (
                  <div className={styles.hoursDropdownArrowContainer}>
                    <FontAwesomeIcon
                      className={styles.hoursDropdownArrow}
                      color="#999"
                      size="2x"
                      icon={faCaretDown}
                    />
                  </div>
                )}
            </div>

            {/* Current Day Hours */}
            {/* Accessibility Note - This is using the Disclosure Pattern:
            https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/examples/disclosure/disclosure-faq.html*/}
            <div
              id="current-hours"
              role="button"
              tabIndex={0}
              aria-expanded="false"
              onKeyDown={() => {
                setIsHoursExpanded(true)
              }}
              onKeyUp={() => {
                setIsHoursExpanded(false)
              }}
              onClick={() => {
                if (infoIsExpanded || !isMobile) {
                  setIsHoursExpanded(!isHoursExpanded);
                }
              }}
            >
              <div className="tap-hours-list-item">
                {currentOrgHours !== null
                  ? currentOrgHours !== false
                    ? currentOrgHours.open // TODO: Update this logic so that "705 S. 5th St." shows closed on Tuesdays (or any business shows closed on current_day)
                      ? `${currentOrgHours.day} ${currentOrgHours.open} - ${currentOrgHours.close}`
                      : `${currentOrgHours.day} Closed`
                    : ""
                  : ""}
              </div>
              {(infoIsExpanded || !isMobile) &&
                hoursList !== null &&
                currentOrgHours !== false && (
                  <div className={styles.hoursDropdownArrowContainer}>
                    <FontAwesomeIcon
                      className={styles.hoursDropdownArrow}
                      color="#999"
                      size="2x"
                      icon={faCaretDown}
                    />
                  </div>
                )}
            </div>
            {/* Other Days */}
            {isHoursExpanded && (infoIsExpanded || !isMobile) ? (
              <div id="other-hours-container">
                {hoursList !== null ? (
                  hoursList.map((hours, index) => {
                    if (index !== 0) {
                      return (
                        <div className="tap-hours-list-item" key={index}>
                          {hours.open
                            ? `${hours.day} ${hours.open} - ${hours.close}`
                            : `${hours.day} Closed`}
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="tap-hours-list-item">n/a</div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedTapHours;

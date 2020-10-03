import React from "react";
import styles from "./SelectedTapIcons.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";
import {
  faFilter,
  faConciergeBell,
  faHandHoldingWater,
  faTint
} from "@fortawesome/free-solid-svg-icons";

const SelectedTapIcons = ({ place }) => {
  const icons = [];

  /*
   * handicap
   *
   * Yes
   * No
   */
  if (place.handicap === "Yes" || place.handicap === "No") {
    icons.push(
      <div className={styles.infoAttribute} key="handicap">
        <div
          className={`${styles.iconWrapper} ${place.handicap === "No" &&
            styles.strikethrough}`}
        >
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faAccessibleIcon}
          />
        </div>
        <span className={styles.iconLabel}>ADA Accessible</span>
      </div>
    );
  }

  /*
   * filtration
   *
   * Yes
   * No
   */
  if (place.filtration === "Yes" || place.filtration === "No") {
    icons.push(
      <div className={styles.infoAttribute} key="filtration">
        <div
          className={`${styles.iconWrapper} ${place.filtration === "No" &&
            styles.strikethrough}`}
        >
          <FontAwesomeIcon
            className={styles.infoIcon}
            color="#b9dbf3"
            icon={faFilter}
          />
        </div>
        <span className={styles.iconLabel}>Filtered</span>
      </div>
    );
  }

  /*
   * service
   *
   * Self-serve
   * Ask propietor
   */
  if (place.service === "Self-serve") {
    icons.push(
      <div className={styles.infoAttribute} key="service">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faHandHoldingWater}
          />
        </div>
        <span className={styles.iconLabel}>Self-serve</span>
      </div>
    );
  } else if (place.service === "Ask proprietor") {
    icons.push(
      <div className={styles.infoAttribute} key="service">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon className={styles.infoIcon} icon={faConciergeBell} />
        </div>
        <span className={styles.iconLabel}>Ask for service</span>
      </div>
    );
  }

  /*
   * tap_type
   *
   * Drinking Fountain
   * Bottle filler and fountain
   * Sink
   * Soda fountain
   * Dedicated water dispenser
   * Water cooler
   */
  if (place.tap_type === "Drinking Fountain") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Drinking Fountain</span>
      </div>
    );
  } else if (place.tap_type === "Bottle filler and fountain") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Bottle Filler / Fountain</span>
      </div>
    );
  } else if (place.tap_type === "Sink") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Sink</span>
      </div>
    );
  } else if (place.tap_type === "Soda fountain") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Soda fountain</span>
      </div>
    );
  } else if (place.tap_type === "Dedicated water dispenser") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Dispenser</span>
      </div>
    );
  } else if (place.tap_type === "Water cooler") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Water cooler</span>
      </div>
    );
  }

  /*
   * vessel
   *
   * yes
   * no
   */
  if (place.vessel === "yes" || place.vessel === "no") {
    icons.push(
      <div className={styles.infoAttribute} key="vessel">
        <div
          className={`${styles.iconWrapper} ${place.vessel === "No" &&
            styles.strikethrough}`}
        >
          <FontAwesomeIcon className={styles.infoIcon} icon={faTint} />
        </div>
        <span className={styles.iconLabel}>Vessel</span>
      </div>
    );
  }

  /*
   * sparkling
   *
   * yes
   */
  if (place.sparkling === "yes") {
    icons.push(
      <div className={styles.infoAttribute} key="sparkling">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Sparkling</span>
      </div>
    );
  }

  /*
   * access
   *
   * school
   * park & rec
   * congregation
   */
  if (place.access === "school") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>School</span>
      </div>
    );
  } else if (place.access === "park & rec") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>Parks & Rec</span>
      </div>
    );
  } else if (place.access === "congregation") {
    icons.push(
      <div className={styles.infoAttribute} key="tap_type">
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faTint}
            color="#b9dbf3"
          />
        </div>
        <span className={styles.iconLabel}>congregation</span>
      </div>
    );
  }

  /*
   * id_required
   *
   * yes
   * no
   */
  if (place.id_required === "yes" || place.id_required === "no") {
    icons.push(
      <div className={styles.infoAttribute} key="id_required">
        <div
          className={`${styles.iconWrapper} ${place.id_required === "No" &&
            styles.strikethrough}`}
        >
          <FontAwesomeIcon className={styles.infoIcon} icon={faTint} />
        </div>
        <span className={styles.iconLabel}>ID Required</span>
      </div>
    );
  }

  /*
   * kid_only
   *
   * yes
   * no
   */
  if (place.kid_only === "yes" || place.kid_only === "no") {
    icons.push(
      <div className={styles.infoAttribute} key="kid_only">
        <div
          className={`${styles.iconWrapper} ${place.kid_only === "No" &&
            styles.strikethrough}`}
        >
          <FontAwesomeIcon className={styles.infoIcon} icon={faTint} />
        </div>
        <span className={styles.iconLabel}>Kids Only</span>
      </div>
    );
  }

  return (
    <>{icons.length > 0 && <div className={styles.infoList}>{icons}</div>}</>
  );
};

export default SelectedTapIcons;

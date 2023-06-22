import { Button, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import styles from './SelectedTapMobileInfo.module.scss';

import { ReactComponent as DirectionIcon } from '../images/ArrowElbowUpRight.svg';
import { ReactComponent as CaretDownSvg } from '../images/CaretDown.svg';
import { ReactComponent as ThreeDotSvg } from '../images/DotsThree.svg';
import { ReactComponent as ExportSvg } from '../images/Export.svg';

function SelectedTapMobile(props) {
  const [tags, setTags] = useState([]);
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [pointerPositionY, setPointerPositionY] = useState(0);

  const { image, estWalkTime, selectedPlace } = props;

  const { organization, address, infoIcon } = selectedPlace;

  const { filtration, handicap, service, sparkling, tap_type, vessel } =
    selectedPlace;
  const { description, statement, norms_rules } = selectedPlace;

  const directionBtnStyle = {
    padding: '6px 20px 6px 25px',
    margin: '10px 0',
    fontSize: 16,
    borderRadius: '8px',
    textTransform: 'none',
    backgroundColor: '#00A5EE'
  };

  const TagButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    display: 'inline-block',
    wordWrap: 'break-word',
    fontSize: 14,
    color: '#2D3748',
    padding: '5px 7px',
    marginRight: '5px',
    marginBottom: '15px',
    border: '1px solid #2D3748',
    lineHeight: 1.5
  });

  useEffect(() => {
    const showTags = () => {
      const shownTags = [];
      if (filtration === 'yes') {
        shownTags.push('Filtered');
      }
      if (handicap === 'yes') {
        shownTags.push('ADA Accessible');
      }
      if (service) {
        shownTags.push(service);
      }
      if (vessel != 'yes') {
        shownTags.push('Vessel Needed');
      }

      if (tap_type) {
        shownTags.push(tap_type);
      }
      return shownTags;
    };
    setTags(showTags());
  }, []);

  // Expanding and Minimizing the Modal
  const detectSwipe = e => {
    setPointerPositionY(e.nativeEvent.offsetY);

    // if (!toggleCollapse && e.nativeEvent.offsetY < pointerPositionY) {
    if (!toggleCollapse && e.nativeEvent.offsetY < 0) {
      setToggleCollapse(true);
    }
  };

  const minimizeModal = () => {
    setToggleCollapse(false);
  };

  const toggleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      });
      //.then(() => console.log('Successful share'))
      // .catch(error => console.log('Error sharing:', error));
    }
  };

  return (
    <div className={styles.halfInfo} onPointerMove={detectSwipe}>
      {!toggleCollapse ? (
        <button className={styles.swipeIcon}></button>
      ) : (
        <div className={styles.expandedToolBar}>
          <IconButton color="primary" aria-label="" onClick={minimizeModal}>
            <CaretDownSvg />
          </IconButton>
          <div>
            <IconButton
              color="primary"
              aria-label="export"
              component="label"
              onClick={toggleNativeShare}
            >
              <ExportSvg />
            </IconButton>
            <IconButton color="primary" aria-label="more" component="label">
              <ThreeDotSvg />
            </IconButton>
          </div>
          {/* Currently the three dot button does nothing */}
        </div>
      )}
      <img src={image} className={styles.locationImage} alt="" />
      <div className={styles.mainHalfInfo}>
        {infoIcon && <img src={infoIcon} alt="" />}
        <div className={styles.mainHalfInfoText}>
          <h2 className={styles.organization}>{organization}</h2>
          <p>{address}</p>
          {props.children}
          <Button
            variant="contained"
            disableElevation
            sx={directionBtnStyle}
            startIcon={<DirectionIcon />}
          >
            Directions
          </Button>
          <p className={styles.estWalkTime}>
            Est. walking time:{' '}
            <span className={styles.walkTime}>{estWalkTime}min</span>
          </p>
        </div>
      </div>

      <Collapse in={toggleCollapse} timeout="auto" unmountOnExit>
        <div className={styles.halfInfoExpand}>
          <div className={styles.tagGroup}>
            <hr className={styles.topDivider} />
            {tags.map((tag, index) => (
              <TagButton size="small" variant="outlined" key={index}>
                {tag}
              </TagButton>
            ))}
            <hr />
          </div>
          <div className={styles.details}>
            <h3>Description</h3>
            <p>{description ? description : 'N/A'}</p>
          </div>
          <div className={styles.details}>
            <h3>PHLASK Statement</h3>
            <p>{statement ? statement : 'N/A'}</p>
          </div>
          <div className={styles.details}>
            <h3>Norms &#38; Rules </h3>
            <p>{norms_rules ? norms_rules : 'N/A'}</p>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default SelectedTapMobile;

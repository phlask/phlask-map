import { Button, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import styles from './SelectedTapMobileInfo.module.scss';

import { ReactComponent as DirectionIcon } from '../images/ArrowElbowUpRight.svg';
import { ReactComponent as CaretDownSvg } from '../images/CaretDown.svg';
import { ReactComponent as ThreeDotSvg } from '../images/DotsThree.svg';
import { ReactComponent as ExportSvg } from '../images/Export.svg';

import FountainIcon from '../icons/CircleWaterIcon.svg';

function getIconForTapType(tapType) {
  switch (tapType) {
    case 'Drinking Fountain':
      return FountainIcon;
    case 'Bottle filler and fountain':
      return '/static/images/BottleFiller.png';
    case 'Sink':
      return '/static/images/Sink.png';
    default:
      return FountainIcon;
  }
}


function SelectedTapMobile(props) {
  const [tags, setTags] = useState([]);
  const [pointerPositionY, setPointerPositionY] = useState(0);

  const { image, estWalkTime, selectedPlace, infoCollapse, setInfoCollapse } =
    props;

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
    backgroundColor: '#00A5EE',
    width: '150px'
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
    marginBottom: '5px',
    border: '1px solid #2D3748',
    lineHeight: 1.5
  });

  // Setup tags to display, such as the type of water, filtration, etc.
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

    if (!infoCollapse && e.nativeEvent.offsetY < 0) {
      setInfoCollapse(true);
    }
  };

  const minimizeModal = () => {
    setInfoCollapse(false);
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
      {!infoCollapse ? (
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
        <img src={getIconForTapType(selectedPlace.tap_type)} alt="" style={{width: '52px'}}/>
        <div className={styles.mainHalfInfoText}>
          <h2 className={styles.organization}>{organization}</h2>
          <p>{address}</p>
          {props.children}
          <Button
            onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=' + selectedPlace.lat + ',' + selectedPlace.lon, '_blank')}
            variant="contained"
            disableElevation
            sx={directionBtnStyle}
            fullWidth={false}
            startIcon={<DirectionIcon />}
          >
            Directions
          </Button>
          <p className={styles.estWalkTime}>
            Est. walking time:{' '}
            <span className={styles.walkTime}>{estWalkTime} min</span>
          </p>
        </div>
      </div>

      <div className={styles.tagGroup}>
        <hr className={styles.topDivider} />
        {tags.map((tag, index) => (
          <TagButton size="small" variant="outlined" key={index}>
            {tag}
          </TagButton>
        ))}
        <hr className={styles.botDivider}/>
      </div>

      <Collapse in={infoCollapse} timeout="auto" unmountOnExit>
        <div className={styles.halfInfoExpand}>
          <div className={styles.details}>
            <h3>Description</h3>
            <p>{description ? description : 'No description provided'}</p>
          </div>
          <div className={styles.details}>
            <h3>PHLASK Statement</h3>
            <p>{statement ? statement : 'No statement provided'}</p>
          </div>
          <div className={styles.details}>
            <h3>Norms &#38; Rules </h3>
            <p>{norms_rules ? norms_rules : 'No rules provided'}</p>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default SelectedTapMobile;

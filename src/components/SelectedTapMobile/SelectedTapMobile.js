import { Button, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import styles from './SelectedTapMobileInfo.module.scss';

import { ReactComponent as DirectionIcon } from '../images/ArrowElbowUpRight.svg';
import { ReactComponent as CaretDownSvg } from '../images/CaretDown.svg';
import { ReactComponent as ThreeDotSvg } from '../images/DotsThree.svg';
import { ReactComponent as ExportSvg } from '../images/Export.svg';

import FountainIcon from '../icons/CircleWaterIcon.svg';

function SelectedTapMobile(props) {
  const [pointerPositionY, setPointerPositionY] = useState(0);

  const { image, estWalkTime, infoCollapse, setInfoCollapse } = props;

  /**
   * @type {ResourceEntry}
   */
  const resource = props.selectedPlace;

  const icon = FountainIcon; // TODO: Add other icons

  // From resource info, collect all the tags.
  const tags = [
    resource.water,
    resource.food,
    resource.forage,
    resource.bathroom
  ]
    .filter(Boolean) // Filter out any missing resources if it is not that type
    .flatMap(item => item.tags) // if tags doesn't guarantee to be an array, we can fallback
    .filter(Boolean) // Tags are optional, so filter out missing tags too
    .sort();

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
            {/* TODO: Add this back in once we have real options! */}
            {/*<IconButton color="primary" aria-label="more" component="label">*/}
            {/*  <ThreeDotSvg />*/}
            {/*</IconButton>*/}
          </div>
          {/* Currently the three dot button does nothing */}
        </div>
      )}
      <img src={image} className={styles.locationImage} alt="" />
      <div className={styles.mainHalfInfo}>
        <img
          src={icon}
          alt={resource.resource_type}
          style={{ width: '52px' }}
        />
        <div className={styles.mainHalfInfoText}>
          <h2 className={styles.organization}>{resource.name}</h2>
          <p>{resource.address}</p>
          {props.children}
          <Button
            onClick={() =>
              window.open(
                'https://www.google.com/maps/dir/?api=1&destination=' +
                  resource.latitude +
                  ',' +
                  resource.longitude,
                '_blank'
              )
            }
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
            {tag.replace('_', ' ')}
          </TagButton>
        ))}
        {tags.length > 0 && <hr className={styles.botDivider} />}
      </div>

      <Collapse in={infoCollapse} timeout="auto" unmountOnExit>
        <div className={styles.halfInfoExpand}>
          <div className={styles.details}>
            <h3>Description</h3>
            <p>
              {resource.description
                ? resource.description
                : 'No description provided'}
            </p>
          </div>
          <div className={styles.details}>
            <h3>Guidelines</h3>
            <p>
              {resource.guidelines
                ? resource.guidelines
                : 'No statement provided'}
            </p>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default SelectedTapMobile;

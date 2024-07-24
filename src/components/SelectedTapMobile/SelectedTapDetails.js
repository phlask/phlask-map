import { Button, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import styles from './SelectedTapMobileInfo.module.scss';
import CloseIcon from '@mui/icons-material/Close';

import { ReactComponent as DirectionIcon } from '../images/ArrowElbowUpRight.svg';
import { ReactComponent as CaretDownSvg } from '../images/CaretDown.svg';
import { ReactComponent as ExportSvg } from '../images/Export.svg';

import FountainIcon from '../icons/CircleWaterIcon.svg';
import ForagingIcon from '../icons/CircleForagingIcon.svg';
import FoodIcon from '../icons/CircleFoodIcon.svg';
import BathroomIcon from '../icons/CircleBathroomIcon.svg';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE
} from '../../types/ResourceEntry';

function SelectedTapDetails(props) {
  const [pointerPositionY, setPointerPositionY] = useState(0);

  const {
    image,
    estWalkTime,
    infoCollapse,
    setInfoCollapse,
    isMobile,
    closeModal
  } = props;

  /**
   * @type {ResourceEntry}
   */
  const resource = props.selectedPlace;

  let icon;
  switch (resource.resource_type) {
    case WATER_RESOURCE_TYPE:
      icon = FountainIcon;
      break;
    case FORAGE_RESOURCE_TYPE:
      icon = ForagingIcon;
      break;
    case FOOD_RESOURCE_TYPE:
      icon = FoodIcon;
      break;
    default:
      icon = BathroomIcon;
  }

  // From resource info, collect all the tags.
  const tags = getTagsFromResource(resource);

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
    if (!isMobile) {
      return;
    }
    setPointerPositionY(e.nativeEvent.offsetY);

    if (!infoCollapse && e.nativeEvent.offsetY < 0) {
      setInfoCollapse(true);
    }
  };

  const minimizeModal = () => {
    if (!isMobile) {
      return;
    }
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
      {isMobile && !infoCollapse ? (
        <button className={styles.swipeIcon}></button>
      ) : (
        <div className={styles.expandedToolBar}>
          <div>
            <IconButton
              color="primary"
              aria-label="share"
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
          {/* On mobile, show the minimize button. On desktop, show the close button */}
          {isMobile && (
            <IconButton color="primary" aria-label="" onClick={minimizeModal}>
              <CaretDownSvg />
            </IconButton>
          )}
          {!isMobile && (
            <IconButton
              color="primary"
              aria-label="close"
              onClick={() => {
                closeModal();
              }}
              sx={{
                position: 'absolute',
                right: '20px',
                top: 5,
                color: 'black'
              }}
              size="large"
            >
              <CloseIcon fontSize="18px" />
            </IconButton>
          )}
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
          <h2 className={styles.organization} data-cy="tap-organization-name">
            {resource.name}
          </h2>
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

      <Collapse in={infoCollapse || !isMobile} timeout="auto" unmountOnExit>
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

/**
 * Get a list of tags to display for a resources
 * @param {ResourceEntry} resource
 * @returns {Array<string>} A list of tags to display in the UI
 */
function getTagsFromResource(resource) {
  // First, get the tags
  const tags = [
    resource.water,
    resource.food,
    resource.forage,
    resource.bathroom
  ]
    .filter(Boolean) // Filter out any missing resources if it is not that type
    .flatMap(item => item.tags);

  // Then , get resource-specific information
  if (resource.water) {
    tags.push(...(resource.water.dispenser_type || []));
  }
  if (resource.food) {
    tags.push(...(resource.food.food_type || []));
    tags.push(...(resource.food.distribution_type || []));
    tags.push(...(resource.food.organization_type || []));
  }
  if (resource.forage) {
    tags.push(resource.forage.forage_type);
  }

  return tags.filter(Boolean).sort(); // Tags are optional, so filter out missing tags too
}

export default SelectedTapDetails;

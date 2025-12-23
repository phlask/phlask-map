import {
  Button,
  IconButton,
  SvgIcon,
  Menu,
  MenuItem,
  Toolbar,
  AppBar,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import DirectionIcon from 'icons/ArrowElbowUpRight';
import CaretDownSvg from 'icons/CaretDown';
import ExportSvg from 'icons/Export';

import FountainIcon from 'icons/CircleWaterIcon';
import ForagingIcon from 'icons/CircleForagingIcon';
import FoodIcon from 'icons/CircleFoodIcon';
import BathroomIcon from 'icons/CircleBathroomIcon';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  type ResourceEntry
} from 'types/ResourceEntry';

import VerificationButton from 'components/Verification/VerificationButton';
import useIsMobile from 'hooks/useIsMobile';
import { useState, type MouseEventHandler, type ReactNode } from 'react';
import noop from 'utils/noop';

import styles from './SelectedTapDetails.module.scss';
import EstimatedWalkingDuration from 'components/EstimatedWalkTime/EstimatedWalkTime';

/**
 * Converts degrees given in decimal to DMS (degrees, minutes, and seconds), where seconds are
 * rounded to the tenth place. The returned degrees are not clamped or wrapped in any way.
 *
 * @param {number} degrees Degrees given in decimal
 */
function decimalDegreesToDMS(decimalDegrees: number) {
  let integralDegrees = Math.trunc(decimalDegrees);
  const fractionalDegrees =
    Math.abs(decimalDegrees) - Math.abs(integralDegrees);
  const fractionalDegreesInMinutes = fractionalDegrees * 60;
  let minutes = Math.trunc(fractionalDegreesInMinutes);
  const remainingFractionalDegreesInMinutes =
    fractionalDegreesInMinutes - minutes;
  const seconds = remainingFractionalDegreesInMinutes * 60;
  let roundedSeconds = Number(seconds.toFixed(1));
  // Account for rounding edge case
  if (roundedSeconds === 60) {
    minutes += 1;
    roundedSeconds = 0;
  }
  if (minutes === 60) {
    integralDegrees += 1;
    minutes = 0;
  }
  return {
    deg: integralDegrees,
    min: minutes,
    sec: roundedSeconds
  };
}

/**
 * Returns a formatted string with the latitude and longitude.
 * Example return value: 13°39'49.7"N 45°9'35.6"E
 *
 * Clamps latitude values to be within [-90, 90] and wraps longitude
 * values to be within [-180, 180).
 */
function getFormattedLatLong(latitude: number, longitude: number) {
  let clampedLatitude;
  const wrappedLongitude = longitude % 180;

  if (latitude < -90) clampedLatitude = -90;
  else if (latitude > 90) clampedLatitude = 90;
  else clampedLatitude = latitude;

  const latitudeDMS = decimalDegreesToDMS(clampedLatitude);
  const longitudeDMS = decimalDegreesToDMS(wrappedLongitude);

  const latitudeDir = latitudeDMS.deg < 0 ? 'S' : 'N';
  const longitudeDir = longitudeDMS.deg < 0 ? 'W' : 'E';

  const latitudeFormatted = `${latitudeDMS.deg}\u00B0${latitudeDMS.min}'${latitudeDMS.sec}"${latitudeDir}`;
  const longitudeFormatted = `${longitudeDMS.deg}\u00B0${longitudeDMS.min}'${longitudeDMS.sec}"${longitudeDir}`;

  return `${latitudeFormatted} ${longitudeFormatted}`;
}

/**
 * Get a list of tags to display for a resources
 */
function getTagsFromResource(resource: ResourceEntry): string[] {
  // First, get the tags
  const tags: string[] = [
    resource.water,
    resource.food,
    resource.forage,
    resource.bathroom
  ]
    .filter(Boolean) // Filter out any missing resources if it is not that type
    .flatMap(item => item!.tags);

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
    tags.push(...(resource.forage.forage_type || []));
  }

  return tags.filter(Boolean).sort(); // Tags are optional, so filter out missing tags too
}

type SelectedTapDetailsProps = {
  image: string;
  onClose?: VoidFunction;
  selectedPlace: ResourceEntry | null;
  isError?: boolean;
  children: ReactNode;
  onStartEdit: VoidFunction;
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

const SelectedTapDetails = ({
  image,
  onClose = noop,
  selectedPlace,
  isError = false,
  children,
  onStartEdit
}: SelectedTapDetailsProps) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const isMobile = useIsMobile();

  if (isError) {
    return (
      <Stack
        textAlign="center"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          The Resource you're looking for was not found. Please close this
          dialog and select another one
        </Typography>
      </Stack>
    );
  }

  if (!selectedPlace) {
    return null;
  }

  const handleMenuOpen: MouseEventHandler<HTMLButtonElement> = event => {
    // We use event.currentTarget to ensure we target the button, not the SVG Icon
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }

    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleSuggestEdit = () => {
    onStartEdit();
    handleMenuClose();
  };

  const latLongFormatted = getFormattedLatLong(
    selectedPlace.latitude,
    selectedPlace.longitude
  );

  // Assign title and subtitles, using fallbacks when data is missing
  let resourceTitle = '';
  let resourceSubtitleOne;
  let resourceSubtitleTwo;

  if (
    selectedPlace.name &&
    selectedPlace.name.trim().length > 0 &&
    selectedPlace.address &&
    selectedPlace.address.trim().length > 0
  ) {
    resourceTitle = selectedPlace.name;
    resourceSubtitleOne = selectedPlace.address;
    resourceSubtitleTwo = latLongFormatted;
  } else if (selectedPlace.name && selectedPlace.name.trim().length > 0) {
    resourceTitle = selectedPlace.name;
    resourceSubtitleOne = latLongFormatted;
  } else if (selectedPlace.address && selectedPlace.address.trim().length > 0) {
    resourceTitle = selectedPlace.address;
    resourceSubtitleOne = latLongFormatted;
  } else if (
    selectedPlace.latitude !== undefined &&
    selectedPlace.longitude !== undefined
  ) {
    resourceTitle = latLongFormatted;
  }

  let icon;
  switch (selectedPlace.resource_type) {
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
  const tags = getTagsFromResource(selectedPlace);

  const directionBtnStyle = {
    padding: '6px 20px 6px 25px',
    margin: '10px 0',
    fontSize: 16,
    borderRadius: '8px',
    textTransform: 'none',
    backgroundColor: '#00A5EE',
    width: '150px'
  };

  const toggleNativeShare = () => {
    if (!navigator.share) {
      return;
    }

    navigator.share({
      title: document.title,
      url: window.location.href
    });
  };

  return (
    <>
      <div className={styles.halfInfo}>
        {isMobile ? (
          <button
            className={styles.swipeIcon}
            aria-label="swipe"
            type="button"
          />
        ) : (
          <AppBar
            position="sticky"
            color="inherit"
            sx={{ marginTop: '4px' }}
            elevation={0}
          >
            <Toolbar
              sx={theme => ({
                justifyContent: 'space-between',
                [theme.breakpoints.up('md')]: {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              })}
            >
              <Stack direction="row">
                <IconButton
                  aria-label="more options"
                  onClick={handleMenuOpen}
                  sx={{ color: '#2D3748' }}
                >
                  <MoreHorizIcon />
                </IconButton>

                <IconButton
                  color="primary"
                  aria-label="share"
                  component="label"
                  onClick={toggleNativeShare}
                >
                  <ExportSvg />
                </IconButton>
              </Stack>

              <IconButton
                color="primary"
                aria-label="Close tap details"
                onClick={onClose}
              >
                {isMobile ? (
                  <CaretDownSvg />
                ) : (
                  <CloseIcon sx={{ fontSize: '18px' }} />
                )}
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <div
          style={{
            width: '100%',
            height: '100px',
            borderRadius: '8px',
            position: 'relative'
          }}
        >
          <img src={image} className={styles.locationImage} alt="" />
          <VerificationButton resource={selectedPlace} />
        </div>
        <div className={styles.mainHalfInfo}>
          <SvgIcon
            sx={{
              width: '48px',
              height: '48px'
            }}
            viewBox="0 0 85 85"
            component={icon}
          />
          <div className={styles.mainHalfInfoText}>
            <h2 className={styles.organization} data-cy="tap-organization-name">
              {resourceTitle}
            </h2>
            <p className={styles.subtitles}>
              {resourceSubtitleOne}
              <br />
              {resourceSubtitleTwo}
            </p>
            {children}
            <Button
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.latitude},${selectedPlace.longitude}`}
              target="_blank"
              variant="contained"
              disableElevation
              sx={directionBtnStyle}
              fullWidth={false}
              startIcon={<DirectionIcon />}
            >
              Directions
            </Button>
            <EstimatedWalkingDuration selectedPlace={selectedPlace} />
          </div>
        </div>

        <div className={styles.tagGroup}>
          <hr className={styles.topDivider} />
          {tags.map(tag => (
            <TagButton size="small" variant="outlined" key={tag}>
              {tag.replace('_', ' ')}
            </TagButton>
          ))}
          {tags.length > 0 && <hr className={styles.botDivider} />}
        </div>

        <div className={styles.halfInfoExpand}>
          <div className={styles.details}>
            <h3>Description</h3>
            <p>
              {selectedPlace.description
                ? selectedPlace.description
                : 'No description provided'}
            </p>
          </div>
          <div className={styles.details}>
            <h3>Guidelines</h3>
            <p>
              {selectedPlace.guidelines
                ? selectedPlace.guidelines
                : 'No statement provided'}
            </p>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSuggestEdit}>Suggest Edit</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#EF4444' }}>
          Report
        </MenuItem>
      </Menu>
    </>
  );
};

export default SelectedTapDetails;

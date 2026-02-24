import {
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  AppBar,
  Stack,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import CaretDownSvg from 'icons/CaretDown';
import ExportSvg from 'icons/Export';

import { type ResourceEntry } from 'types/ResourceEntry';

import VerificationButton from 'components/Verification/VerificationButton';
import useIsMobile from 'hooks/useIsMobile';
import { useState, type MouseEventHandler } from 'react';
import noop from 'utils/noop';

import sampleImg from 'assets/images/phlask-tessellation.png';

import EstimatedWalkingDuration from 'components/EstimatedWalkTime/EstimatedWalkTime';
import ResourceHours from 'components/ResourceHours/ResourceHours';
import getFormattedCoordinates from 'utils/getFormattedCoordinates';
import ResourceIcon from 'components/ResourceIcon/ResourceIcon';
import GetDirectionsButton from 'components/GetDirectionsButton/GetDirectionsButton';
import SelectedResourceTags from 'components/SelectedResourceTags/SelectedResourceTags';
import ProvidedBy from 'components/ProvidedBy/ProvidedBy';

type SelectedResourceDetailsProps = {
  onClose?: VoidFunction;
  resource: ResourceEntry | null;
  isError?: boolean;
  onStartEdit: VoidFunction;
};

const SelectedResourceDetails = ({
  onClose = noop,
  isError = false,
  resource,
  onStartEdit
}: SelectedResourceDetailsProps) => {
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

  if (!resource) {
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

  const { name, address, latitude, longitude } = resource;

  const formattedCoordinates = getFormattedCoordinates(latitude, longitude);

  const hasName = Boolean(name?.trim());
  const hasAddress = Boolean(address?.trim());

  const title = (name || address)?.trim() || formattedCoordinates;

  const subtitleLineOne =
    hasName && hasAddress ? resource.address : formattedCoordinates;

  const subtitleLineTwo = hasName && hasAddress ? formattedCoordinates : null;

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
      <Stack paddingInline="20px" paddingBlock="10px 20px" gap={2.5}>
        <AppBar position="sticky" color="inherit" elevation={0}>
          <Toolbar
            disableGutters
            sx={theme => ({
              justifyContent: 'space-between',
              minHeight: 'unset',
              [theme.breakpoints.up('md')]: {
                paddingLeft: 0,
                paddingRight: 0,
                minHeight: 'unset'
              }
            })}
          >
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

            <Stack direction="row">
              <IconButton
                color="primary"
                aria-label="share"
                component="label"
                onClick={toggleNativeShare}
              >
                <ExportSvg />
              </IconButton>

              <IconButton
                aria-label="more options"
                onClick={handleMenuOpen}
                sx={{ color: '#2D3748' }}
              >
                <MoreHorizIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <Box
          sx={theme => ({
            borderRadius: '8px',
            position: 'relative',
            maxHeight: '108px',
            [theme.breakpoints.up('md')]: { maxHeight: '200px' }
          })}
        >
          <img
            src={sampleImg}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: '8px'
            }}
            alt={title ?? 'An illustration of the PHLask resources'}
          />
          <VerificationButton resource={resource} />
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={2} alignItems="flex-start">
            <ResourceIcon type={resource.resource_type} />
            <Stack gap="6px" spacing={0}>
              <Typography
                variant="h2"
                color="#2D3748"
                sx={{ fontFamily: 'Inter', fontSize: '1.25rem' }}
                data-cy="tap-organization-name"
              >
                {title}
              </Typography>
              <Stack sx={{ color: '#60718C' }}>
                <Typography sx={{ fontSize: '0.875rem' }}>
                  {subtitleLineOne}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem' }}>
                  {subtitleLineTwo}
                </Typography>
                <ResourceHours resource={resource} />
              </Stack>
              <Stack gap="8px" paddingTop="12px">
                <GetDirectionsButton
                  latitude={resource.latitude}
                  longitude={resource.longitude}
                />
                <EstimatedWalkingDuration selectedResource={resource} />
              </Stack>
            </Stack>
          </Stack>
          <Stack gap={1.5}>
            {!isMobile && resource.last_modified ? (
              <Stack>
                <Typography fontWeight={600}>Last Modified</Typography>
                <Typography color="#60718C">
                  {new Date(resource.last_modified).toDateString()}
                </Typography>
              </Stack>
            ) : null}
            <ProvidedBy providers={resource.providers} />
          </Stack>
        </Stack>

        <SelectedResourceTags resource={resource} />

        <Stack gap="3px">
          <Typography fontSize={14} fontWeight={600}>
            Description
          </Typography>
          <Typography fontSize={14} color="#60718C">
            {resource.description
              ? resource.description
              : 'No description provided'}
          </Typography>
        </Stack>
        <Stack gap="3px">
          <Typography fontSize={14} fontWeight={600}>
            Guidelines
          </Typography>
          <Typography fontSize={14} color="#60718C">
            {resource.guidelines
              ? resource.guidelines
              : 'No statement provided'}
          </Typography>
        </Stack>
      </Stack>

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

export default SelectedResourceDetails;

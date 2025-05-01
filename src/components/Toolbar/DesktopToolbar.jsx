import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

import ContributeIcon from 'icons/ContributeIcon';
import FilterIcon from 'icons/FilterIcon';
import ResourceIcon from 'icons/ResourceIcon';
import SearchIcon from 'icons/SearchIcon';
import { useSelector } from 'react-redux';
import NearMeButton from 'components/NearMeButton/NearMeButton';
import {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH
} from 'actions/actions';

const Item = ({ onClick, icon, label, type }) => {
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const isWideScreen = useMediaQuery('(min-width:1440px)');
  const blackToGrayFilter =
    'invert(43%) sepia(20%) saturate(526%) hue-rotate(178deg) brightness(95%) contrast(93%)';

  const testVariants = {
    [TOOLBAR_MODAL_RESOURCE]: 'resource',
    [TOOLBAR_MODAL_FILTER]: 'filter',
    [TOOLBAR_MODAL_SEARCH]: 'search',
    [TOOLBAR_MODAL_CONTRIBUTE]: 'contribute'
  };

  return (
    <IconButton
      variant="text"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: isWideScreen ? 40 : 32,
        minWidth: isWideScreen ? 85 : 71,
        minHeight: isWideScreen ? 61 : 51,
        padding: 0,
        filter: toolbarModal === type ? blackToGrayFilter : 'none',
        '&:hover': {
          backgroundColor: 'transparent',
          filter: blackToGrayFilter
        }
      }}
      onClick={onClick}
      disableFocusRipple
      disableRipple
      data-cy={`button-${testVariants[type]}-type-menu`}
    >
      {icon}
      <Typography
        style={{ 
          textTransform: 'none', 
          color: 'black',
          fontSize: isWideScreen ? 16 : 14
        }}
        fontWeight={500}
      >
        {label}
      </Typography>
    </IconButton>
  );
};

const DesktopToolbar = ({ onItemClick, onNearMeClick }) => {
  const resourceType = useSelector(state => state.filterMarkers.resourceType);
  const isWideScreen = useMediaQuery('(min-width:1440px)');

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        left: '32px',
        bottom: '32px',
        px: isWideScreen ? '48px' : '40px',
        py: isWideScreen ? '16px' : '12px',
        gap: isWideScreen ? '48px' : '40px',
        backgroundColor: 'white',
        boxShadow:
          '0px 3px 8px 0px rgba(0, 0, 0, 0.11), 0px 2px 4px 0px rgba(0, 0, 0, 0.21)',
        minWidth: isWideScreen ? '480px' : '400px',
        borderRadius: '10px',
        justifyContent: 'space-between',
        zIndex: 1
      }}
    >
      <NearMeButton resourceType={resourceType} onClick={onNearMeClick} />
      <Item
        icon={<ResourceIcon />}
        label="Resources"
        onClick={() => onItemClick(TOOLBAR_MODAL_RESOURCE)}
        type={TOOLBAR_MODAL_RESOURCE}
      />
      <Item
        icon={<FilterIcon />}
        label="Filter"
        onClick={() => onItemClick(TOOLBAR_MODAL_FILTER)}
        type={TOOLBAR_MODAL_FILTER}
      />
      <Item
        icon={<SearchIcon />}
        label="Search"
        onClick={() => onItemClick(TOOLBAR_MODAL_SEARCH)}
        type={TOOLBAR_MODAL_SEARCH}
      />
      <Item
        icon={<ContributeIcon />}
        label="Add Site"
        onClick={() => onItemClick(TOOLBAR_MODAL_CONTRIBUTE)}
        type={TOOLBAR_MODAL_CONTRIBUTE}
      />
    </Box>
  );
};

export default DesktopToolbar;

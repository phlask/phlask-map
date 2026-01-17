import Box from '@mui/material/Box';

import ContributeIcon from 'icons/ContributeIcon';
import FilterIcon from 'icons/FilterIcon';
import ResourceIcon from 'icons/ResourceIcon';
import SearchIcon from 'icons/SearchIcon';
import NearMeButton from 'components/NearMeButton/NearMeButton';
import useResourceType from 'hooks/useResourceType';
import { useToolbarContext, type ToolbarModal } from 'contexts/ToolbarContext';
import useActiveFilters from 'hooks/useActiveFilters';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import type { UserLocation } from 'hooks/queries/useGetUserLocationQuery';
import useGetUserLocationQuery from 'hooks/queries/useGetUserLocationQuery';

type DesktopToolbarProps = {
  onNearMeClick: (userLocation: UserLocation | null) => void;
};

const DesktopToolbar = ({ onNearMeClick }: DesktopToolbarProps) => {
  const { data: userLocation, isSuccess: isUserSharingLocation } =
    useGetUserLocationQuery();
  const { resourceType } = useResourceType();
  const { toolbarModal, toggle } = useToolbarContext();
  const { hasActiveFilters } = useActiveFilters();

  const values = [
    'resource',
    'filter',
    'search',
    'contribute'
  ] satisfies ToolbarModal[];

  return (
    <Box
      sx={{
        display: 'flex',
        px: '40px',
        py: '12px',
        gap: '40px',
        backgroundColor: 'white',
        boxShadow:
          '0px 3px 8px 0px rgba(0, 0, 0, 0.11), 0px 2px 4px 0px rgba(0, 0, 0, 0.21)',
        minWidth: '400px',
        borderRadius: '10px',
        justifyContent: 'space-between',
        zIndex: 1
      }}
    >
      <NearMeButton
        disabled={!isUserSharingLocation}
        resourceType={resourceType}
        onClick={() => onNearMeClick(userLocation)}
      />
      <BottomNavigation
        showLabels
        value={toolbarModal ? values.indexOf(toolbarModal) : null}
      >
        <BottomNavigationAction
          icon={<ResourceIcon />}
          label="Resources"
          onClick={() => toggle('resource')}
          data-cy="button-resource-type-menu"
          sx={{
            fontSize: 32,
            borderRadius: '100px',
            transition: '0.2s background'
          }}
        />
        <BottomNavigationAction
          icon={<FilterIcon />}
          label="Filter"
          onClick={() => toggle('filter')}
          data-cy="button-filter-type-menu"
          sx={{
            fontSize: 32,
            borderRadius: '100px',
            background: hasActiveFilters ? '#9DAEC8' : 'transparent',
            transition: '0.2s background'
          }}
        />
        <BottomNavigationAction
          icon={<SearchIcon />}
          label="Search"
          onClick={() => toggle('search')}
          data-cy="button-search-type-menu"
          sx={{
            fontSize: 32,
            borderRadius: '100px',
            transition: '0.2s background'
          }}
        />
        <BottomNavigationAction
          icon={<ContributeIcon />}
          label="Add Site"
          onClick={() => toggle('contribute')}
          data-cy="button-contribute-type-menu"
          sx={{
            fontSize: 32,
            borderRadius: '100px',
            transition: '0.2s background'
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default DesktopToolbar;

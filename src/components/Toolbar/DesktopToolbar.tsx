import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ContributeIcon from 'icons/ContributeIcon';
import FilterIcon from 'icons/FilterIcon';
import ResourceIcon from 'icons/ResourceIcon';
import SearchIcon from 'icons/SearchIcon';
import NearMeButton from 'components/NearMeButton/NearMeButton';
import type { MouseEventHandler, ReactElement } from 'react';
import useResourceType from 'hooks/useResourceType';
import { useToolbarContext, type ToolbarModal } from 'contexts/ToolbarContext';

type ItemProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: ToolbarModal;
  label: string;
  icon: ReactElement;
};

const Item = ({ onClick, icon, label, type }: ItemProps) => {
  const { toolbarModal } = useToolbarContext();
  const blackToGrayFilter =
    'invert(43%) sepia(20%) saturate(526%) hue-rotate(178deg) brightness(95%) contrast(93%)';

  return (
    <IconButton
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 32,
        minWidth: 71,
        minHeight: 51,
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
      data-cy={`button-${type}-type-menu`}
    >
      {icon}
      <Typography
        style={{ textTransform: 'none', color: 'black' }}
        fontSize={14}
        fontWeight={500}
      >
        {label}
      </Typography>
    </IconButton>
  );
};

type DesktopToolbarProps = {
  onNearMeClick: VoidFunction;
};

const DesktopToolbar = ({ onNearMeClick }: DesktopToolbarProps) => {
  const { resourceType } = useResourceType();
  const { toggle } = useToolbarContext();

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
      <NearMeButton resourceType={resourceType} onClick={onNearMeClick} />
      <Item
        icon={<ResourceIcon />}
        label="Resources"
        onClick={() => toggle('resource')}
        type="resource"
      />
      <Item
        icon={<FilterIcon />}
        label="Filter"
        onClick={() => toggle('filter')}
        type="filter"
      />
      <Item
        icon={<SearchIcon />}
        label="Search"
        onClick={() => toggle('search')}
        type="search"
      />
      <Item
        icon={<ContributeIcon />}
        label="Add Site"
        onClick={() => toggle('contribute')}
        type="contribute"
      />
    </Box>
  );
};

export default DesktopToolbar;

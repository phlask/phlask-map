import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ContributeIcon from 'icons/ContributeIcon';
import FilterIcon from 'icons/FilterIcon';
import ResourceIcon from 'icons/ResourceIcon';
import SearchIcon from 'icons/SearchIcon';
import NearMeButton from 'components/NearMeButton/NearMeButton';
import {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  type ToolbarModalType
} from 'actions/actions';
import type { MouseEventHandler, ReactElement } from 'react';
import useAppSelector from 'hooks/useSelector';
import { WATER_RESOURCE_TYPE } from 'types/ResourceEntry';
import useResourceType from 'hooks/useResourceType';
import { getToolbarModal } from 'reducers/toolbar';

type ItemProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: ToolbarModalType;
  label: string;
  icon: ReactElement;
};

const Item = ({ onClick, icon, label, type }: ItemProps) => {
  const toolbarModal = useAppSelector(getToolbarModal);
  const blackToGrayFilter =
    'invert(43%) sepia(20%) saturate(526%) hue-rotate(178deg) brightness(95%) contrast(93%)';

  const testVariants: Record<ToolbarModalType, string> = {
    [TOOLBAR_MODAL_NONE]: 'none',
    [TOOLBAR_MODAL_RESOURCE]: 'resource',
    [TOOLBAR_MODAL_FILTER]: 'filter',
    [TOOLBAR_MODAL_SEARCH]: 'search',
    [TOOLBAR_MODAL_CONTRIBUTE]: 'contribute'
  };

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
      data-cy={`button-${testVariants[type]}-type-menu`}
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
  onItemClick: (type: ToolbarModalType) => void;
  onNearMeClick: VoidFunction;
};

const DesktopToolbar = ({
  onItemClick,
  onNearMeClick
}: DesktopToolbarProps) => {
  const { resourceType } = useResourceType();

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
        resourceType={resourceType || WATER_RESOURCE_TYPE}
        onClick={onNearMeClick}
      />
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

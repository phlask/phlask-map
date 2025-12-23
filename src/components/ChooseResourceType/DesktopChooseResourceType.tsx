import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useRef, type FunctionComponent } from 'react';
import DesktopWaterIcon from 'icons/WaterIconChooseResource';
import DesktopBathroomIcon from 'icons/BathroomIconChooseResource';
import DesktopFoodIcon from 'icons/FoodIconChooseResource';
import DesktopForagingIcon from 'icons/ForagingIconChooseResource';
import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from 'types/ResourceEntry';

import useOnClickOutside from '../AddResourceModal/useOnClickOutside';
import styles from './ChooseResourceType.module.scss';
import { Modal } from '@mui/material';
import useResourceType, {
  type ResourceTypeOption
} from 'hooks/useResourceType';
import { useToolbarContext } from 'contexts/ToolbarContext';

type DesktopResourceButtonProps = {
  desktopIcon: FunctionComponent<{
    className: string;
    width: string;
    height: string;
  }>;
  color: string;
  type: ResourceTypeOption;
  textLabel: string;
};

const DesktopResourceButton = ({
  desktopIcon: Icon,
  color,
  type,
  textLabel
}: DesktopResourceButtonProps) => {
  const { setResourceType } = useResourceType();
  const { setToolbarModal } = useToolbarContext();

  return (
    <Button
      sx={{
        margin: '12px',
        backgroundColor: color,
        '&:hover': { backgroundColor: color },
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '5px',
        placeItems: 'center',
        borderRadius: '8px'
      }}
      onClick={() => {
        setToolbarModal(null);
        setResourceType(type);
      }}
      data-cy={`button-${type}-data-selector`}
    >
      <Icon className={styles.icon} width="45px" height="45px" />
      <p className={styles.label}>{textLabel}</p>
    </Button>
  );
};

const DesktopChooseResourceType = () => {
  const { toolbarModal, setToolbarModal } = useToolbarContext();
  const ref = useRef<HTMLDivElement>(null);
  // We're using a direct DOM link here because we aren't doing anything the React runtime needs to know about.
  const btnRef = document.querySelector('#resource-type-select-button');

  const onClose = () => {
    setToolbarModal(null);
  };
  const handleClickOutside = () => {
    if (toolbarModal === 'resource') {
      onClose();
    }
  };

  useOnClickOutside(ref, handleClickOutside, [btnRef]);

  return (
    <Modal open={toolbarModal === 'resource'} onClose={onClose}>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          borderRadius: '10px'
        }}
        ref={ref}
      >
        <Box sx={{ padding: '40px' }}>
          <Box>
            <h1 className={styles.header}>Show Resource Type</h1>
            <p className={styles.description}>
              Choose the type of resource you
              <br />
              would like to see on screen
            </p>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <DesktopResourceButton
              desktopIcon={DesktopWaterIcon}
              color="#5286E9"
              type={WATER_RESOURCE_TYPE}
              textLabel="Water"
            />

            <DesktopResourceButton
              desktopIcon={DesktopForagingIcon}
              color="#5DA694"
              type={FORAGE_RESOURCE_TYPE}
              textLabel="Foraging"
            />

            <DesktopResourceButton
              desktopIcon={DesktopFoodIcon}
              color="#FF9A55"
              type={FOOD_RESOURCE_TYPE}
              textLabel="Food"
            />

            <DesktopResourceButton
              desktopIcon={DesktopBathroomIcon}
              color="#9E9E9E"
              type={BATHROOM_RESOURCE_TYPE}
              textLabel="Bathroom"
            />
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default DesktopChooseResourceType;

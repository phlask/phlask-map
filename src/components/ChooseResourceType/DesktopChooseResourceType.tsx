import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import type { ReactNode } from 'react';
import WaterIcon from 'icons/WaterIconChooseResource';
import BathroomIcon from 'icons/BathroomIconChooseResource';
import FoodIcon from 'icons/FoodIconChooseResource';
import ForagingIcon from 'icons/ForagingIconChooseResource';

import { Modal, SvgIcon, Typography } from '@mui/material';
import useResourceType, {
  ResourceType,
  type ResourceTypeOption
} from 'hooks/useResourceType';
import { useToolbarContext } from 'contexts/ToolbarContext';

type DesktopResourceButtonProps = {
  icon: ReactNode;
  color: string;
  type: ResourceTypeOption;
  textLabel: string;
};

const DesktopResourceButton = ({
  icon,
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
        borderRadius: '8px',
        color: 'common.white',
        lineHeight: '23px',
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 600,
        textTransform: 'none'
      }}
      onClick={() => {
        setResourceType(type);
        setToolbarModal(null);
      }}
      data-cy={`button-${type}-data-selector`}
    >
      <SvgIcon sx={{ height: 45, width: 45 }}>{icon}</SvgIcon>
      {textLabel}
    </Button>
  );
};

const DesktopChooseResourceType = () => {
  const { toolbarModal, setToolbarModal } = useToolbarContext();

  const onClose = () => {
    setToolbarModal(null);
  };

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
      >
        <Box sx={{ padding: '40px' }}>
          <Box>
            <Typography
              sx={{
                textAlign: 'center',
                color: '#2d3748',
                fontSize: 24,
                fontFamily: 'Inter',
                fontWeight: 600,
                lineHeight: '29px'
              }}
            >
              Show Resource Type
            </Typography>
            <Typography
              sx={{
                color: '#60718c',
                lineHeight: '24px',
                fontSize: 14,
                fontFamily: 'Inter',
                fontWeight: 500,
                textAlign: 'center',
                paddingInline: 36
              }}
            >
              Choose the type of resource you would like to see on screen
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <DesktopResourceButton
              icon={<WaterIcon />}
              color="#5286E9"
              type={ResourceType.WATER}
              textLabel="Water"
            />

            <DesktopResourceButton
              icon={<ForagingIcon />}
              color="#5DA694"
              type={ResourceType.FORAGE}
              textLabel="Foraging"
            />

            <DesktopResourceButton
              icon={<FoodIcon />}
              color="#FF9A55"
              type={ResourceType.FOOD}
              textLabel="Food"
            />

            <DesktopResourceButton
              icon={<BathroomIcon />}
              color="#9E9E9E"
              type={ResourceType.BATHROOM}
              textLabel="Bathroom"
            />
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default DesktopChooseResourceType;

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import useIsMobile from 'hooks/useIsMobile';
import WaterIcon from 'icons/WaterIconChooseResource';
import FoodIcon from 'icons/FoodIconChooseResource';
import ForagingIcon from 'icons/ForagingIcon';
import BathroomIcon from 'icons/ToiletIconChooseResource';
import ResourceButton from 'components/ResourceButton/ResourceButton';
import {
  BATHROOM_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  WATER_RESOURCE_TYPE
} from 'types/ResourceEntry';
import CloseButton from './CloseButton/CloseButton';
import type { ResourceType } from 'actions/actions';

type ChooseResourceProps = {
  onSelectResource: (type: ResourceType) => void;
  onClose: VoidFunction;
};

const ChooseResource = ({ onSelectResource, onClose }: ChooseResourceProps) => {
  const isMobile = useIsMobile();
  return (
    <Stack
      alignItems="center"
      flexGrow={1}
      flexShrink={0}
      gap={2.5}
      paddingBlock={{ xs: 2, sm: 2, md: 4 }}
      paddingInline={{ xs: 2, sm: 2, md: 9 }}
      position="relative"
    >
      <CloseButton color="black" onClick={onClose} />
      <Stack
        gap={0.5}
        alignItems="center"
        paddingTop={isMobile ? '72px' : undefined}
      >
        <Typography
          fontSize={24}
          lineHeight="30px"
          fontWeight={600}
          /** @ts-expect-error Need to fix the theme declaration */
          sx={theme => ({ color: theme.palette.global.darkUI.darkGrey3 })}
          component="h3"
        >
          Add a Site
        </Typography>
        <Typography
          fontSize={14}
          textAlign="center"
          /** @ts-expect-error Need to fix the theme declaration */
          sx={theme => ({ color: theme.palette.global.darkUI.darkGrey2 })}
        >
          Choose the type of resource you like
          <br />
          to add and submit the form.
        </Typography>
      </Stack>
      <Grid container justifyContent="center" rowGap={3} columnSpacing={2.5}>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 6
          }}
        >
          <ResourceButton
            icon={WaterIcon}
            data-cy="button-contribute-water"
            color="#5286E9"
            text="Water"
            onClick={() => onSelectResource(WATER_RESOURCE_TYPE)}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 6
          }}
        >
          <ResourceButton
            icon={ForagingIcon}
            color="#5DA694"
            text="Foraging"
            data-cy="button-contribute-foraging"
            onClick={() => onSelectResource(FORAGE_RESOURCE_TYPE)}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 6
          }}
        >
          <ResourceButton
            icon={FoodIcon}
            color="#FF9A55"
            text="Food"
            data-cy="button-contribute-food"
            onClick={() => onSelectResource(FOOD_RESOURCE_TYPE)}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 6
          }}
        >
          <ResourceButton
            icon={BathroomIcon}
            color="#9E9E9E"
            text="Bathroom"
            data-cy="button-contribute-bathroom"
            onClick={() => onSelectResource(BATHROOM_RESOURCE_TYPE)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChooseResource;

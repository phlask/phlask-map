import useIsMobile from 'hooks/useIsMobile';
import Box from '@mui/material/Box';

import WaterIcon from 'icons/WaterIconChooseResource';
import FoodIcon from 'icons/FoodIconChooseResource';
import ForagingIcon from 'icons/ForagingIconChooseResource';
import BathroomIcon from 'icons/ToiletIconChooseResource';
import ResourceButton from 'components/ResourceButton/ResourceButton';
import {
  BATHROOM_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  WATER_RESOURCE_TYPE
} from 'types/ResourceEntry';

const ChooseResource = ({ onSelectResource }) => {
  const isMobile = useIsMobile();

  return (
    <div>
      <h2>
        Add a Site
      </h2>
      <h3>
        Choose the type of resource you like
        <br />
        to add and submit the form.
      </h3>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <ResourceButton
          icon={WaterIcon}
          data-cy="button-contribute-water"
          color="#5286E9"
          text="Water"
          onClick={() => onSelectResource(WATER_RESOURCE_TYPE)}
        />
        <ResourceButton
          icon={ForagingIcon}
          color="#5DA694"
          text="Foraging"
          data-cy="button-contribute-foraging"
          onClick={() => onSelectResource(FORAGE_RESOURCE_TYPE)}
        />

        <ResourceButton
          icon={FoodIcon}
          color="#FF9A55"
          text="Food"
          data-cy="button-contribute-food"
          onClick={() => onSelectResource(FOOD_RESOURCE_TYPE)}
        />

        <ResourceButton
          icon={BathroomIcon}
          color="#9E9E9E"
          text="Bathroom"
          data-cy="button-contribute-bathroom"
          onClick={() => onSelectResource(BATHROOM_RESOURCE_TYPE)}
        />
      </Box>
    </div>
  );
};

export default ChooseResource;

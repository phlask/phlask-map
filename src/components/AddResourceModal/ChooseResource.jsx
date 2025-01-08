import useIsMobile from 'hooks/useIsMobile';
import Box from '@mui/material/Box';

import WaterIcon from 'icons/WaterIconChooseResource';
import FoodIcon from 'icons/FoodIconChooseResource';
import ForagingIcon from 'icons/ForagingIconChooseResource';
import BathroomIcon from 'icons/ToiletIconChooseResource';
import ResourceButton from 'components/ResourceButton/ResourceButton';

import styles from './AddResourceModal.module.scss';

const ChooseResource = ({ setFormStep }) => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? styles.dialog : styles.dialogDesktop}>
      <h2 className={isMobile ? styles.greyHeader : styles.greyHeaderDesktop}>
        Add a Site
      </h2>
      <h3 className={isMobile ? styles.subHeader : styles.subHeaderDesktop}>
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
          onClick={() => setFormStep('addWaterTap')}
        />
        <ResourceButton
          icon={ForagingIcon}
          color="#5DA694"
          text="Foraging"
          data-cy="button-contribute-foraging"
          onClick={() => setFormStep('addFood')}
        />

        <ResourceButton
          icon={FoodIcon}
          color="#FF9A55"
          text="Food"
          data-cy="button-contribute-food"
          onClick={() => setFormStep('addBathroom')}
        />

        <ResourceButton
          icon={BathroomIcon}
          color="#9E9E9E"
          text="Bathroom"
          data-cy="button-contribute-bathroom"
          onClick={() => setFormStep('addForaging')}
        />
      </Box>
    </div>
  );
};

export default ChooseResource;

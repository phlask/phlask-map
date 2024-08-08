import styles from './AddResourceModal.module.scss';

import { Box, Button } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import { useDispatch } from 'react-redux';

const DesktopResourceButton = props => {
  const dispatch = useDispatch();
  const Icon = props.desktopIcon;
  return (
    <Button
      sx={{
        margin: '12px',
        backgroundColor: props.color,
        '&:hover': { backgroundColor: props.color },
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '5px',
        placeItems: 'center',
        borderRadius: '8px'
      }}
      onClick={() => {
        props.setFormStep();
      }}
      data-cy={props['data-cy']}
    >
      <Icon className={styles.icon} width="45px" height="45px" />
      <p className={styles.label}>{props.textLabel}</p>
    </Button>
  );
};

const ChooseResource = props => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  return (
    <>
      {!isMobile && (
        <Box sx={{ padding: '40px' }}>
          <Box>
            <h1 className={styles.header}>Add a Site</h1>
            <p className={styles.description}>
              Choose the type of resource you would like
              <br />
              to add and submit the form.
            </p>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {props.resourceTypeInfo.map(entry => (
              <DesktopResourceButton
                key={entry.type}
                {...entry}
                data-cy={`button-${entry.type}-data-selector`}
                setFormStep={() => {
                  props.setFormStep(entry.formName);
                }}
              />
            ))}
          </Box>
        </Box>
      )}
      {/* {isMobile && (
        <Paper className={styles.dialog}>
          <h2 className={styles.greyHeader}>Add a Resource</h2>
          <h3 className={styles.subHeader}>
            Choose the type of resource you like
            <br />
            to add and submit the form.
          </h3>
          <div className={styles.buttonWrapper}>
            <Button
              data-cy="button-contribute-water"
              className={styles.modalButton}
              variant={'water'}
              onClick={() => setFormStep('addWaterTap')}
              sx={{
                textTransform: 'capitalize',
                fontSize: '20px',
                lineHeight: '1'
              }}
            >
              <WaterIconCR />
              Water
            </Button>
            <Button
              className={styles.modalButton}
              variant={'food'}
              onClick={() => setFormStep('addFood')}
              sx={{
                textTransform: 'capitalize',
                fontSize: '20px',
                lineHeight: '1'
              }}
            >
              <FoodIconCR />
              Food
            </Button>
            <Button
              className={styles.modalButton}
              variant={'bathrooms'}
              onClick={() => setFormStep('addBathroom')}
              sx={{
                textTransform: 'capitalize',
                fontSize: '20px',
                lineHeight: '1'
              }}
            >
              <ToiletIconCR />
              Bathrooms
            </Button>
            <Button
              // this copy is different than the copy from the figma page,
              // this might be a bit more clear? can make a point to ask
              // about this next week

              className={styles.modalButton}
              variant={'foraging'}
              onClick={() => setFormStep('addForaging')}
              sx={{
                textTransform: 'capitalize',
                fontSize: '20px',
                lineHeight: '1'
              }}
            >
              <ForagingIconCR />
              Foraging
            </Button>
          </div>
        </Paper>
      )} */}
    </>
  );
};

export default ChooseResource;

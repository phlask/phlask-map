import styles from './AddResourceModal.module.scss';

import { Box, Button } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';

const ResourceButton = props => {
  const Icon = props.desktopIcon;
  return (
    <Button
      sx={{
        margin: props.margin,
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
              <ResourceButton
                margin="12px"
                key={entry.type}
                {...entry}
                data-cy={`button-${entry.type}-data-selector`}
                setFormStep={() => props.setFormStep(entry.formName)}
              />
            ))}
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            padding: '40px',
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% - 64px - 40px - 20px)'
            }}
          >
            <Box sx={{ marginBottom: '25px' }}>
              <h1 className={styles.header}>Add a Site</h1>
              <p className={styles.description}>
                Choose the type of resource you would like
                <br />
                to add and submit the form.
              </p>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr' }}>
              {props.resourceTypeInfo.map(entry => (
                <ResourceButton
                  margin="10px 20px"
                  key={entry.type}
                  {...entry}
                  data-cy={`button-${entry.type}-data-submit-selector`}
                  setFormStep={() => props.setFormStep(entry.formName)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChooseResource;

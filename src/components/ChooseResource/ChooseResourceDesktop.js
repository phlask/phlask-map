import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Collapse, Paper } from '@mui/material';

import { TOOLBAR_MODAL_RESOURCE } from '../../actions/actions';
import ResourceItemDesktop from './ResourceItemDesktop';
import { resourceTypeInfo } from './chooseResourceHelper';
import styles from './ChooseResource.module.scss';

const ChooseResourceDesktop = () => {
  const toolbarModal = useSelector(state => state.toolbarModal);
  return (
    <Paper
      sx={{
        position: 'absolute',
        left: '32px',
        bottom: '133px',
        width: '686px',
        borderRadius: '10px'
      }}
    >
      <Collapse
        in={toolbarModal == TOOLBAR_MODAL_RESOURCE}
        orientation="vertical"
        timeout="auto"
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
            {resourceTypeInfo.map(resourceEntry => (
              <ResourceItemDesktop
                key={resourceEntry.resourceType}
                {...resourceEntry}
              />
            ))}
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ChooseResourceDesktop;

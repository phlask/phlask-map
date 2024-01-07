import React from 'react';
import { isMobile } from 'react-device-detect';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material';
import Dialog from '@mui/material/Dialog';
import styles from './AddResourceModal.module.scss';

import { TOOLBAR_MODAL_CONTRIBUTE } from '../../actions/actions';

const Wrapper = props => {
  return (
    <>
      {isMobile ? (
        <Dialog
          open={props.open} // managed by parent component
          onClose={props.onClose}
          className={styles.modal}
        >
          {props.children}
        </Dialog>
      ) : (
        <Paper
          sx={{
            position: 'absolute',
            left: '32px',
            bottom: '133px',
            width: '686px',
            borderRadius: '10px'
          }}
        >
          <Collapse in={props.open} orientation="vertical" timeout="auto">
            {props.children}
          </Collapse>
        </Paper>
      )}
    </>
  );
};

export default Wrapper;

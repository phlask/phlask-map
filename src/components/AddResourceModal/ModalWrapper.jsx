import React from 'react';
import { isMobile, isOpera } from 'react-device-detect';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import styles from './AddResourceModal.module.scss';
/* 
  Higher Order Component that returns a Dialog for mobile and a non modal Dialog for Desktop 
 */

const ModalWrapper = props => {
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

export default ModalWrapper;

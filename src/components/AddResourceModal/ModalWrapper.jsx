import React from 'react';
import { isMobile } from 'react-device-detect';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import styles from './AddResourceModal.module.scss';
/* 
  Higher Order Component that returns a modal Dialog for mobile and a non modal Dialog for Desktop 
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
        props.open && (
          <Paper
            sx={{
              position: 'absolute',
              left: '32px',
              bottom: '133px',
              width: '686px',
              borderRadius: '10px'
            }}
          >
            {props.children}
          </Paper>
        )
      )}
    </>
  );
};

export default ModalWrapper;

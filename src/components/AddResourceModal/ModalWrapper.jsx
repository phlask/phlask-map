import React from 'react';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import useIsMobile from 'hooks/useIsMobile';
import styles from './AddResourceModal.module.scss';
/*
  Higher Order Component that returns a Dialog for mobile and a non modal Dialog for Desktop
 */

const ModalWrapper = ({ open, onClose, children }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Dialog
        open={open} // managed by parent component
        onClose={onClose}
        className={styles.modal}
      >
        {children}
      </Dialog>
    );
  }

  if (!open) {
    return null;
  }

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
      {children}
    </Paper>
  );
};

export default ModalWrapper;

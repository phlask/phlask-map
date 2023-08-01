import React, { createRef } from 'react';
import Dialog from '@mui/material/Dialog';
import ChooseResource from './ChooseResource';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, DialogContent } from '@mui/material';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import IconButton from '@mui/material/IconButton';
import styles from './AddResourceModal.module.scss';
import useOnClickOutside from './useOnClickOutside';

const AddResourceModalV2 = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onClose = () => props.setOpen(false);

  const refNode = createRef();
  //useOnClickOutside(refNode, () => onClose());

  return (
    <>
      {fullScreen ? (
        props.open && (
          <Box
            ref={refNode}
            style={{ display: props.open ? 'inline' : 'none' }}
            bgcolor={'white'}
            sx={{
              borderRadius: '10px',
              position: 'absolute',
              top: '840px',
              left: '20px',
              boxShadow: 3
            }}
          >
            <ChooseResource setFormStep={() => {}} />
          </Box>
        )
      ) : (
        <Dialog
          maxWidth="md"
          open={props.open}
          onClose={onClose}
          fullScreen={fullScreen}
          hideBackdrop={true}
          sx={{
            position: !fullScreen ? 'absolute' : null,
            top: !fullScreen ? '48vh' : null,
            left: !fullScreen ? '-57vw' : null
          }}
        >
          {fullScreen && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 20,
                top: 48,
                color: theme => theme.palette.grey[500]
              }}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          )}

          <DialogContent>
            <ChooseResource setFormStep={() => {}} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddResourceModalV2;

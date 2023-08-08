import React, { createRef } from 'react';
import Dialog from '@mui/material/Dialog';
import ChooseResource from './ChooseResource';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, DialogContent, Popover } from '@mui/material';
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
        <Popover
          maxWidth="md"
          open={props.open}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          anchorReference="anchorPosition"
          anchorPosition={{ bottom: 108, left: 32 }}
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
        </Popover>
      )}
    </>
  );
};

export default AddResourceModalV2;

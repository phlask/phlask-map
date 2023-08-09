import React, { createRef, useEffect, useRef } from 'react';
import ChooseResource from './ChooseResource';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, DialogContent, Paper } from '@mui/material';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import IconButton from '@mui/material/IconButton';

const AddResourceModalV2 = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onClose = () => props.setOpen(false);

  const refNode = createRef();
  //useOnClickOutside(refNode, () => onClose());

  /**
   * Hook that alerts clicks outside of the passed ref
   * Source: https://stackoverflow.com/a/42234988
   */
    function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

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
        props.open && (
        <Paper
          ref={wrapperRef}
          open={props.open}
          onClose={onClose}
          sx={{
            position: 'absolute',
            left: '32px',
            bottom: '133px'
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
        </Paper>
       )
      )}
    </>
  );
};

export default AddResourceModalV2;

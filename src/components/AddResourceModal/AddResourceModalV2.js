import { Box, DialogContent, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { createRef, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_NONE
} from '../../actions/actions';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import ChooseResource from './ChooseResource';

export default function AddResourceModalV2(props) {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.toolbarModal);

  const setToolbarModal = modal => {
    dispatch({ type: 'SET_TOOLBAR_MODAL', modal: modal });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onClose = () => {
    if (toolbarModal == TOOLBAR_MODAL_CONTRIBUTE) {
      setToolbarModal(TOOLBAR_MODAL_NONE);
    }
  };

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
          if (toolbarModal == TOOLBAR_MODAL_CONTRIBUTE) {
            setToolbarModal(TOOLBAR_MODAL_NONE);
          }
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      {fullScreen
        ? toolbarModal == TOOLBAR_MODAL_CONTRIBUTE && (
            <Box
              ref={refNode}
              style={{
                display:
                  toolbarModal == TOOLBAR_MODAL_CONTRIBUTE ? 'inline' : 'none'
              }}
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
        : toolbarModal == TOOLBAR_MODAL_CONTRIBUTE && (
            <Paper
              ref={wrapperRef}
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
          )}
    </>
  );
}

import React from 'react';

import { Box, Dialog, List, Slide } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
  SET_TOOLBAR_MODAL,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_NONE
} from '../../actions/actions';
import ResourceItemMobile from './ResourceItemMobile';
import { resourceTypeInfo } from './chooseResourceHelper';

const ChooseResourceMobile = () => {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.toolbarModal);

  return (
    <Box>
      <Dialog
        BackdropProps={{ transitionDuration: 400 }}
        open={toolbarModal == TOOLBAR_MODAL_RESOURCE}
        onClose={() =>
          dispatch({ type: SET_TOOLBAR_MODAL, mode: TOOLBAR_MODAL_NONE })
        }
        PaperProps={{
          style: {
            background: 'transparent',
            overflow: 'visible',
            boxShadow: 'none',
            position: 'absolute',
            bottom: '0vh',
            left: '0vh',
            transform: 'translate(-13%, -28%)'
          }
        }}
      >
        <Slide
          direction="up"
          in={toolbarModal == TOOLBAR_MODAL_RESOURCE}
          mountOnEnter
          unmountOnExit
        >
          <List sx={{ maxWidth: 210 }}>
            {resourceTypeInfo.map(resourceEntry => (
              <ResourceItemMobile
                key={resourceEntry.resourceType}
                {...resourceEntry}
              />
            ))}
          </List>
        </Slide>
      </Dialog>
    </Box>
  );
};

export default ChooseResourceMobile;

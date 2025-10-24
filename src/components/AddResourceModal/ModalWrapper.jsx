import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import useIsMobile from 'hooks/useIsMobile';
import { Collapse, Modal } from '@mui/material';
import { TOOLBAR_MODAL_CONTRIBUTE } from 'actions/actions';

/*
  Higher Order Component that returns a Dialog for mobile and a non modal Dialog for Desktop
 */

const ModalWrapper = ({ children, onExited }) => {
  const isMobile = useIsMobile();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  return (
    <>
      {!isMobile && (
        <Collapse
          in={toolbarModal === TOOLBAR_MODAL_CONTRIBUTE}
          orientation="vertical"
          timeout="auto"
          mountOnEnter
          unmountOnExit
          onExited={onExited}
        >
          <Paper
            sx={{
              left: '32px',
              bottom: '133px',
              borderRadius: '10px',
              pointerEvents: 'auto'
            }}
          >
            {children}
          </Paper>
        </Collapse>
      )}
      {isMobile && (
        <Modal
          open={toolbarModal === TOOLBAR_MODAL_CONTRIBUTE}
          hideBackdrop
          sx={{ overflow: 'scroll', backgroundColor: '#ffffff' }}
        >
          <Paper
            sx={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
            // This is used to configure the removal of the shadow that would normally appear in this element
            // The shadow is part of the standard MUI styling for Paper elements
            elevation={0}
          >
            {children}
          </Paper>
        </Modal>
      )}
    </>
  );
};

export default ModalWrapper;

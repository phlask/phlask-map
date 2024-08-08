import { Collapse, Modal, Paper } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import { useSelector } from 'react-redux/es/exports';
import { TOOLBAR_MODAL_CONTRIBUTE } from '../../actions/actions';
/*
  Higher Order Component that returns a Dialog for mobile and a non modal Dialog for Desktop
 */

const ModalWrapper = props => {
  const isMobile = useIsMobile();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  return (
    <>
      {!isMobile && (
        <Paper
          sx={{
            position: 'absolute',
            left: '32px',
            bottom: '133px',
            width: '686px',
            borderRadius: '10px'
          }}
        >
          <Collapse
            in={toolbarModal == TOOLBAR_MODAL_CONTRIBUTE}
            orientation="vertical"
            timeout="auto"
          >
            {props.children}
          </Collapse>
        </Paper>
      )}
      {isMobile && (
        <Modal
          open={toolbarModal == TOOLBAR_MODAL_CONTRIBUTE}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
        >
          {props.children}
        </Modal>
      )}
    </>
  );
};

export default ModalWrapper;

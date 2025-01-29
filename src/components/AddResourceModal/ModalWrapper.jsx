import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import useIsMobile from 'hooks/useIsMobile';
import { Collapse, IconButton, Modal } from '@mui/material';
import { TOOLBAR_MODAL_CONTRIBUTE } from 'actions/actions';

/*
  Higher Order Component that returns a Dialog for mobile and a non modal Dialog for Desktop
 */

const ModalWrapper = ({ children, handleClose, values }) => {
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
            width: '766px',
            borderRadius: '10px'
          }}
        >
          <Collapse
            in={toolbarModal === TOOLBAR_MODAL_CONTRIBUTE}
            orientation="vertical"
            timeout="auto"
          >
            {children}
          </Collapse>
        </Paper>
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
          >
            <IconButton
              aria-label="close"
              onClick={() => {
                handleClose();
              }}
              sx={{
                position: 'absolute',
                right: '20px',
                top:
                  values.formStep === 'chooseResource'
                    ? '20px'
                    : 'calc(1rem + 20px)',
                color:
                  values.formStep === 'chooseResource' ? '#000000' : '#ffffff'
              }}
              size="large"
            >
              <CloseIcon
                sx={{
                  fontSize: 32
                }}
              />
            </IconButton>
            {children}
          </Paper>
        </Modal>
      )}
    </>
  );
};

export default ModalWrapper;

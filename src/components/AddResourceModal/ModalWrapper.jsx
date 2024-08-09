import CloseIcon from '@mui/icons-material/Close';
import { Collapse, IconButton, Modal, Paper } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import {
  setToolbarModal,
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_NONE
} from '../../actions/actions';
/*
  Higher Order Component that returns a Dialog for mobile and a non modal Dialog for Desktop
 */

const ModalWrapper = props => {
  const dispatch = useDispatch();
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
        <Modal open={toolbarModal == TOOLBAR_MODAL_CONTRIBUTE}>
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
                dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
              }}
              sx={{
                position: 'absolute',
                right: '20px',
                top:
                  props.values.formStep == 'chooseResource'
                    ? '20px'
                    : 'calc(1rem + 20px)',
                color:
                  props.values.formStep == 'chooseResource'
                    ? '#000000'
                    : '#ffffff'
              }}
              size="large"
            >
              <CloseIcon
                sx={{
                  fontSize: 32
                }}
              />
            </IconButton>
            {props.children}
          </Paper>
        </Modal>
      )}
    </>
  );
};

export default ModalWrapper;

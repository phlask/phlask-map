import Paper from '@mui/material/Paper';
import useIsMobile from 'hooks/useIsMobile';
import { Collapse, Modal } from '@mui/material';
import { TOOLBAR_MODAL_CONTRIBUTE } from 'actions/actions';
import type { ReactNode } from 'react';
import useAppSelector from 'hooks/useSelector';

type ModalWrapperProps = {
  children: ReactNode;
  onExited: (node: HTMLElement) => void;
};

const ModalWrapper = ({ children, onExited }: ModalWrapperProps) => {
  const isMobile = useIsMobile();
  const toolbarModal = useAppSelector(
    state => state.filterMarkers.toolbarModal
  );
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
